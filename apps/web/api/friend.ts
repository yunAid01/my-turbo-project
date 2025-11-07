import apiClient from "./client";

/** 친구 목록 조회(최초 진입점) */
export const findFriends = async () => {
  const response = await apiClient.get("/friend/my");
  return response;
};

export const findNotMyFriends = async () => {
  const response = await apiClient.get("/friend/not-my");
  return response;
};

// todo - 친구 추가
export const addFriend = async (friendId: number) => {
  const response = await apiClient.post(`/friend/${friendId}`);
  return response;
};

// todo - 친구 삭제
export const deleteFriend = async (friendId: number) => {
  const response = await apiClient.delete(`/friend/${friendId}`);
  return response;
};

// todo - 친구 자세히보기
export const getFriendDetails = async (friendId: number) => {
  const response = await apiClient.get(`/friend/${friendId}`);
  return response;
};
