"use client";

import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import s from "./index.module.scss";
import Link from "next/link";
import { Review } from "@/app/api/clientRequests/reviews/reviews.api";
import Image from "next/image";
import noPhoto from "../../../../../public/noPhoto.jpeg";

export const ReviewItem = ({
  review_creation_date,
  review_text,
  reviewer_id: reviewer,
}: Props) => {
  const { full_name, user_id: reviewer_id, user_photo } = reviewer;

  const reviewDate = formatIsoDateToDMHM(review_creation_date, "DMHM");

  return (
    <div className={s.mainWrapper}>
      <div className={s.container}>
        <div className={s.top}>
          <Link href={`./${reviewer_id}`}>
            <div className={s.photoAndName}>
              <Image
                alt="user photo"
                src={user_photo ? user_photo : noPhoto}
                width={30}
                height={30}
                className={s.photoAndNamePhoto}
                quality={50}	
              />
              <div className={s.photoAndNameName}> {full_name}</div>
            </div>
          </Link>
          <div className={s.date}> {reviewDate}</div>
        </div>
        <div className={s.bottom}>{review_text}</div>
      </div>
    </div>
  );
};

type Props = Omit<Review, "review_id">;
