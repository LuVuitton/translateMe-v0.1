import { getTranslations } from "next-intl/server";
import s from "./index.module.scss";
import { getUserLangs } from "@/app/api/serverRequests/profile/user";

export default async function UserLangs({ userID }: { userID: number }) {
  const t = await getTranslations("common.languages");


  const data = await getUserLangs({ userID });

  const mappedLanguages = data.languages.map((e: any) => (
    <li key={e.language_id} className={s.itemWrapper}>
      <div className={s.languageName}>{t(`${e.language_id}`)}</div>
      <div className={s.proficiency}>{t(`proficiency.${e.proficiency}`)}</div>

    </li>
  ));
  if (mappedLanguages.length > 0) {
    return <ul className={s.UserLangsWrapper}>{mappedLanguages}</ul>;
  } else {
    return <div className={s.noLanguages}>{t("notAdded")}</div>;
  }
}
