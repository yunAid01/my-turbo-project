import { Users, MessageSquare, Settings } from "lucide-react";

export default function NavBar() {
  return (
    // w-20: 너비 고정
    // h-screen: 화면 전체 높이
    // bg-gray-900: 이미지처럼 어두운 배경색
    // flex flex-col items-center py-6: 아이콘들을 세로로, 중앙에 정렬
    <nav className="w-20 h-screen bg-gray-900 flex flex-col items-center py-6">
      {/* 1. 상단 프로필/로고 (임시) */}
      <div className="w-12 h-12 bg-yellow-400 rounded-full mb-8"></div>

      {/* 2. 메인 아이콘 (친구, 채팅) */}
      <div className="flex flex-col gap-y-8">
        {/* 친구 아이콘 */}
        <button className="text-gray-400 hover:text-white">
          <Users size={28} />
        </button>

        {/* 채팅 아이콘 (활성화된 것처럼 흰색으로) */}
        <button className="text-white">
          <MessageSquare size={28} />
        </button>
      </div>

      {/* 3. 하단 설정 아이콘 
           mt-auto: 'margin-top: auto'로, 
           부모(flex-col)의 남은 공간을 모두 밀어내고 맨 아래에 붙게 함
      */}
      <div className="mt-auto">
        <button className="text-gray-400 hover:text-white">
          <Settings size={28} />
        </button>
      </div>
    </nav>
  );
}
