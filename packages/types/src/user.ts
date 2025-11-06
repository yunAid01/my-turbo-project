export interface User {
  id: string;
  email: string;
  name?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  user: User;
}

export interface UsersResponse {
  users: User[];
  total: number;
}
