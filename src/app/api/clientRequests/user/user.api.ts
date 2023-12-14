import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../auth/auth.api";
import { parseCookies } from "nookies";

const BASE_URL = "http://localhost:3000/user";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const cookies = parseCookies();
      headers.set("Authorization", `Bearer ${cookies.nToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<MeResponse, void>({
      query: () => `/me`,
    }),

    getUser: builder.query<MeResponse, { userID: number }>({
      query: ({ userID }) => `/${userID}`,
    }),

    updateUser: builder.mutation<UpdateUserRes, UpdateUserDto>({
      query: (updateUserDto) => ({
        url: "/me",
        method: "PATCH",
        body: updateUserDto,
      }),
    }),
  }),
});

export const { useGetMeQuery, useGetUserQuery, useUpdateUserMutation } =
  userApiSlice;

export type MeResponse = Omit<UserType, "token">;

export type UpdateUserDto = {
  user_photo?: string;
  country_id?: number;
  city_id?: number;
  about_me?: string;
};

export type UpdateUserRes = {
  success: boolean;
  message: string;
  user: Omit<UserType, "token">;
};
