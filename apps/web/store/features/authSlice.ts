import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../store";
import type { AuthenticatedUser } from "@repo/types";

export interface AuthState {
  user: AuthenticatedUser | null;
  token: string | null;
}
const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthenticatedUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
    },

    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("access_token");
    },
  },
});

export default authSlice.reducer;

//action
export const { setCredentials, clearCredentials } = authSlice.actions;

//selector
export const selectCurrentUser = (state: AppState) => state.auth.user;
export const selectCurrentToken = (state: AppState) => state.auth.token;
