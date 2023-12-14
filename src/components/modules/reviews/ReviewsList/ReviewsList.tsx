"use client";
import { GetReviewsRes} from "@/app/api/clientRequests/reviews/reviews.api";
import { ReviewItem } from "../ReviewItem/ReviewItem";

export const ReviewsList = ({ data }: Props) => {
  // const addeds = useAppSelector((state) => state.review.additionalReviews);
  // if (data.userReviews.length === 0) {
  //   return <div> there is no reviews yet</div>;
  // }

  const listReviews = data.userReviews.map((e) => (
    <ReviewItem
      key={e.review_id}
      review_creation_date={e.review_creation_date}
      review_text={e.review_text}
      reviewer_id={e.reviewer_id}
    />
  )).reverse();

  // if (addeds.length !== 0) {
  //   const addItems = addeds.map((e) => (

  //     <ReviewItem
  //       key={e.review_id}
  //       review_creation_date={e.review_creation_date}
  //       review_text={e.review_text}
  //       reviewer_id={e.reviewer_id}
  //     />

  //   ));

  //   listReviews.unshift(<div>{addeds.length +1}{'hello'}</div>);
  // }

  return <div> {listReviews}</div>;
};

type Props = {
  data: GetReviewsRes;
};
