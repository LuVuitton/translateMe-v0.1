"use client";
import { useAddReviewMutation } from "@/app/api/clientRequests/reviews/reviews.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RewiewFormSchema } from "../../../../helpers/formScheme/ReviewFormSchema";
import s from './index.module.scss'
import { useTranslations } from "next-intl";
import { FormInput, TheButton } from "@/components";

export const ReviewForm = ({ userID, callback, placeholder, btnText }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ReviewsFields>({
    resolver: yupResolver(RewiewFormSchema()),
    mode: "onTouched",
  });

  const [addReview, { data, isLoading, isError, isSuccess }] =
    useAddReviewMutation();

  const onSubmit: SubmitHandler<ReviewsFields> = async (formData) => {
    await addReview({ recipient_id: +userID, review_text: formData.review });
    callback();
    reset();
  };

  return (
    // <div className={s.mainWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type={"text"}
          register={register}
          registerName={"review"}
          placeholder={placeholder}
          error={errors.review}
          errorMessage={errors?.review?.message}
          isTextarea
          rows={2}
        />
        <div className={s.btn}>
        <TheButton btnText={btnText} type="submit" isLoading={isLoading} />
        </div>
      </form>
    // </div>
  );
};

type ReviewsFields = {
  review: string;
};

type Props = {
  userID: number;
  callback: () => void;
  placeholder:string
  btnText: string
};
