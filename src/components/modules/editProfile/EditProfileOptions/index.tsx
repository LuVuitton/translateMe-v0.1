"use client";
import { useTranslations } from "next-intl";
import s from "./index.module.scss";
import { EditPropfileOptions } from "..";

export const EditProfileOptions = ({ callback }: Props) => {
  const t = useTranslations("editProfile.options");
  const chooseOption = (option: EditPropfileOptions) => {
    callback(option);
  };

  return (
    <div className={s.mainWrapper}>
      <div className={s.container}>
        <div className={s.option} onClick={() => chooseOption("cangeInfo")}>
          {t("updateLocationAndAboutMe")}
        </div>
        <div className={s.option} onClick={() => chooseOption("changeLangs")}>
          {t("updateMyLanguages")}
        </div>
        <div
          className={s.option}
          onClick={() => chooseOption("changeContacts")}
        >
          {t("updateMyContacts")}
        </div>
      </div>
    </div>
  );
};

type Props = {
  callback: (option: EditPropfileOptions) => void;
};
