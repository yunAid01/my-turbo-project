import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FriendService {
  constructor(private readonly prisma: PrismaService) {}

  async findFriends() {
    const friends = await this.prisma.friend.findMany({
      // todo - where: { isMyFriend: true },
    });
    return friends;
  }

  // todo - 나의 친구가 아닌 유저들 조회(친구추가 기능)
  async findNotMyFriends() {
    const friends = await this.prisma.friend.findMany({
      // todo - where: { isMyFriend: false },
    });
    return friends;
  }
  // create(createFriendDto: CreateFriendDto) {
  //   return 'This action adds a new friend';
  // }

  // 모달창으로 친구보기
  // findOne(id: number) {
  //   return `This action returns a #${id} friend`;
  // }

  // update(id: number, updateFriendDto: UpdateFriendDto) {
  //   return `This action updates a #${id} friend`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} friend`;
  // }
}
