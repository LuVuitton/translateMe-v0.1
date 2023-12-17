"use client";
import Image from "next/image";
import s from "./profileshorthead.module.scss";
import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import { useTranslations } from "next-intl";
import { Title } from "@/components";
import { Link } from "@/navigation";
import { IconUser } from "@/components/svgs";

export default function ProfileShortHead({
  full_name,
  userID,
  user_photo,
  user_registration_date,
  children,
}: Props) {
  const t = useTranslations("profilePage");

  const registration_day = formatIsoDateToDMHM(user_registration_date, "DMY");

  return (
    <div className={s.main}>
      <div className={s.mainPhoto}>
        {user_photo ? (
          <Image
            className={s.mainPhotoImg}
            fill={true}
            src={user_photo}
            alt={user_photo ? t("userPhoto") : t("noPhoto")}
          />
        ) : (
          <IconUser />
        )}
      </div>
      <div className={s.mainParams}>
        <Title type="small">{full_name}</Title>
        <div>
          <span className={s.mainParamsTitle}> {t("registered")}:</span>
          <span> {registration_day}</span>
        </div>
        <div>
          <span className={s.mainParamsTitle}>{t("createdAsCustomer")}:</span>
          <span> ??</span>
        </div>
        <div>
          <span className={s.mainParamsTitle}>{t("complitedAsExecutor")}:</span>
          <span> ??</span>
        </div>
      </div>
      <div className={s.mainNav}>
        <Link href={`profile/${userID}`} className={s.mainNavLink}>
          {t("openFullProfile")}
        </Link>
        {children}
      </div>
    </div>
  );
}

type Props = {
  userID: number;
  full_name: string;
  user_photo: string | null;
  user_registration_date: string;
  children: React.ReactNode;
};
