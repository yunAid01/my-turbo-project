import Image from "next/image";
import { selectCurrentUser } from "../../store/features/authSlice";
import { useSelector } from "react-redux";
import type { AppState } from "../../store/store";
import { PlusCircle } from "lucide-react";
import { addFriend, getFriendDetails } from "../../api/friend";
import { useQuery } from "@tanstack/react-query";

export default function UserDetailModal() {
  const currentUser = useSelector((state: AppState) =>
    selectCurrentUser(state)
  );
  // Redux에서 userId만 가져옴
  const modalProps = useSelector((state: AppState) => state.modal.modalProps);
  const userId = modalProps?.userId;

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ["user_details", userId],
    queryFn: () => getFriendDetails(userId),
    enabled: !!userId,
  });

  const handleAddFriend = async () => {
    // 친구 추가 로직 구현
    console.log(`친구 추가 요청: ${userId}`);
    addFriend(userId);
  };

  // 로딩 중
  if (isLoading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  // 데이터 없음
  if (!userDetails) {
    return (
      <div className="p-4 text-center">사용자 정보를 불러올 수 없습니다.</div>
    );
  }

  return (
    <>
      <div>
        {currentUser!.id !== userDetails.id && (
          <button
            onClick={() => handleAddFriend()}
            className="flex items-center text-sm text-blue-500"
          >
            <PlusCircle className="mr-1" />
            친구추가
          </button>
        )}
      </div>
      <h2 className="text-xl font-bold mb-4">User Details</h2>
      <div className="mb-2">
        <strong>ID:</strong> {userDetails.userId}
      </div>
      <div className="mb-2">
        <strong>Nickname:</strong> {userDetails.nickname}
      </div>
      {userDetails.userProfileImage ? (
        <div className="mb-2">
          <strong>Profile Image:</strong>
          <Image
            src={userDetails.userProfileImage}
            alt={`${userDetails.nickname}'s profile`}
            width={100}
            height={100}
          />
        </div>
      ) : (
        <div className="mb-2">
          <Image
            src="/images/default-profileImage.jpg"
            alt={`${userDetails.nickname}'s profile`}
            width={100}
            height={100}
          />
        </div>
      )}
    </>
  );
}
