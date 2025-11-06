import { registerSchema } from "@repo/validation";
import { createZodDto } from "nestjs-zod";

export class CreateAuthDto extends createZodDto(registerSchema) {}
