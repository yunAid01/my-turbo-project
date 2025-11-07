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
import { CreateFriendDto } from "./dto/create-friend.dto";
import { UpdateFriendDto } from "./dto/update-friend.dto";
import { AuthGuard } from "@nestjs/passport";
import { get } from "http";

@UseGuards(AuthGuard("jwt"))
@Controller("friend")
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  // @Post()
  // create(@Body() createFriendDto: CreateFriendDto) {
  //   return this.friendService.create(createFriendDto);
  // }

  @Get("my")
  findMyFriends() {
    return this.friendService.findFriends();
  }

  @Get("not-my")
  findNotMyFriends() {
    return this.friendService.findNotMyFriends();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.friendService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
  //   return this.friendService.update(+id, updateFriendDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.friendService.remove(+id);
  // }
}
