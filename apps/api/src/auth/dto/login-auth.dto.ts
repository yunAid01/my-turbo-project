import { LoginUserSchema, LoginResponseSchema } from "@repo/validation";
import { createZodDto } from "nestjs-zod";

export class LoginAuthDto extends createZodDto(LoginUserSchema) {}
export class LoginResponseDto extends createZodDto(LoginResponseSchema) {}
