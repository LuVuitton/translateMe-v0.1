import { Link } from "@/navigation";
import s from "./index.module.scss";

const mainLinks = [
  { href: `/whywedothis`, text: "Why We Do This" },
  { href: `/contacts`, text: "Contacts Us" },
  { href: `#`, text: "How to Find a Translator" },
  { href: `#`, text: "How to Find Work" },
];

const MainNav = () => {
  const mapMain = mainLinks.map((e) => (
    <span key={e.text} className={s.mainItem}>
      <Link href={e.href}>{e.text}</Link>
    </span>
  ));

  return <nav className={s.main}>{mapMain}</nav>;
};

export default MainNav;
