import { CreateUserSchema, UserResponseSchema } from "@repo/validation";
import { createZodDto } from "nestjs-zod";

export class CreateAuthDto extends createZodDto(CreateUserSchema) {}

export class UserResponseDto extends createZodDto(UserResponseSchema) {}
