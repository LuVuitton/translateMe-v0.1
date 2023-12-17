import { Link } from "@/navigation";
import s from "./index.module.scss";


const policyLinks = [
  { href: `#`, text: "Privacy Policy" },
  { href: `#`, text: "Terms of Service" },
  { href: `#`, text: "Cookie Settings" },
];

const Policy = () => {
  const mapPolicy = policyLinks.map((e) => (
    <Link key={e.text} href={e.href} className={s.policyItem}>
      {e.text}
    </Link>
  ));

  return <nav className={s.policy}>{mapPolicy}</nav>;
};

export default Policy;
