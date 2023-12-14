import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../auth/auth.api";
import { parseCookies } from "nookies";



const BASE_URL = "http://localhost:3000/";

export const assignmentsLangsApiSlice = createApi({
  reducerPath: "assignmentsLangsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // prepareHeaders: (headers) => {
    //   headers.set("Authorization", `Bearer ${token}`);
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getCustomerLangsByAsID: builder.query<
      GetAssignmentLangsRes,
      { assignmentID: number }
    >({
      query: ({ assignmentID }) => `customer-lang/${assignmentID}`,
    }),
    getRequiredLangsByAsID: builder.query<
      GetAssignmentLangsRes,
      { assignmentID: number }
    >({
      query: ({ assignmentID }) => `required-lang/${assignmentID}`,
    }),
  }),
});

export const {
  useGetCustomerLangsByAsIDQuery,
  useGetRequiredLangsByAsIDQuery,
} = assignmentsLangsApiSlice;

type GetAssignmentLangsRes = {
  assignment_id: number;
  totalLanguages: number;
  сustomer_languages?: Language[];
  required_languages?: Language[];
};

type Language = {
  item_id: number;
  language_id: number;
  language_name: string;
};
