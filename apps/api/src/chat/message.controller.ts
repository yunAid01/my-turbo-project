import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { MessageService } from "./message.service";
import { User } from "../auth/decorator/user";
import { AuthenticatedUser } from "@repo/types";
import {
  CreateMessageRequestDto,
  CreateMessageResponseDto,
  DeleteMessageResponseDto,
  MessageResponseDto,
} from "./dto/message.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ZodResponse } from "nestjs-zod";

@ApiTags("Messages")
@UseGuards(AuthGuard("jwt"))
@Controller("messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: "Create a new message" })
  @ZodResponse({ type: CreateMessageResponseDto })
  createMessage(
    @User() user: AuthenticatedUser,
    @Body() dto: CreateMessageRequestDto
  ) {
    return this.messageService.createMessage(user.id, dto);
  }

  @Delete(":messageId")
  @ApiOperation({ summary: "Delete a message" })
  @ZodResponse({ type: DeleteMessageResponseDto })
  deleteMessage(
    @User() user: AuthenticatedUser,
    @Param("messageId", ParseIntPipe) messageId: number
  ) {
    return this.messageService.deleteMessage(user.id, messageId);
  }

  @Get("room/:chatRoomId")
  @ApiOperation({ summary: "Get messages in a chat room" })
  @ZodResponse({ type: MessageResponseDto })
  getChatRoomMessages(
    @User() user: AuthenticatedUser,
    @Param("chatRoomId", ParseIntPipe) chatRoomId: number
  ) {
    return this.messageService.getChatRoomMessages(user.id, chatRoomId);
  }

  @Post(":messageId/read")
  @ApiOperation({ summary: "Mark message as read" })
  markAsRead(
    @User() user: AuthenticatedUser,
    @Param("messageId", ParseIntPipe) messageId: number
  ) {
    return this.messageService.markAsRead(user.id, messageId);
  }
}
