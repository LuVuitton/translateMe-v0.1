"use client";
import { AddMeLangs } from "@/components/modules/editProfile/addMeLangs";
import { UpdateContacts } from "@/components/modules/editProfile/updateContacts";
import { UpdateLocation } from "@/components/modules/editProfile/updateLocation";
import s from "./index.module.scss";
import { useState } from "react";
import { EditProfileOptions } from "@/components/modules/editProfile/editProfileOptions";
import { useTranslations } from "next-intl";
import { ChooseOne, Section } from "@/components";
import { UpdateAboutMe } from "./updateAboutMe";

export default function EditProfile({
  initOption = "options",
}: {
  initOption?: EditPropfileOptions;
}) {
  const t = useTranslations("editProfile");
  const [option, setOption] = useState<EditPropfileOptions>(initOption);

  const componentMap = {
    options: <EditProfileOptions callback={(option) => setOption(option)} />,
    changeLangs: <AddMeLangs />,
    cangeLocation: <UpdateLocation />,
    changeContacts: <UpdateContacts />,
    changeAboutMe: <UpdateAboutMe />,
  };

  return (
    <div className={s.wrapper}>
      {option !== "options" && (
        <button onClick={() => setOption("options")}> {t("backBtn")} </button>
      )}
      <Section className={s.nav}>
        <nav className={s.main}>{componentMap[option]}</nav>
      </Section>
    </div>
  );
}

export type EditPropfileOptions =
  | "options"
  | "changeLangs"
  | "cangeLocation"
  | "changeContacts"
  | "changeAboutMe";
