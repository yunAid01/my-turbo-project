import apiClient from "./client";
import {
  MyChatRoomsResponseType,
  CreateChatRoomResponseType,
} from "@repo/validation";

export const getUserChatRooms = async (): Promise<MyChatRoomsResponseType> => {
  const response: MyChatRoomsResponseType = await apiClient.get("/chat/rooms");
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
