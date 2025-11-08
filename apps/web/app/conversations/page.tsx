"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserChatRooms } from "../../api/chatroom";
import ChatroomCard from "../../components/Card/ChatroomCard";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/features/modalSlice";
import { MessageSquarePlus } from "lucide-react";
import { MyChatRoomsResponseType } from "@repo/validation";

export default function ConversationsPage() {
  const dispatch = useDispatch();
  const {
    data: chatrooms,
    isLoading,
    isError,
    error,
  } = useQuery<MyChatRoomsResponseType>({
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
    <div className="h-full bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* 헤더 */}
      <div className="border-b border-red-900/30 bg-black/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                CONVERSATIONS
              </h1>
              <p className="text-gray-500 text-sm mt-1">Your active chats</p>
            </div>
            {/* 새 채팅 버튼 */}
            <button
              onClick={() => {
                console.log("Open Create Chatroom Modal");
                dispatch(openModal({ modalType: "CREATE_CHATROOM" }));
              }}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg shadow-lg shadow-red-900/50 transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <MessageSquarePlus size={20} />
              <span>NEW CHAT</span>
            </button>
          </div>
        </div>
      </div>

      {/* 채팅방 목록 */}
      <div className="px-6 py-6">
        {chatrooms && chatrooms.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {chatrooms.map((room) => (
              <ChatroomCard key={room.id} chatroom={room} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-red-900/20 to-gray-900/20 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-red-700/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg font-medium mb-2">
              No conversations yet
            </p>
            <p className="text-gray-600 text-sm">
              Start chatting with your friends!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
