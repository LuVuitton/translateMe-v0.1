import Image from "next/image";
import s from "./index.module.scss";
import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import Contacts from "@/components/modules/profile/contacts";
import { MeResponse } from "@/app/api/clientRequests/user/user.api";
import { citiesMapping, countriesMapping } from "@/helpers/mappingData";
import UserLangs from "@/components/modules/profile/userLangs";
import { Link } from "@/navigation";

import Rating from "./rating";
import { getTranslations } from "next-intl/server";
import { IconUser } from "@/components/svgs";

export default async function Profile({ userData }: Props) {
  const t = await getTranslations("profilePage");

  const {
    city_id,
    country_id,
    email,
    full_name,
    user_id,
    user_photo,
    user_registration_date,
    user_update_date,
    about_me,
  } = userData;

  const registration_day = formatIsoDateToDMHM(user_registration_date, "DMY");
  const city = !city_id ? "" : citiesMapping[city_id];
  const country = !country_id ? "" : countriesMapping[country_id].countryName;

  return (
    <div className={s.profileWrapper}>
      <div className={s.container}>
        <div className={s.profileContainer}>
          <div className={s.info}>
            <div className={s.innerBlockWrapper}>
              <div>
                {t("location")}
                <div>{city ? city : "unknown "}</div>
                <div>{country ? country : "unknown"}</div>
              </div>
              <div>
                {t("registered")}
                {registration_day}
              </div>
            </div>
            <div className={s.innerBlockWrapper}>
              <Link href={`/user-assignments/${user_id}`}>
                <div>
                  {t("createdAsCustomer")}
                  {/* {"created.length"} */}number
                </div>
              </Link>
              <Link href={`/user-assignments/${user_id}`}>
                <div>
                  {t("complitedAsExecutor")}
                  {/* {"complited.length"} */}number
                </div>
              </Link>
            </div>
          </div>
          <div className={s.photoAndName}>
            <div className={s.photo}>
              {user_photo ? (
                <Image
                  className={s.userImg}
                  fill={true} //заполняет род эл
                  src={user_photo}
                  alt={user_photo ? t("userPhoto") : t("noPhoto")}
                />
              ) : (
                <IconUser />
              )}
            </div>
            <div className={s.userName}>{full_name}</div>
          </div>
          <Rating userID={user_id} />
          <div className={s.aboutMe}>
            {about_me ? about_me : t("noDiscription")}
          </div>
          <UserLangs userID={user_id} />
          <Contacts userID={user_id} />
        </div>
      </div>
    </div>
  );
}

type Props = {
  // userID: number;
  userData: MeResponse;
};
