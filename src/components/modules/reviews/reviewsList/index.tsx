"use client";
import { GetReviewsRes} from "@/app/api/clientRequests/reviews/reviews.api";
import { ReviewItem } from "../reviewItem";

export const ReviewsList = ({ data }: Props) => {

  const listReviews = data.userReviews.map((e) => (
    <ReviewItem
      key={e.review_id}
      review_creation_date={e.review_creation_date}
      review_text={e.review_text}
      reviewer_id={e.reviewer_id}
    />
  )).reverse();



  return <div> {listReviews}</div>;
};

type Props = {
  data: GetReviewsRes;
};
