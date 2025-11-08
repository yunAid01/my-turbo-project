import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGroupChatRoomRequestType } from "@repo/validation";

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  /** create 1:1 chat room */
  async createChatRoom(myId: number, friendId: number) {
    const existingRoom = await this.prisma.chatRoom.findFirst({
      where: {
        isGroup: false,
        users: {
          every: {
            userId: {
              in: [myId, friendId],
            },
          },
        },
      },
      include: {
        users: true,
      },
    });

    if (
      existingRoom &&
      existingRoom.users.length === 2 &&
      existingRoom.users.some((u) => u.userId === myId) &&
      existingRoom.users.some((u) => u.userId === friendId)
    ) {
      return existingRoom;
    }

    const chatRoom = await this.prisma.chatRoom.create({
      data: {
        isGroup: false,
        users: {
          create: [{ userId: myId }, { userId: friendId }],
        },
      },
      include: {
        users: true,
      },
    });
    return chatRoom;
  }

  /** create group chat room */
  async createGroupChatRoom(
    myId: number,
    data: CreateGroupChatRoomRequestType
  ) {
    const chatRoom = await this.prisma.chatRoom.create({
      data: {
        isGroup: true,
        name: data.name || `Group Chat ##${Date.now().toString().slice(-7)}`,
        users: {
          create: data.friendIds
            .map((id) => ({ userId: id }))
            .concat({ userId: myId }),
        },
      },
      include: {
        users: true,
      },
    });
    return chatRoom;
  }

  // -- todo : 이거 뭔데 ㅆㅂ--
  async findMyChatRooms(userId: number) {
    const chatRooms = await this.prisma.chatRoom.findMany({
      where: {
        users: {
          some: {
            userId: userId,
            leftAt: null, // 현재 참여중인 채팅방만
          },
        },
      },
      include: {
        users: {
          where: {
            leftAt: null, // 현재 참여중인 사용자만
          },
          include: {
            user: {
              select: {
                id: true,
                nickname: true,
                profileImageUrl: true,
                statusMessage: true,
              },
            },
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1, // 마지막 메시지만
          include: {
            sender: {
              select: {
                id: true,
                nickname: true,
                profileImageUrl: true,
              },
            },
            readReceipts: {
              select: {
                userId: true,
                readAt: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc", // 최근 활동 순
      },
    });

    // 안읽은 메시지 수 계산 추가
    const chatRoomsWithUnreadCount = await Promise.all(
      chatRooms.map(async (room) => {
        const unreadCount = await this.prisma.message.count({
          where: {
            chatRoomId: room.id,
            senderId: { not: userId }, // 내가 보낸 메시지 제외
            readReceipts: {
              none: {
                userId: userId, // 내가 읽지 않은 메시지
              },
            },
          },
        });

        return {
          ...room,
          unreadCount,
        };
      })
    );

    return chatRoomsWithUnreadCount;
  }
}
