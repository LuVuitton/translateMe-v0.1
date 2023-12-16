import { useTranslations } from "next-intl";
import s from "./index.module.scss";
import { generatelanguagesBlocks } from "@/helpers/generateLanguageBlocks/generateLanguageBlocks";

const Languages = ({ speaksLang, needsLang }: Props) => {
  const t = useTranslations("assignmnentPage");
  const needs = generatelanguagesBlocks(needsLang);
  const speaks = generatelanguagesBlocks(speaksLang);

  return (
    <div className={s.langs}>
      <div>
        <div className={s.langsTitle}> {t("speaks")}:</div>
        <div className={s.langsSpeak}> {speaks}</div>
      </div>
      <div>
        <div className={s.langsTitle}> {t("needs")}: </div>
        <div className={s.langsNeed}> {needs} </div>
      </div>
    </div>
  );
};

export default Languages;

type Props = {
  speaksLang: number[];
  needsLang: number[];
};
