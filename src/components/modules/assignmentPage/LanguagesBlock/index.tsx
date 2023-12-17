"use client";

import {
  useGetCustomerLangsByAsIDQuery,
  useGetRequiredLangsByAsIDQuery,
} from "@/app/api/clientRequests/languages/assignmentsLangs.api";
import { useTranslations } from "next-intl";
import s from "./index.module.scss";
import { Preloader } from "@/components";
import { IconLang } from "@/components/svgs";

let needsLang: JSX.Element[] | undefined;
let speaksLang: JSX.Element[] | undefined;

const LanguagesBlock = ({ assignmentID }: LanguagesBlock) => {
  const t = useTranslations("assignmnentPage");
  const commonName = useTranslations("common");

  const { data: rData } = useGetRequiredLangsByAsIDQuery({
    assignmentID,
  });
  const { data: cData } = useGetCustomerLangsByAsIDQuery({
    assignmentID,
  });
  if (rData) {
    needsLang = rData?.required_languages?.map((e, i) => (
      <div key={i}> {commonName(`languages.${e.language_id}`)}</div>
    ));
    speaksLang = cData?.сustomer_languages?.map((e, i) => (
      <div key={i}>{commonName(`languages.${e.language_id}`)}</div>
    ));
  }

  return (
    <div className={s.languages}>
      <div className={s.languagesItem}>
        <IconLang className={s.languagesItemIcon} />
        <span className={s.languagesItemTitle}>{t("speaks")}: </span>
      </div>
      <div>
        <div className={s.languagesItem}>
          <IconLang className={s.languagesItemIcon} />
          <span className={s.languagesItemTitle}>{t("needs")}: </span>
        </div>
      </div>
      <div> {speaksLang ? speaksLang : <Preloader type="local" />}</div>
      <div> {needsLang ? needsLang : <Preloader type="local" />}</div>
    </div>
  );
};

export default LanguagesBlock;

type LanguagesBlock = {
  assignmentID: number;
};
