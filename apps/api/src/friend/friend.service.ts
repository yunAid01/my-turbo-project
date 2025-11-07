import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FriendService {
  constructor(private readonly prisma: PrismaService) {}

  // todo - 친구 추가
  async createFriend(userId: number, friendId: number) {
    const friend = await this.prisma.friend.create({
      data: {
        userId: userId,
        friendId: friendId,
      },
      include: {
        friend: {
          select: {
            id: true,
            nickname: true,
            email: true,
            profileImage: true,
            statusMessage: true,
          },
        },
      },
    });

    return friend;
  }

  /** 내친구 찾기 */
  async findFriends(userId: number) {
    const friends = await this.prisma.friend.findMany({
      where: { userId: userId },
      include: {
        friend: {
          select: {
            id: true,
            nickname: true,
            email: true,
            profileImage: true,
            statusMessage: true,
          },
        },
      },
      orderBy: [
        { isFavorite: "desc" }, // 즐겨찾기가 먼저
        { createdAt: "desc" }, // 최근 추가 순
      ],
    });
    return friends;
  }

  /** 내 친구가 아닌 친구 찾기 */
  async findNotMyFriends(userId: number) {
    const myFriends = await this.prisma.friend.findMany({
      where: { userId: userId },
      select: { friendId: true },
    });
    const myFriendIds = myFriends.map((f) => f.friendId);
    const notMyFriends = await this.prisma.user.findMany({
      where: {
        AND: [
          { id: { not: userId } }, // 나 자신 제외
          { id: { notIn: myFriendIds } }, // 이미 친구인 사람 제외
        ],
      },
      select: {
        id: true,
        nickname: true,
        email: true,
        profileImage: true,
        statusMessage: true,
      },
    });
    return notMyFriends;
  }

  /** 특정 친구 자세히보기 */
  async findFriendDetails(friendId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: friendId },
      select: {
        id: true,
        nickname: true,
        email: true,
        profileImage: true,
        statusMessage: true,
      },
    });
    if (!user) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }
    return user;
  }

  // update(id: number, updateFriendDto: UpdateFriendDto) {
  //   return `This action updates a #${id} friend`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} friend`;
  // }
}
