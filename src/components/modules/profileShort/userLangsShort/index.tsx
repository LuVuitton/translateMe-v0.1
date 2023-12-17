import s from "./userlangsshort.module.scss";
import { useTranslations } from "next-intl";
import { useGetUserLangsQuery } from "@/app/api/clientRequests/user/user-lang/user-lang.api";
import { IconNoSmile } from "@/components/svgs";

export default function UserLangsShort({ userID }: { userID: number }) {
  const t = useTranslations("common.languages");

  const { data, isLoading } = useGetUserLangsQuery({ userID });

  const mappedLanguages = data?.languages.map((e: any) => (
    <li key={e.language_id} className={s.itemWrapper}>
      <div className={s.languageName}>{t(`${e.language_id}`)}:</div>
      <div className={s.proficiency}>{t(`proficiency.${e.proficiency}`)}</div>
    </li>
  ));
  if (isLoading) {
    return <>Loading...</>;
  }
  if (mappedLanguages && mappedLanguages.length > 0) {
    return <ul className={s.UserLangsWrapper}>{mappedLanguages}</ul>;
  } else {
    return (
      <div className={s.noLanguages}>
          <IconNoSmile className={s.iconAdded}/>
      <div>{t("notAdded")}</div>  
      </div>
    );
  }
}
