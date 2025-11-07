import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { FriendService } from "./friend.service";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../auth/decorator/user";
import { AuthenticatedUser } from "@repo/types";

@UseGuards(AuthGuard("jwt"))
@Controller("friend")
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post(":id")
  createFriend(@User() user: AuthenticatedUser, @Param("id") friendId: string) {
    const userId = user.id;
    return this.friendService.createFriend(userId, +friendId);
  }

  @Get("my")
  findMyFriends(@User() user: AuthenticatedUser) {
    const userId = user.id;
    return this.friendService.findFriends(userId);
  }

  @Get("not-my")
  findNotMyFriends(@User() user: AuthenticatedUser) {
    const userId = user.id;
    return this.friendService.findNotMyFriends(userId);
  }

  @Get(":id")
  findFriendDetails(@Param("id") otherId: string) {
    return this.friendService.findFriendDetails(+otherId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
  //   return this.friendService.update(+id, updateFriendDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.friendService.remove(+id);
  // }
}
