import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { parseCookies } from "nookies";

// const cookies = parseCookies();
// const token = cookies.nToken;

const BASE_URL = "http://localhost:3000/reviews";

export const reviewsApiSlice = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const cookies = parseCookies();
      headers.set("Authorization", `Bearer ${cookies.nToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addReview: builder.mutation<Review, addReviewDto>({
      query: (reviewDto) => ({
        url: "/",
        method: "POST",
        body: reviewDto,
      }),
    }),
    getReviewsByUser: builder.query<GetReviewsRes, { user_id: number }>({
      query: ({user_id}) => `/${user_id}`,
    }),
  }),
});

export const { useAddReviewMutation, useGetReviewsByUserQuery } =
  reviewsApiSlice;

type addReviewDto = {
  recipient_id: number;
  review_text: string;
};
export type Review = {
  review_id: number;
  review_text: string;
  review_creation_date: string;
  reviewer_id: {
    user_id: number;
    full_name: string;
    user_photo: string | null;
  };
};

export type GetReviewsRes = {
  userID: number;
  totaCounts: number;
  userReviews: Review[];
};
