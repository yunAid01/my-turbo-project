import { z } from "zod";

// ============================================================================
// CHAT - 기본 스키마
// ============================================================================

/** 메시지 발신자 정보 */
export const MessageSenderSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
});

/** 읽음 확인 정보 */
export const ReadReceiptSchema = z.object({
  userId: z.number(),
  readAt: z.string().or(z.date()), // ISO string 또는 Date 객체
});

/** 채팅방 참여 유저 정보 */
export const ChatRoomUserSchema = z.object({
  id: z.number(),
  chatRoomId: z.number(),
  userId: z.number(),
  isAdmin: z.boolean(),
  joinedAt: z.string().or(z.date()),
  leftAt: z.string().nullable().or(z.date().nullable()),
  notificationOn: z.boolean(),
  user: z.object({
    id: z.number(),
    nickname: z.string(),
    profileImageUrl: z.string().nullable(),
    statusMessage: z.string().nullable(),
  }),
});

/** 메시지 정보 */
export const MessageSchema = z.object({
  id: z.number(),
  chatRoomId: z.number(),
  senderId: z.number(),
  content: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  sender: MessageSenderSchema,
  readReceipts: z.array(ReadReceiptSchema),
});

// ============================================================================
// CHAT - 내 채팅방 목록 조회
// ============================================================================

/** 채팅방 정보 (단일) */
export const ChatRoomItemSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  isGroup: z.boolean(),
  imageUrl: z.string().nullable(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  users: z.array(ChatRoomUserSchema),
  messages: z.array(MessageSchema),
  unreadCount: z.number(),
});

/** 내 채팅방 목록 응답 (배열) */
export const MyChatRoomsResponseSchema = z.array(ChatRoomItemSchema);

// ============================================================================
// CHAT - 채팅방 생성
// ============================================================================

/** 1:1 채팅방 생성 요청 */
export const CreateChatRoomRequestSchema = z.object({
  friendId: z.number(),
});

/** 그룹 채팅방 생성 요청 */
export const CreateGroupChatRoomRequestSchema = z.object({
  friendIds: z.array(z.number()).min(2, "그룹 채팅은 최소 2명 이상이어야 합니다"),
  name: z.string().optional(),
});

/** 채팅방 생성 응답 (기본 정보만) */
export const CreateChatRoomResponseSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  isGroup: z.boolean(),
  imageUrl: z.string().nullable(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  users: z.array(
    z.object({
      id: z.number(),
      chatRoomId: z.number(),
      userId: z.number(),
      isAdmin: z.boolean(),
      joinedAt: z.string().or(z.date()),
      leftAt: z.string().nullable().or(z.date().nullable()),
      notificationOn: z.boolean(),
    })
  ),
});

// ============================================================================
// Type Exports
// ============================================================================

export type MessageSenderType = z.infer<typeof MessageSenderSchema>;
export type ReadReceiptType = z.infer<typeof ReadReceiptSchema>;
export type ChatRoomUserType = z.infer<typeof ChatRoomUserSchema>;
export type MessageType = z.infer<typeof MessageSchema>;
export type ChatRoomItemType = z.infer<typeof ChatRoomItemSchema>;
export type MyChatRoomsResponseType = z.infer<typeof MyChatRoomsResponseSchema>;
export type CreateChatRoomRequestType = z.infer<typeof CreateChatRoomRequestSchema>;
export type CreateGroupChatRoomRequestType = z.infer<typeof CreateGroupChatRoomRequestSchema>;
export type CreateChatRoomResponseType = z.infer<typeof CreateChatRoomResponseSchema>;
