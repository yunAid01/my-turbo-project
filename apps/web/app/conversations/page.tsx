"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserChatRooms } from "../../api/chatroom";
import ChatroomCard from "../../components/Card/ChatroomCard";

export default function ConversationsPage() {
  const {
    data: chatrooms,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["chatRooms"],
    queryFn: () => getUserChatRooms(),
  });

  if (isLoading) {
    return <div>대화방 불러오는 중...</div>;
  }
  if (isError) {
    return <div>에러 발생: {error.message}</div>;
  }

  return (
    // todo  대화방 리스트 컴포넌트로 교체
    <>
      <h1>Chat Room Page</h1>
      {chatrooms && chatrooms.length > 0 ? (
        <ul>
          {chatrooms.map((room) => (
            <ChatroomCard key={room.id} />
          ))}
        </ul>
      ) : (
        <div>참여한 대화방이 없습니다.</div>
      )}
    </>
  );
}
