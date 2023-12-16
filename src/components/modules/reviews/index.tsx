"use client";
import { useGetReviewsByUserQuery } from "@/app/api/clientRequests/reviews/reviews.api";
import { ReviewsList } from "./reviewsList";
import { ReviewForm } from "./reviewForm";

 const Reviews = ({ userID }: { userID: number }) => {

  const { data, isLoading, isError, isSuccess, refetch } = useGetReviewsByUserQuery({
    user_id: userID,
  });

  

  return (
    <>
      <ReviewForm userID={userID} callback={refetch} />
      {isLoading && <div>LOADING!!!!!!...</div>}
      {data ? <ReviewsList data={data} /> : <div>there is no comment yet</div>}
    </>
  );
};
export default Reviews