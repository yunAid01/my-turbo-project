import {
  CreateChatRoomRequestSchema,
  CreateChatRoomResponseSchema,
  CreateGroupChatRoomRequestSchema,
} from "@repo/validation";
import { createZodDto } from "nestjs-zod";

export class CreateChatRoomRequestDto extends createZodDto(
  CreateChatRoomRequestSchema
) {}

export class CreateGroupChatRoomRequestDto extends createZodDto(
  CreateGroupChatRoomRequestSchema
) {}

export class CreateChatRoomResponseDto extends createZodDto(
  CreateChatRoomResponseSchema
) {}
