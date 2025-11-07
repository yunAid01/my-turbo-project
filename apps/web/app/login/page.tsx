"use client";
import LoginForm from "../../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <LoginForm />
      <p>
        계정이 없으신가요? <a href="/register">회원가입</a>
      </p>
    </div>
  );
}
