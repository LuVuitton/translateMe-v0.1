import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { destroyCookie, setCookie } from "nookies";

const initialState: InitialState = {
  data: null,
  isLogged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      state.data = action.payload;
    },
    setIsLogged: (
      state,
      action: PayloadAction<{ isLogged: boolean; token?: string }>
    ) => {
      if (!action.payload.isLogged) {
        destroyCookie(null, "nToken", {
          path: "/", // THE KEY IS TO SET THE SAME PATH
        });
        state.data = null;
      } else if (action.payload.isLogged && action.payload.token) {
        setCookie(null, "nToken", action.payload.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      }
      state.isLogged = action.payload.isLogged;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setUserData, setIsLogged } = userSlice.actions;

export type UserState = {
  user_id: number;
  full_name: string;
  email: string;
  user_registration_date: string;
} | null;

export type InitialState = {
  data: UserState;
  isLogged: boolean;
};
