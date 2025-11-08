import Image from "next/image";
import Link from "next/link";

interface ChatroomCardProps {
  chatroom: any;
}
export default function ChatroomCard({ chatroom }: ChatroomCardProps) {
  // 상대방 정보 가져오기 (1:1 채팅인 경우)
  const otherUser = chatroom.users.find(
    (u: any) => u.userId !== chatroom.users[0]?.userId
  )?.user;

  const displayName = chatroom.isGroup
    ? chatroom.name || `Group (${chatroom.users.length})`
    : otherUser?.nickname || "Unknown";

  const displayImage = chatroom.isGroup
    ? "/images/default-chatImage.jpg"
    : otherUser?.profileImageUrl || "/images/default-chatImage.jpg";

  const lastMessage = chatroom.messages[0];
  const lastMessageText = lastMessage?.content || "No messages yet";
  const lastMessageTime = lastMessage?.createdAt
    ? new Date(lastMessage.createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const unreadCount = chatroom.unreadCount || 0;

  return (
    <Link href={`/conversations/${chatroom.id}`}>
      <div className="group relative bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 hover:border-red-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-900/20 cursor-pointer">
        {/* 왼쪽 레드 라인 액센트 */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="flex items-center p-4 space-x-4">
          {/* 프로필 이미지 */}
          <div className="relative shrink-0">
            {/* 외부 레드 글로우 링 */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>

            {/* 프로필 이미지 */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-800 group-hover:border-red-700 transition-colors duration-300">
              <Image
                src={displayImage}
                alt={displayName}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>

            {/* 온라인 상태 */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
          </div>

          {/* 채팅방 정보 */}
          <div className="grow min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-white group-hover:text-red-500 truncate transition-colors duration-200">
                {displayName}
              </h3>
              {lastMessageTime && (
                <span className="text-xs text-gray-500 ml-2 shrink-0">
                  {lastMessageTime}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-400 truncate">{lastMessageText}</p>
          </div>

          {/* 안읽은 메시지 배지 */}
          {unreadCount > 0 && (
            <div className="shrink-0">
              <div className="w-6 h-6 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
