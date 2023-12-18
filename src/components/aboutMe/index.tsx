import { getTranslations } from "next-intl/server";
import { NoContent, Section } from "..";
import s from "./index.module.scss";
import { Title } from "@/components";

const AboutMe = async ({ aboutMe }: { aboutMe: string | null }) => {
  const t = await getTranslations("profilePage");

  return (
    <Section className={s.aboutMe}>
      {aboutMe ? (
        <>
          <Title className={s.aboutMeTitle} type="small">
            {t("aboutMeTitle")}
          </Title>
          <div>{aboutMe}</div>
        </>
      ) : (
        <NoContent text={t("noAboutMe")} />
      )}
    </Section>
  );
};

export default AboutMe;
