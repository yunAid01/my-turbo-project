import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

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
                profileImage: true,
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
