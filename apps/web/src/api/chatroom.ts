import apiClient from "./client";
import {
  MyChatRoomsListResponseType,
  CreateChatRoomResponseType,
  DeleteChatRoomResponseType,
} from "@repo/validation";

export const getUserChatRooms =
  async (): Promise<MyChatRoomsListResponseType> => {
    const response: MyChatRoomsListResponseType =
      await apiClient.get("/chat/rooms");
    return response;
  };

/** 1:1 채팅방 생성 */
export const createChatRoom = async (
  friendId: number
): Promise<CreateChatRoomResponseType> => {
  const response: CreateChatRoomResponseType = await apiClient.post(
    "/chat/room",
    { friendId: friendId }
  );
  return response;
};

/** 그룹 채팅방 생성 */
export const createGroupChatRoom = async ({
  friendIds,
  name,
}: {
  friendIds: number[];
  name?: string;
}): Promise<CreateChatRoomResponseType> => {
  const response: CreateChatRoomResponseType = await apiClient.post(
    "/chat/room/group",
    { friendIds, name }
  );
  return response;
};

/** todo - remove */
export const deleteChatRoom = async (
  chatroomId: number
): Promise<DeleteChatRoomResponseType> => {
  const response: DeleteChatRoomResponseType = await apiClient.delete(
    `/chat/room/${chatroomId}`
  );
  return response;
};
