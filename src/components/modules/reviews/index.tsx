"use client";
import { useGetReviewsByUserQuery } from "@/app/api/clientRequests/reviews/reviews.api";
import { ReviewsList } from "./reviewsList";
import { ReviewForm } from "./reviewForm";
import s from "./index.module.scss";
import { Section, Title } from "@/components";
import { useTranslations } from "next-intl";

const Reviews = ({ userID }: { userID: number }) => {
  const t = useTranslations("profilePage.review");
  const { data, isLoading, isError, isSuccess, refetch } =
    useGetReviewsByUserQuery({
      user_id: userID,
    });

  return (
    <Section className={s.section}>
      <div className={s.review}>
        <Title type="small" className={s.reviewTitle}>
          {t("reviewTitle")}
        </Title>
        <ReviewForm
          userID={userID}
          callback={refetch}
          placeholder={t("placeholder")}
          btnText={t("addCommentsBtn")}
        />
        {isLoading && <div>LOADING!!!!!!...</div>}
        {data ? (
          <ReviewsList data={data} />
        ) : (
          <div>there is no comment yet</div>
        )}
      </div>
    </Section>
  );
};
export default Reviews;
