"use client";
import UserCard from "../components/Card/UserCard";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

//api
import { findFriends } from "../api/friend";

// redux
import { useDispatch } from "react-redux";
import { openModal } from "../store/features/modalSlice";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/login");
    }
  }, []);

  const {
    data: friends,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: () => findFriends(),
  });

  const handleOpenFindUserModal = () => {
    dispatch(openModal({ modalType: "USER_FIND" }));
  };

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
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handleOpenFindUserModal()}
        >
          친구 찾기
        </button>
      </div>
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
      )}
    </div>
  );
}
