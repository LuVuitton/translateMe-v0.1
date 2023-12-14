"use client";

import s from "./profileshort.module.scss";
import Contacts from "@/components/modules/profile/Contacts/Contacts";
import { useGetUserQuery } from "@/app/api/clientRequests/user/user.api";
import Rating from "./Rating/Rating";
import { useTranslations } from "next-intl";
import UserLangsShort from "./UserLangsShort/UserLangsShort";
import {Title } from "@/components";
import ProfileShortHead from "./ProfileShortHead/ProfileShortHead";

export default function ProfileShort({ userID, children }: Props) {
  const t = useTranslations("profilePage");
  const { data, isLoading } = useGetUserQuery({ userID });

  if (isLoading) {
    return <div>ProfileShort loading...</div>;
  }
  if (data) {
    const { full_name, user_id, user_photo, user_registration_date } = data;

    return (
      <div className={s.container}>
        <ProfileShortHead
          full_name={full_name}
          userID={user_id}
          user_photo={user_photo}
          user_registration_date={user_registration_date}
        >
          {children}
        </ProfileShortHead>

        <div className={s.langs}>
          <div className={s.langsItem}>
            <Title type="small" className={s.langsTitle}>
              {t("contacts")}
            </Title>
            <Contacts userID={user_id} />
          </div>
          <div className={s.langsItem}>
            <Title type="small" className={s.langsTitle}>
              {t("languages")}
            </Title>
            <UserLangsShort userID={user_id} />
          </div>
        </div>
      </div>
    );
  }
}
type Props = {
  userID: number;
  children: React.ReactNode;
};
