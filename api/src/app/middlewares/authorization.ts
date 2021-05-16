import { Authorized as Authed } from "routing-controllers";
import { AuthorizationChecker } from "routing-controllers/types/AuthorizationChecker";
import { ConfigService } from "../../config/service";
import { Role } from "../types";
import { Service } from "typedi";

@Service()
export class AuthorizationMiddleware {
  constructor(private configService: ConfigService) {}

  public authorizationChecker: AuthorizationChecker = async () =>
    // action,
    // roles: Role[],
    {
      // Token verification here

      return false;
    };
}

export const Authorized = (roles: Role | Role[]) => Authed(roles);
