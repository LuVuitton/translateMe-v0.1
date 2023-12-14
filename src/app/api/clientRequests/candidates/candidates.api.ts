import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { parseCookies } from "nookies";


const BASE_URL = "http://localhost:3000/candidates";

export const candidatesApiSlice = createApi({
  reducerPath: "candidatesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const cookies = parseCookies();
      headers.set("Authorization", `Bearer ${cookies.nToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addMeAsCandidate: builder.mutation<CandidateCDRes, CandidateDto>({
      query: (candidateDto) => ({
        url: "/",
        method: "POST",
        body: candidateDto,
      }),
    // transformErrorResponse(baseQueryReturnValue, meta, arg) {
    //   toast.error("addMeAsCandidate change api responses to one type")
    // },
    
    }),
    deleteMeAsCandidate: builder.mutation<CandidateCDRes, CandidateDto>({
      query: (candidateDto) => ({
        url: "/",
        method: "DELETE",
        body: candidateDto,
      }),
      // transformErrorResponse(baseQueryReturnValue, meta, arg) {
      //   toast.error("deleteMeAsCandidate change api responses to one type")
      // },
    }),
    getCandidatesByAsID: builder.query<
      GetCandidatesByAsIDRes,
      { assignmentID: number }
    >({
      query: ({ assignmentID }) => `/${assignmentID}`,
    }),
    getAssignmentsByCandidateID: builder.query<GetAppliedAssignments, void>({
      query: () => `/`,
    }),
  }),
  
});

export const {
  useAddMeAsCandidateMutation,
  useDeleteMeAsCandidateMutation,
  useGetCandidatesByAsIDQuery,
  useGetAssignmentsByCandidateIDQuery,
} = candidatesApiSlice;

type CandidateDto = {
  assignment_id: number;
};
type CandidateCDRes = {
  message: string;
  assignment_id: number;
  user_id: number;
};
type GetCandidatesByAsIDRes = {
  totalCount: number;
  assignment_id: number;
  candidates: Candidates[];
};

type Candidates = {
  assignment_id: number;
  apply_time: string;
  candidate_id: number;
  candidate_full_name: string;
  candidate_photo: string | null;
  isExecutor: boolean;
};

type GetAppliedAssignments = {
  totalCount: number;
  candidate_id: number;
  assignments: {
    assignment_id: number;
    apply_time: string;
    worth: number;
    status: number;
    address: string;
    date: string;
    country_id: number;
    city_id: number;
    title: string;
    description: string;
    execution_time_minutes: number;
    executor_id: number | null;
  }[];
};
