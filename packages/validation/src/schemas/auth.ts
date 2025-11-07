import { z } from "zod";

/** create user request zod schema */
export const CreateUserSchema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요" }),
  nickname: z.string().min(3, { message: "닉네임은 3글자 이상이어야 합니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 6글자 이상이어야 합니다." }),
});
export type CreateUserInputType = z.infer<typeof CreateUserSchema>;

/** login user request zod schema */
export const LoginUserSchema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요" }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 6글자 이상이어야 합니다." }),
});
export type LoginUserInputType = z.infer<typeof LoginUserSchema>;

/** user response schema */
export const UserResponseSchema = z.object({
  id: z.number(),
  email: z.string().email({ message: "유효한 이메일을 입력해주세요" }),
  nickname: z.string().min(3),
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "유효한 날짜 형식이 아닙니다.",
  }),
  statusMessage: z.string().nullish(), // string | undefined | null
  profileImage: z.string().nullish(), // string | undefined | null
});
export type CreateUserResponseType = z.infer<typeof UserResponseSchema>;

/** login user response zod schema */
export const LoginResponseSchema = z.object({
  access_token: z.string(),
  user: UserResponseSchema,
});
export type LoginUserResponseType = z.infer<typeof LoginResponseSchema>;
