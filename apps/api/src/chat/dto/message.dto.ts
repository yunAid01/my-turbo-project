import { createZodDto } from "nestjs-zod";
import {
  CreateMessageRequestSchema,
  CreateMessageResponseSchema,
  DeleteMessageResponseSchema,
  MessageResponseSchema,
} from "@repo/validation";

export class CreateMessageRequestDto extends createZodDto(
  CreateMessageRequestSchema
) {}
export class CreateMessageResponseDto extends createZodDto(
  CreateMessageResponseSchema
) {}
export class DeleteMessageResponseDto extends createZodDto(
  DeleteMessageResponseSchema
) {}
export class MessageResponseDto extends createZodDto(MessageResponseSchema) {}
