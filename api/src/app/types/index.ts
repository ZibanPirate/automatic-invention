import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class GeneralResponse {
  @IsNumber()
  @IsOptional()
  code?: number;

  @IsString()
  @IsOptional()
  msg?: string;

  @IsObject()
  @IsOptional()
  debug?: Record<string, unknown>;
}

export type Role = "";
