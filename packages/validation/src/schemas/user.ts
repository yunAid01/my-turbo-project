import { z } from "zod";

export const updateUserProfileSchema = z.object({
  nickname: z.string().min(2).max(10).optional(),
  profileImageUrl: z.string().url().nullable().optional(),
  statusMessage: z.string().max(15).nullable().optional(),
});
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
