import { z } from "zod";

// ============================================================================
// CHAT - 기본 스키마
// ============================================================================

/** 메시지 발신자 정보 */
export const MessageSenderSchema = z.object({
  id: z.number(),
  nickname: z.string(),
});

/** 읽음 확인 정보 */
export const ReadReceiptSchema = z.object({
  userId: z.number(),
  readAt: z.date(),
});

/** 채팅방 참여 유저 정보 */
export const ChatRoomUserSchema = z.object({
  id: z.number(),
  chatRoomId: z.number(),
  userId: z.number(),
  joinedAt: z.date(),
  leftAt: z.date().nullable(),
  user: z.object({
    id: z.number(),
    nickname: z.string(),
    profileImage: z.string().nullable(),
    statusMessage: z.string().nullable(),
  }),
});

/** 메시지 정보 */
export const MessageSchema = z.object({
  id: z.number(),
  chatRoomId: z.number(),
  senderId: z.number(),
  content: z.string(),
  messageType: z.enum(["TEXT", "IMAGE", "VIDEO", "FILE"]),
  createdAt: z.date(),
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
  isGroupChat: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  users: z.array(ChatRoomUserSchema),
  messages: z.array(MessageSchema),
  unreadCount: z.number(),
});

/** 내 채팅방 목록 응답 (배열) */
export const MyChatRoomsResponseSchema = z.array(ChatRoomItemSchema);

// ============================================================================
// Type Exports
// ============================================================================

export type MessageSenderType = z.infer<typeof MessageSenderSchema>;
export type ReadReceiptType = z.infer<typeof ReadReceiptSchema>;
export type ChatRoomUserType = z.infer<typeof ChatRoomUserSchema>;
export type MessageType = z.infer<typeof MessageSchema>;
export type ChatRoomItemType = z.infer<typeof ChatRoomItemSchema>;
export type MyChatRoomsResponseType = z.infer<typeof MyChatRoomsResponseSchema>;
