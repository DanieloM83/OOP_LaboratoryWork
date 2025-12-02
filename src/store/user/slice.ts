import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// import { MOCK_USER_DATA } from "@/constants";
import type { UserCredentialsType, UserType } from "@/types/user";
import type { RootState } from "..";

export interface UserState {
  data: UserType | null;
}

const initialState: UserState = {
  // Start logged out by default
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.data = action.payload;
    },
    updateUser(state, action: PayloadAction<Partial<UserType>>) {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      } else {
        state.data = { isAuth: false, username: "", email: "", password: "", ...action.payload } as UserType;
      }
    },
    deleteUser(state) {
      state.data = null;
    },
    setAuth(state, action: PayloadAction<boolean>) {
      if (state.data) state.data.isAuth = action.payload;
      else state.data = { isAuth: action.payload, username: "", email: "", password: "" };
    },
  login(state, action: PayloadAction<UserCredentialsType & { username?: string }>) {
      const { email, password, username } = action.payload;
      if (state.data) {
        state.data.email = email;
        state.data.password = password;
        if (username) state.data.username = username;
        state.data.isAuth = true;
      } else {
        state.data = {
          email,
          password,
          username: username ?? email.split("@")[0] ?? "",
          isAuth: true,
        };
      }
    },
    logout(state) {
      if (state.data) state.data.isAuth = false;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setUser, updateUser, deleteUser, setAuth, login, logout } = userSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.user.data;
export const selectIsAuth = (state: RootState) => Boolean(state.user.data?.isAuth);