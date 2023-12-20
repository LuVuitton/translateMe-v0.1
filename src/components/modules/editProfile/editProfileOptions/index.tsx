"use client";
import { useTranslations } from "next-intl";
import s from "./index.module.scss";
import { EditPropfileOptions } from "..";
import { ChooseOne, Section, Title } from "@/components";
import { IconLang, IconLocation, IconPhone, IconUser } from "@/components/svgs";

export const EditProfileOptions = ({ callback }: Props) => {
  const t = useTranslations("editProfile");
  const chooseOption = (option: EditPropfileOptions) => {
    callback(option);
  };

  const optionsData: OptionData[] = [
    {
      id: 0,
      optionName: "changeAboutMe",
      text: "updateAboutMe",
      description: "updateAboutMeDecs",
      icon: <IconUser className={s.optionItemIconAboutMe} />,
    },
    {
      id: 1,
      optionName: "cangeLocation",
      text: "updateLocation",
      description: "updateLocationDecs",
      icon: <IconLocation className={s.optionItemIconLocation} />,
    },
    {
      id: 2,
      optionName: "changeLangs",
      text: "updateMyLanguages",
      description: "updateMyLanguagesDesc",
      icon: <IconLang className={s.optionItemIconLang} />,
    },
    {
      id: 3,
      optionName: "changeContacts",
      text: "updateMyContacts",
      description: "updateMyContactsDesc",
      icon: <IconPhone className={s.optionItemIconPhone} />,
    },
  ];

  const mappedOptions = optionsData.map((e) => (
    <div
      key={e.id}
      className={s.optionItem}
      onClick={() => chooseOption(e.optionName)}
    >
      <Title type="small" className={s.optionItemTitle}>
        {t(e.text)}
      </Title>
      <div className={s.optionItemIcon}>{e.icon}</div>
      <div className={s.optionItemDescription}>{t(e.description)}</div>
    </div>
  ));

  return (
    <>
      <div className={s.option}>{mappedOptions}</div>
      <Section className={s.description}>
        <ChooseOne
          direction="up"
          text={t("chooseOption")}
          iconClassName={s.descriptionIcon}
        />
      </Section>
    </>
  );
};

type Props = {
  callback: (option: EditPropfileOptions) => void;
};

type OptionData = {
  id: number;
  optionName: EditPropfileOptions;
  text: string;
  description: string;
  icon: React.ReactNode;
};
