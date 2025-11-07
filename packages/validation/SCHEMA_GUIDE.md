# @repo/validation - API 스키마 정리

이 문서는 백엔드 API 응답과 프론트엔드 타입을 일치시키기 위한 Zod 스키마 정리입니다.

## 패키지 구조

```
packages/validation/src/schemas/
├── auth.ts     # 인증 관련 스키마
├── friend.ts   # 친구 관련 스키마
└── chat.ts     # 채팅 관련 스키마
```

---

## Auth 스키마 (`auth.ts`)

### 회원가입

**요청 스키마**

```typescript
CreateUserInputType {
  email: string;        // 이메일 (유효성 검사)
  password: string;     // 비밀번호 (최소 8자)
  nickname: string;     // 닉네임 (최소 3자)
}
```

**응답 스키마**

```typescript
CreateUserResponseType {
  id: number;
  email: string;
  nickname: string;
  profileImage: string | null;
  statusMessage: string | null;
  createdAt: string;    // ISO 8601 format
}
```

**백엔드 사용**

```typescript
// apps/api/src/auth/auth.service.ts
async createUser(
  createUserData: CreateUserInputType
): Promise<CreateUserResponseType>
```

**프론트엔드 사용**

```typescript
// apps/web/api/auth.ts
export const registerRequest = async (
  data: CreateUserInputType
): Promise<CreateUserResponseType> => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};
```

---

### 로그인

**요청 스키마**

```typescript
LoginUserInputType {
  email: string;        // 이메일
  password: string;     // 비밀번호
}
```

**응답 스키마**

```typescript
LoginUserResponseType {
  access_token: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImage: string | null;
    statusMessage: string | null;
    createdAt: string;
  };
}
```

**백엔드 사용**

```typescript
// apps/api/src/auth/auth.service.ts
async loginUser(
  loginUserData: LoginUserInputType
): Promise<LoginUserResponseType>
```

**프론트엔드 사용**

```typescript
// apps/web/api/auth.ts
export const loginRequest = async (
  data: LoginUserInputType
): Promise<LoginUserResponseType> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

// React Query 사용
const { mutate } = useMutation<
  LoginUserResponseType,
  Error,
  LoginUserInputType
>({
  mutationFn: loginRequest,
});
```

---

## 👥 Friend 스키마 (`friend.ts`)

### 친구 추가

**요청 (URL Param)**

```typescript
CreateFriendParamType {
  friendId: number;     // 추가할 친구 ID
}
```

**응답 스키마**

```typescript
CreateFriendResponseType {
  id: number;           // Friend relation ID
  userId: number;       // 내 ID
  friendId: number;     // 친구 ID
  isFavorite: boolean;  // 즐겨찾기 여부
  isBlocked: boolean;   // 차단 여부
  createdAt: string;    // 친구 추가 날짜
  friend: {             // 친구 상세 정보
    id: number;
    nickname: string;
    email: string;
    profileImage: string | null;
    statusMessage: string | null;
  };
}
```

**백엔드 사용**

```typescript
// apps/api/src/friend/friend.service.ts
async createFriend(
  userId: number,
  friendId: number
): Promise<CreateFriendResponseType>
```

**프론트엔드 사용**

```typescript
// apps/web/api/friend.ts
export const addFriend = async (
  friendId: number
): Promise<CreateFriendResponseType> => {
  const response = await apiClient.post(`/friend/${friendId}`);
  return response.data;
};
```

---

### 내 친구 목록 조회

**응답 스키마**

```typescript
MyFriendsResponseType = Array<{
  id: number;
  userId: number;
  friendId: number;
  isFavorite: boolean;
  isBlocked: boolean;
  createdAt: Date;
  friend: {
    id: number;
    nickname: string;
    email: string;
    profileImage: string | null;
    statusMessage: string | null;
  };
}>;
```

**백엔드 사용**

```typescript
// apps/api/src/friend/friend.service.ts
async findFriends(userId: number): Promise<MyFriendsResponseType>
```

**프론트엔드 사용**

```typescript
// apps/web/api/friend.ts
export const findFriends = async (): Promise<MyFriendsResponseType> => {
  const response = await apiClient.get("/friend/my");
  return response.data;
};

// React Query
const { data: friends } = useQuery<MyFriendsResponseType>({
  queryKey: ["friends"],
  queryFn: findFriends,
});
```

---

### 친구가 아닌 유저 목록 조회

**응답 스키마**

```typescript
NotMyFriendsResponseType = Array<{
  id: number;
  nickname: string;
  profileImage: string | null;
  statusMessage: string | null;
}>;
```

**백엔드 사용**

```typescript
// apps/api/src/friend/friend.service.ts
async findNotMyFriends(userId: number): Promise<NotMyFriendsResponseType>
```

**프론트엔드 사용**

```typescript
// apps/web/api/friend.ts
export const findNotMyFriends = async (): Promise<NotMyFriendsResponseType> => {
  const response = await apiClient.get("/friend/not-my");
  return response.data;
};
```

---

### 특정 유저 상세 정보 조회

**응답 스키마**

```typescript
FriendDetailsResponseType {
  id: number;
  nickname: string;
  profileImage: string | null;
  statusMessage: string | null;
  isFriend: boolean;    // 내 친구인지 여부
  isFavorite: boolean;  // 즐겨찾기 여부
}
```

**백엔드 사용**

```typescript
// apps/api/src/friend/friend.service.ts
async findFriendDetails(
  userId: number,
  friendId: number
): Promise<FriendDetailsResponseType>
```

**프론트엔드 사용**

```typescript
// apps/web/api/friend.ts
export const getFriendDetails = async (
  friendId: number
): Promise<FriendDetailsResponseType> => {
  const response = await apiClient.get(`/friend/${friendId}`);
  return response.data;
};

// React Query
const { data: userDetails } = useQuery<FriendDetailsResponseType>({
  queryKey: ["user_details", friendId],
  queryFn: () => getFriendDetails(friendId),
  enabled: !!friendId,
});
```

---

## 💬 Chat 스키마 (`chat.ts`)

### 내 채팅방 목록 조회

**응답 스키마**

```typescript
MyChatRoomsResponseType = Array<{
  id: number;
  name: string | null;
  isGroupChat: boolean;
  createdAt: Date;
  updatedAt: Date;
  users: Array<{
    id: number;
    chatRoomId: number;
    userId: number;
    joinedAt: Date;
    leftAt: Date | null;
    user: {
      id: number;
      nickname: string;
      profileImage: string | null;
      statusMessage: string | null;
    };
  }>;
  messages: Array<{
    id: number;
    chatRoomId: number;
    senderId: number;
    content: string;
    messageType: "TEXT" | "IMAGE" | "VIDEO" | "FILE";
    createdAt: Date;
    sender: {
      id: number;
      nickname: string;
    };
    readReceipts: Array<{
      userId: number;
      readAt: Date;
    }>;
  }>;
  unreadCount: number; // 안 읽은 메시지 수
}>;
```

**백엔드 사용**

```typescript
// apps/api/src/chat/chat.service.ts
async findMyChatRooms(userId: number): Promise<MyChatRoomsResponseType>
```

**프론트엔드 사용**

```typescript
// apps/web/api/chat.ts
export const getMyChatRooms = async (): Promise<MyChatRoomsResponseType> => {
  const response = await apiClient.get("/chat/rooms");
  return response.data;
};

// React Query
const { data: chatRooms } = useQuery<MyChatRoomsResponseType>({
  queryKey: ["chat_rooms"],
  queryFn: getMyChatRooms,
});
```

---

## 🔧 사용 방법

### 1. 백엔드 Controller에서 @ZodResponseSchema 사용

```typescript
import { ZodResponseSchema } from "@repo/zod-response";
import { CreateFriendResponseSchema } from "@repo/validation";

@Controller("friend")
export class FriendController {
  @Post(":friendId")
  @ZodResponseSchema(CreateFriendResponseSchema)
  async createFriend(
    @User() user: AuthenticatedUser,
    @Param("friendId", ParseIntPipe) friendId: number
  ) {
    return this.friendService.createFriend(user.id, friendId);
  }
}
```

### 2. 프론트엔드 API 함수에서 타입 적용

```typescript
import type { CreateFriendResponseType } from "@repo/validation";

export const addFriend = async (
  friendId: number
): Promise<CreateFriendResponseType> => {
  const response = await apiClient.post(`/friend/${friendId}`);
  return response.data;
};
```

### 3. React Query에서 타입 사용

```typescript
import { useMutation } from "@tanstack/react-query";
import type { CreateFriendResponseType } from "@repo/validation";
import { addFriend } from "@/api/friend";

const addFriendMutation = useMutation<
  CreateFriendResponseType, // 성공 응답 타입
  Error, // 에러 타입
  number // 입력 타입 (friendId)
>({
  mutationFn: addFriend,
  onSuccess: (data) => {
    console.log("친구 추가 성공:", data.friend.nickname);
  },
});
```

---

## ✅ 체크리스트

- [x] Auth 스키마 완성 (회원가입, 로그인)
- [x] Friend 스키마 완성 (친구 추가, 목록, 상세)
- [x] Chat 스키마 완성 (채팅방 목록)
- [ ] 백엔드 Controller에 @ZodResponse 적용
- [ ] 프론트엔드 API 함수에 타입 적용
- [ ] React Query에 타입 적용

---

## 📝 주의사항

1. **Date vs String**: Prisma는 `Date` 객체를 반환하지만, JSON 직렬화 시 `string`으로 변환됩니다. 필요에 따라 `.toISOString()` 또는 `.toDateString()` 사용
2. **Nullable vs Optional**: `nullable()`은 `null` 허용, `optional()`은 `undefined` 허용
3. **배열 응답**: `z.array(Schema)` 형태로 정의
4. **중첩 객체**: `extend()` 또는 `merge()`로 스키마 조합

---

생성 날짜: 2025-11-08
