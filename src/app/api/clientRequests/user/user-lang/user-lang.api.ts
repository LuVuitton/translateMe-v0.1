import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { parseCookies } from "nookies";

const BASE_URL = "http://localhost:3000/user-lang";

export const userLangApiSlice = createApi({
  reducerPath: "userLangApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const cookies = parseCookies();
      headers.set("Authorization", `Bearer ${cookies.nToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserLangs: builder.query<LangRes, { userID: number }>({
      query: ({ userID }) => ({
        url: `/${userID}`,
      }),
    }),
    addMeLang: builder.mutation<LangRes, AddMeLangDto>({
      query: (addMeLangDto) => ({
        url: "/",
        method: "POST",
        body: addMeLangDto,
      }),
    }),
    deleteMeLang: builder.mutation<DeleteMeLangRes, { languageID: number }>({
      query: (languageID) => ({
        url: `/language_id=${languageID}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useAddMeLangMutation, useDeleteMeLangMutation, useGetUserLangsQuery } =
  userLangApiSlice;

type UserLang = {
  proficiency: number;
  language_id: number;
  language_name: string;
};
type LangRes = {
  user_id: number;
  languageCount: number;
  languages: UserLang[];
};
export type AddMeLangDto = {
  languages: [number, 1 | 2 | 3][];
};
type DeleteMeLangRes = {
  message: string;
};
