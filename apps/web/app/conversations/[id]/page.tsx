"use client";

import { useParams } from "next/navigation";
import ChatHeader from "../../../components/Chat/ChatHeader";
import MessageBubble from "../../../components/Chat/MessageBubble";
import MessageInput from "../../../components/Chat/MessageInput";
import EmptyChatState from "../../../components/Chat/EmptyChatState";

export default function ChatRoom() {
  const params = useParams();
  const chatRoomId = params.id as string;

  // TODO: Fetch chat room details and messages
  const chatRoomName = "Chat Room";
  const isGroup = false;
  const otherUserImage = "/images/default-profileImage.jpg";

  // TODO: Fetch messages from API
  const messages = [
    {
      id: 1,
      senderId: 1,
      content: "Hey! How are you?",
      createdAt: "2024-01-01T10:00:00Z",
      isMe: false,
      sender: {
        nickname: "Friend",
        profileImageUrl: "/images/default-profileImage.jpg",
      },
    },
    {
      id: 2,
      senderId: 2,
      content: "I'm good! Just working on the project",
      createdAt: "2024-01-01T10:05:00Z",
      isMe: true,
      sender: {
        nickname: "Me",
        profileImageUrl: "/images/default-profileImage.jpg",
      },
    },
    {
      id: 3,
      senderId: 1,
      content: "That's great! Let me know if you need any help",
      createdAt: "2024-01-01T10:10:00Z",
      isMe: false,
      sender: {
        nickname: "Friend",
        profileImageUrl: "/images/default-profileImage.jpg",
      },
    },
  ];

  const handleSendMessage = (message: string) => {
    // TODO: Send message via API
    console.log("Sending message:", message);
    console.log("Chat room ID:", chatRoomId);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* 헤더 */}
      <ChatHeader
        chatRoomName={chatRoomName}
        otherUserImage={otherUserImage}
        isOnline={true}
      />

      {/* 메시지 영역 */}
      {messages.length > 0 ? (
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} isGroup={isGroup} />
          ))}
        </div>
      ) : (
        <EmptyChatState />
      )}

      {/* 메시지 입력 영역 */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

