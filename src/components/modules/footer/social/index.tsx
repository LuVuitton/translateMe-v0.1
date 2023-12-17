import { Link } from "@/navigation";
import s from "./index.module.scss";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconTelegram,
} from "@/components/svgs";

const socialLinks = [
  {
    href: `#`,
    text: "LinkedIn",
    icon: <IconLinkedIn />,
    className: s.footerSocialLinkedIn,
  },
  {
    href: `#`,
    text: "Telegram ",
    icon: <IconTelegram />,
    className: s.footerSocialTelegram,
  },
  {
    href: `#`,
    text: "Instagram",
    icon: <IconInstagram />,
    className: s.footerSocialInstagram,
  },
  {
    href: `#`,
    text: "Facebook",
    icon: <IconFacebook />,
    className: s.footerSocialFacebook,
  },
];

const Social = ({ text }: { text: string }) => {
  const mapSocial = socialLinks.map((e) => (
    <Link key={e.text} href={e.href} className={`${s.footerSocialIcon} ${e.className}`}>
      {e.icon}
    </Link>
  ));

  return (
    <nav className={s.footerSocial}>
      <div>{text}</div>
      {mapSocial}
    </nav>
  );
};

export default Social;
