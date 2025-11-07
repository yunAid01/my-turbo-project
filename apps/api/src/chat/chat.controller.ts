import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ChatService } from "./chat.service";
import { User } from "../auth/decorator/user";
import { AuthenticatedUser } from "@repo/types";

@UseGuards(AuthGuard("jwt"))
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // todo - chat 관련 기능 구현
  @Get()
  findMyChatRooms(@User() user: AuthenticatedUser) {
    const userId = user.id;
    return this.chatService.findMyChatRooms(userId);
  }
}
