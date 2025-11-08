import Image from "next/image";

interface MessageBubbleProps {
  message: {
    id: number;
    senderId: number;
    content: string;
    createdAt: string;
    isMe: boolean;
    sender: {
      nickname: string;
      profileImageUrl: string | null;
    };
  };
  isGroup: boolean;
}

export default function MessageBubble({ message, isGroup }: MessageBubbleProps) {
  return (
    <div
      className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex gap-3 max-w-[70%] ${message.isMe ? "flex-row-reverse" : "flex-row"}`}
      >
        {/* 프로필 이미지 (상대방만) */}
        {!message.isMe && (
          <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-700 shrink-0">
            <Image
              src={message.sender.profileImageUrl || "/images/default-profileImage.jpg"}
              alt={message.sender.nickname}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
        )}

        {/* 메시지 버블 */}
        <div
          className={`flex flex-col ${message.isMe ? "items-end" : "items-start"}`}
        >
          {/* 보낸 사람 이름 (그룹챗 & 상대방만) */}
          {!message.isMe && isGroup && (
            <span className="text-xs text-gray-500 mb-1 px-2">
              {message.sender.nickname}
            </span>
          )}

          {/* 메시지 내용 */}
          <div
            className={`px-4 py-2.5 rounded-2xl ${
              message.isMe
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/30"
                : "bg-gray-800/80 text-white border border-gray-700"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>

          {/* 시간 */}
          <span className="text-xs text-gray-600 mt-1 px-2">
            {new Date(message.createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
