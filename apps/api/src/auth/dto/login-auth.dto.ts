import { loginSchema } from "@repo/validation";
import { createZodDto } from "nestjs-zod";

export class LoginAuthDto extends createZodDto(loginSchema) {}
