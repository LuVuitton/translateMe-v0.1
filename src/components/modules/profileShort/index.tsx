"use client";
import Image from "next/image";
import s from "./profileshort.module.scss";
import noPhotoImg from "../../../../public/icons/user.png";
import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import Contacts from "@/components/modules/profile/Contacts/Contacts";
import { MeResponse } from "@/app/api/clientRequests/user/user.api";
import Rating from "./Rating/Rating";
import { useTranslations } from "next-intl";
import UserLangsShort from "./UserLangsShort/UserLangsShort";
import { Section, Title } from "@/components";
import ProfileShortHead from "./ProfileShortHead/ProfileShortHead";

export default function ProfileShort({ userData }: Props) {
  const t = useTranslations("profilePage");

  const {
    city_id,
    country_id,
    // email,
    full_name,
    user_id,
    user_photo,
    user_registration_date,
    // user_update_date,
    // about_me,
  } = userData;

  const registration_day = formatIsoDateToDMHM(user_registration_date, "DMY");

  return (
    <Section>
      <div className={s.container}>
        {/* <div className={s.main}>
          <div className={s.mainPhoto}>
            <Image
              className={s.mainPhotoImg}
              fill={true}
              src={user_photo ? user_photo : noPhotoImg}
              alt={user_photo ? t("userPhoto") : t("noPhoto")}
            />
          </div>
          <div className={s.mainParams}>
            <Title type="small">{full_name}</Title>
            <div>
              <span className={s.mainParamsTitle}> {t("registered")}:</span>
              <span> {registration_day}</span>
            </div>
            <div>
              <span className={s.mainParamsTitle}>
                {t("createdAsCustomer")}:
              </span>
              <span> ??</span>
            </div>
            <div>
              <span className={s.mainParamsTitle}>
                {t("complitedAsExecutor")}:
              </span>
              <span> ??</span>
            </div>
          </div>
        </div> */}
<ProfileShortHead full_name={full_name} userID={user_id} user_photo={user_photo} user_registration_date={user_registration_date}/>
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
    </Section>
  );
}

type Props = {
  // userID: number;
  userData: MeResponse;
};
