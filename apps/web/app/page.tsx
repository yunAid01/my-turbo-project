"use client";
import router from "next/navigation";
import UserCard from "../components/UserCard";
import { useQuery } from "@tanstack/react-query";

//api
import { findFriends } from "../api/friend";

export default function Home() {
  // todo- if not logged in, redirect to login page
  // if (loggedIn === false) {
  //   router.push("/login");
  //   return null;
  // }
  const {
    data: friends,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: () => findFriends(),
  });

  if (isLoading) {
    return <div>친구 목록 불러오는 중...</div>;
  }
  if (isError) {
    return <div>에러 발생: {error.message}</div>;
  }

  return (
    <div className="pd-4">
      <h1 className="text-2xl font-bold mb-4">친구목록</h1>
      <div>
        <UserCard
          user={{ id: 1, nickname: "친구1", bio: "안녕하세요! 친구1입니다." }}
        />
      </div>
      {/* todo - 친구목록 map
      {friends && friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>
              <UserCard user={friend} />
            </li>
          ))}
        </ul>
      ) : (
        <div>친구가 없습니다.</div>
      )} */}
    </div>
  );
}
