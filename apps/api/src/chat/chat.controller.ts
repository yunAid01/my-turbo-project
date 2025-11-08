import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
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
} from "./dto/create-chatroom.dto";

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

  @ZodResponse({ type: CreateChatRoomResponseDto })
  @Post("room/group")
  createGroupChatRoom(
    @User() user: AuthenticatedUser,
    @Body() data: CreateGroupChatRoomRequestDto
  ) {
    const userId = user.id;
    return this.chatService.createGroupChatRoom(userId, data);
  }

  @Get("rooms")
  findMyChatRooms(@User() user: AuthenticatedUser) {
    const userId = user.id;
    return this.chatService.findMyChatRooms(userId);
  }
}
