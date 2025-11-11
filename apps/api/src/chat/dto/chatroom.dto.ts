import {
  CreateChatRoomRequestSchema,
  CreateChatRoomResponseSchema,
  CreateGroupChatRoomRequestSchema,
  MyChatRoomsListResponseSchema,
  DeleteChatRoomResponseSchema,
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

// ------------------------
export class MyChatRoomsListResponseDto extends createZodDto(
  MyChatRoomsListResponseSchema
) {}
export class DeleteChatRoomResponseDto extends createZodDto(
  DeleteChatRoomResponseSchema
) {}
