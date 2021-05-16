import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { ErrorRequestHandler } from "express";
import { GeneralResponse } from "../types";
import { LoggerService } from "../../logger/service";
import { Service } from "typedi";
import { ValidationError } from "class-validator";

@Service()
@Middleware({ type: "after" })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  constructor(private loggerService: LoggerService) {}

  error: ErrorRequestHandler<never, GeneralResponse, unknown> = (
    err,
    req,
    res,
    next,
  ) => {
    // Logs error
    this.loggerService.error({
      message: err.message || "Error",
      error: err,
    });

    // Skip if headers are already sent
    if (res.headersSent) {
      return next(err);
    }
    const code = err.httpCode || 500;
    let msg: string | string[] = err.message;
    if (Array.isArray(err.errors)) {
      const extractErrorMessages = (
        push: (errorMessage: string) => void,
        error: ValidationError,
        parentProperty = "",
      ) => {
        for (const constraint of Object.values<string>(
          error.constraints || {},
        )) {
          push(`${parentProperty ? parentProperty + "." : ""}${constraint}`);
        }
        for (const childError of error.children || []) {
          extractErrorMessages(
            push,
            childError,
            `${parentProperty ? parentProperty + "." : ""}${error.property}`,
          );
        }
      };
      msg = [];

      for (const error of err.errors as ValidationError[]) {
        extractErrorMessages(
          (errorMessage) => (msg as string[]).push(errorMessage),
          error,
        );
      }
    }

    // return a general error response
    return res.status(code).json({
      code,
      msg,
    });
  };
}
