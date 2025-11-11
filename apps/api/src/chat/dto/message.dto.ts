import { createZodDto } from "nestjs-zod";
import {
  CreateMessageRequestSchema,
  DeleteMessageResponseSchema,
  MessageResponseSchema,
  MessageSchema,
} from "@repo/validation";

export class CreateMessageRequestDto extends createZodDto(
  CreateMessageRequestSchema
) {}
export class CreateMessageResponseDto extends createZodDto(MessageSchema) {}
export class DeleteMessageResponseDto extends createZodDto(
  DeleteMessageResponseSchema
) {}
export class MessageListResponseDto extends createZodDto(
  MessageResponseSchema
) {}
