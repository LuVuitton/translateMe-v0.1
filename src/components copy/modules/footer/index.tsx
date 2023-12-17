import { Section } from "@/components";
import s from "./index.module.scss";
import { getTranslations } from "next-intl/server";
import Social from "./social";
import Policy from "./policy";
import MainNav from "./mainNav";
import FooterLanguages from "./languages";

const Footer = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className={s.wrapper}>
      <div className={s.footer}>
        <Section>
          <div className={s.footerTop}>
          <MainNav />
          <FooterLanguages />
          </div>
          <Social text={t("followUs")} />
          <Policy />
        </Section>
      </div>
    </footer>
  );
};

export default Footer;
