import { Link } from "@/navigation";
import s from "./index.module.scss";
import { getTranslations } from "next-intl/server";

const mainLinks = [
  { href: `/whywedothis`, text: "whywedothis" },
  { href: `/contacts`, text: "contacts" },
  { href: `#`, text: "howfindtranslator" },
  { href: `#`, text: "howtofindwork" },
];

const MainNav = async () => {
  const t = await getTranslations("footer.main");

  const mapMain = mainLinks.map((e) => (
    <span key={e.text} className={s.mainItem}>
      <Link href={e.href}>{t(e.text)}</Link>
    </span>
  ));

  return <nav className={s.main}>{mapMain}</nav>;
};

export default MainNav;
