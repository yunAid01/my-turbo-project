"use client";

import { useQuery } from "@tanstack/react-query";

// components
import UserCard from "../Card/UserCard";

// api
import { findNotMyFriends } from "../../api/friend";

// types
import { NotMyFriendsResponseType } from "@repo/validation";

export default function UserFindModal() {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<NotMyFriendsResponseType>({
    queryKey: ["notMyFriends"],
    queryFn: () => findNotMyFriends(),
  });

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl overflow-hidden border border-red-900/30">
      {/* 헤더 */}
      <div className="relative border-b border-red-900/30 bg-gradient-to-r from-red-900/20 to-transparent">
        <div className="px-6 py-5">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            FIND PLAYERS
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Add new teammates to your roster
          </p>
        </div>
      </div>

      {/* 유저 목록 */}
      <div className="max-h-[500px] overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Searching players...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-gray-400">
              Error: {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        ) : users && users.length > 0 ? (
          <div className="divide-y divide-gray-800/50">
            {users.map((user, index) => (
              <div
                key={user.id}
                className="group relative bg-gradient-to-r from-transparent to-transparent hover:from-red-900/10 hover:to-transparent transition-all duration-300"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* 왼쪽 레드 라인 */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <UserCard user={user} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-900/20 to-gray-900/20 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-red-700/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-center font-medium mb-2">
              No players available
            </p>
            <p className="text-gray-600 text-sm text-center">
              All players are already in your friend list!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
