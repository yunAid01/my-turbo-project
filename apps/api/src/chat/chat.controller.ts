import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ChatService } from "./chat.service";
import { User } from "../auth/decorator/user";
import { AuthenticatedUser } from "@repo/types";
import { ZodResponse } from "nestjs-zod";

// dtos
import {
  CreateChatRoomRequestDto,
  CreateChatRoomResponseDto,
  CreateGroupChatRoomRequestDto,
  DeleteChatRoomResponseDto,
  MyChatRoomsListResponseDto,
} from "./dto/chatroom.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ZodResponse({ type: CreateChatRoomResponseDto })
  @Post("room")
  createChatRoom(
    @User() user: AuthenticatedUser,
    @Body() friend: CreateChatRoomRequestDto
  ) {
    const userId = user.id;
    const friendId = friend.friendId;
    return this.chatService.createChatRoom(userId, friendId);
  }

  /** 채팅방 삭제 */
  @ZodResponse({ type: DeleteChatRoomResponseDto })
  @Delete("room/:id")
  deleteChatRoom(
    @User() user: AuthenticatedUser,
    @Param("id", ParseIntPipe) chatRoomId: number
  ) {
    const userId = user.id;
    return this.chatService.deleteMyChatRoom(userId, chatRoomId);
  }

  @ZodResponse({ type: CreateChatRoomResponseDto })
  @Post("room/group")
  createGroupChatRoom(
    @User() user: AuthenticatedUser,
    @Body() friends: CreateGroupChatRoomRequestDto
  ) {
    const userId = user.id;
    return this.chatService.createGroupChatRoom(userId, friends);
  }

  @ZodResponse({ type: MyChatRoomsListResponseDto })
  @Get("rooms")
  findMyChatRooms(@User() user: AuthenticatedUser) {
    const userId = user.id;
    return this.chatService.findMyChatRooms(userId);
  }
}
