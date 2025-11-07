"use client";

import { useQuery } from "@tanstack/react-query";

// components
import UserCard from "../Card/UserCard";

// api
import { findNotMyFriends } from "../../api/friend";

export default function UserFindModal() {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notMyFriends"],
    queryFn: () => findNotMyFriends(),
  });

  return (
    <>
      <h2 className="text-xl font-bold mb-4">친구 찾기</h2>
      {users && users.length > 0 ? (
        users.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <div>No users found</div>
      )}
    </>
  );
}
