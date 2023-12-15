import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { parseCookies } from "nookies";


// const BASE_URL = "http://localhost:3000/assignment";
const BASE_URL = "https://translate-me.onrender.com/assignment";

const generateSortQuery = (dto: GetSortedDto) => {
  const limit = dto.limit ? `limit=${dto.limit}&` : "";
  const location =
    dto.location && dto.location_id
      ? `location=${dto.location}&location_id=${dto.location_id}&`
      : "";
  let matchinglang = "";
  if (dto.matchinglang) {
    matchinglang = dto.matchinglang.map((e) => `matchinglang=${e}&`).join("");
  }

  return `?${limit}${location}${matchinglang}`;
};

export const assignmentApiSlice = createApi({
  reducerPath: "assignmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const cookies = parseCookies();
      headers.set("Authorization", `Bearer ${cookies.nToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createAssignment: builder.mutation<Assignment, CreateAssignmentDto>({
      query: (assignmentDto) => ({
        url: "/",
        method: "POST",
        body: assignmentDto,
      }),
    }),
    getAssignmentByID: builder.query<GetByIDRes, number>({
      query: (assignmentID) => `/${assignmentID}`,
    }),
    getSortedAssignment: builder.query<GetSortedRes, GetSortedDto>({
      query: (assignmentQuery) => {
        const generetedString = generateSortQuery(assignmentQuery);
        return `/sort${generetedString}`;
      },
    }),
    getMyAssignment: builder.query<GetMyAssignment, void>({
      query: () => {
        return `/all-my-assignments`;
      },
    }),
    selectCandidate: builder.mutation<PickOneCandidateRes, PickOneCandidateDto >(
      {
        query: (pickOneDto) => ({
          url: "/",
          method: "PATCH",
          body: pickOneDto,
        }),
      }
    ),
  }),
});

export const {
  useCreateAssignmentMutation,
  useGetSortedAssignmentQuery,
  useGetAssignmentByIDQuery,
  useGetMyAssignmentQuery,
  useSelectCandidateMutation
} = assignmentApiSlice;

export type CreateAssignmentDto = {
  address: string;
  assignment_date: string;
  assignment_title: string;
  city_id: number;
  country_id: number;
  assignment_description: string;
  execution_time_minutes: number;
  worth: number;
  customer_languages_id: number[];
  required_languages_id: number[];
};

type Assignment = Omit<
  CreateAssignmentDto,
  "customer_languages_id" | "required_languages_id"
> & {
  customer: {
    customer_id: number;
    full_name: string;
    user_photo: string | null;
  };
  executor_rating_by_customer: null;
  customer_rating_by_executor: null;
  assignment_id: number;
  assignment_status: number;
  views: number;
  assignment_creation_date: string;
  assignment_update_date: string;
  executor: {
    executor_id: number | null;
    full_name: string | null;
    user_photo: string | null;
  };
};

export type GetByIDRes = Assignment & {
  candidates: {
    candidatesCount: number;
    candidates: number[];
  };
};
type GetSortedDto = {
  limit?: number;
  location?: "city" | "country";
  location_id?: number;
  matchinglang?: number[];
};
export type AssignmentListItem = {
  assignment_id: number;
  assignment_date: string;
  worth: number;
  country_id: number;
  city_id: number;
  assignment_title: string;
  assignment_description: string;
  required_languages_id: number[];
  customer_languages_id: number[];
  assignment_creation_date: string;
};
export type GetSortedRes = {
  totalCount: number;
  assigments: AssignmentListItem[];
};

export type GetMyAssignment = {
  user_id: number;
  totalCount: number;
  data: {
    assignment_id: number;
    worth: number;
    assignment_status: number;
    address: string;
    assignment_date: string;
    country_id: number;
    city_id: number;
    assignment_title: string;
    assignment_description: string;
    execution_time_minutes: number;
    executor_rating_by_customer: null;
    customer_rating_by_executor: null;
    views: number;
    assignment_creation_date: string;
    assignment_update_date: string;
    required_languages_id: number[];
    customer_languages_id: number[];
    candidates: {
    totalCount: number,
    assignment_id: number,
    candidates:number[]
    }
  }[];
};

type PickOneCandidateDto = {
  assignment_id: number;
  candidate_id: number;
};

type PickOneCandidateRes = {
  success: boolean;
  message: string;
  assigment_status: number;
};
