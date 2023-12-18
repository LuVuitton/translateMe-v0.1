import { Link } from "@/navigation";
import s from "./index.module.scss";
import { getTranslations } from "next-intl/server";

const policyLinks = [
  { href: `#`, text: "privacyPolicy" },
  { href: `#`, text: "termsService" },
  { href: `#`, text: "cookieSettings" },
];

const Policy = async () => {
  const t = await getTranslations("footer.policy");
  const mapPolicy = policyLinks.map((e) => (
    <Link key={e.text} href={e.href} className={s.policyItem}>
      {t(e.text)}
    </Link>
  ));

  return <nav className={s.policy}>{mapPolicy}</nav>;
};

export default Policy;
