import apiClient from "./client";

export const getUserChatRooms = async () => {
  const response = await apiClient.get("/chat");
  return response;
};
