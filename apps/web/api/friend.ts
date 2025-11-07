export const findFriends = async (): Promise<Friend[]> => {
  const response: Friend[] = await apiClient.get("/friend");
  return response;
};
