// 1. 프로필 사진이 없을 때 기본 이미지를 사용합니다.
import Image from "next/image";

// redux
import { useDispatch } from "react-redux";
import { openModal } from "../../store/features/modalSlice";

interface UserCardProps {
  user: {
    id: number;
    nickname: string;
    profileImageUrl?: string; // 2. 프로필 이미지 URL (선택적)
    statusMessage?: string; // 3. 상태 메시지 (선택적)
  };
}

export default function UserCard({ user }: UserCardProps) {
  const dispatch = useDispatch();
  const handleUserDetailModalOpen = () => {
    dispatch(
      openModal({ modalType: "USER_DETAIL", modalProps: { userId: user.id } })
    );
  };

  return (
    // 5. 전체 컨테이너
    // - flex, items-center: 프로필 사진과 텍스트를 가로로, 중앙 정렬
    // - space-x-4: 프로필 사진과 텍스트 사이의 간격
    // - p-3: 내부 여백 (p-4보다 살짝 줄여서 더 카톡 느낌나게)
    // - rounded-lg: 모서리를 살짝 둥글게
    // - transition-colors ... hover:bg-gray-100: 마우스를 올리면 0.15초 동안 배경색이 변함
    <div
      onClick={() => handleUserDetailModalOpen()}
      className="flex items-center w-full p-3 space-x-4 transition-colors duration-150 rounded-lg cursor-pointer hover:bg-gray-100"
    >
      {/* 6. 프로필 이미지 영역 */}
      <div className="relative shrink-0 w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
        <Image
          src={user.profileImageUrl || "/images/default-profileImage.jpg"}
          alt={user.nickname}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>

      {/* 7. 닉네임과 상태 메시지 영역 */}
      {/*
        - flex-grow: 남은 공간을 모두 차지
        - min-w-0: (중요) 이 설정이 없으면 닉네임이나 상태 메시지가 
                      너무 길 때 truncate(줄임표 '...')가 작동하지 않습니다.
      */}
      <div className="grow min-w-0">
        <h2 className="text-base font-semibold text-gray-800 truncate">
          {user.nickname}
        </h2>
      </div>
    </div>
  );
}
