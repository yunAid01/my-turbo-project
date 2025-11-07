"use client";
// hooks
import { useRegisterMutation } from "../../hooks/useRegisterMutation";

// react-hook-form
import { useForm } from "react-hook-form";
import {
  CreateUserInputType as CreateUserInput,
  CreateUserSchema,
} from "@repo/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(CreateUserSchema),
  });
  const { mutate: signup, isPending } = useRegisterMutation();

  const onSubmit = (formData: CreateUserInput) => {
    signup(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="이메일" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="text" placeholder="닉네임" {...register("nickname")} />
      {errors.nickname && <p>{errors.nickname.message}</p>}

      <input type="password" placeholder="비밀번호" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? "회원가입 중..." : "회원가입"}
      </button>
    </form>
  );
}
