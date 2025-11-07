interface UserCardProps {
  user: {
    id: number;
    nickname: string;
    bio?: string;
  };
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-semibold">{user.nickname}</h2>
      {user.bio && <p className="text-sm text-gray-600">{user.bio}</p>}
    </div>
  );
}
