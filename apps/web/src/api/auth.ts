import apiClient from "./client";

// types
import {
  LoginUserInputType,
  LoginUserResponseType,
  CreateUserInputType,
  CreateUserResponseType,
} from "@repo/validation";

export const userLogin = async (
  loginData: LoginUserInputType
): Promise<LoginUserResponseType> => {
  const response: LoginUserResponseType = await apiClient.post(
    "/auth/login",
    loginData
  );
  return response;
};

export const userRegister = async (
  registerData: CreateUserInputType
): Promise<CreateUserResponseType> => {
  const response: CreateUserResponseType = await apiClient.post(
    "/auth/register",
    registerData
  );
  return response;
};
