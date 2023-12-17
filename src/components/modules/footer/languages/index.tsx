import { Link } from "@/navigation";
import s from "./index.module.scss";

const locale = [
  { lang: "English", value: "en" },
  { lang: "Українська", value: "ua" },
  { lang: "Italiano", value: "it" },
  { lang: "Español", value: "es" },
  { lang: "Deutsch", value: "de" },
  { lang: "Русский", value: "ru" },
];

const FooterLanguages = () => {
  const mapLanguages = locale.map((e) => (
    <Link key={e.lang} href={"#"} >
      <li className={s.languagesItem}>{e.lang}</li>
    </Link>
  ));

  return (
    <nav className={s.languages}>
      <ul>{mapLanguages}</ul>
    </nav>
  );
};

export default FooterLanguages;
