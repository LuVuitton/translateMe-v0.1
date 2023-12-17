"use client";
import s from "./index.module.scss";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { UserState, setIsLogged } from "@/redux/slices/userSlice";
import { Link, usePathname, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

export const Burger = ({ userData, hideBurger, isLogged }: Props) => {
  const [showLanguage, setShowLanguage] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  // const t = getTranslations("header.settings");
  const t = useTranslations("header");
  const dispatch = useAppDispatch();

  const locale = [
    { lang: "English", value: "en" },
    // { lang: "Українська", value: "ua" },
    // { lang: "Italiano", value: "it" },
    // { lang: "Español", value: "es" },
    // { lang: "Deutsch", value: "de" },
    { lang: "Русский", value: "ru" },
  ];

  const links = [
    { href: `/profile/${userData?.user_id}`, text: "myProfile" },
    { href: `/assignments`, text: "assignments" },
    { href: `/edit-profile`, text: "editProfile" },
    { href: `/my-applies`, text: "myApplies" },
    { href: `/created-by-me`, text: "createdbyme" },
    { href: `/create-assignment`, text: "createAssignment" },
  ];

  const renderedLinks = links.map((link, index) => (
    <Link key={index} href={link.href} onClick={() => hideBurger()}>
      <li className={s.listItem}>{t(link.text)}</li>
    </Link>
  ));

  const loacaleList = locale.map((e) => (
    <li key={e.lang} className={s.listItem} onClick={() => switchLang(e.value)}>
      {e.lang}
    </li>
  ));

  const logOutHandler = () => {
    dispatch(setIsLogged({ isLogged: false }));
    router.push("/sign-in");
  };

  const switchLang = (lang: string) => {
    setShowLanguage(!showLanguage);
    router.replace(`${pathname}`, { locale: lang });
  };

  return (
    <div className={s.burgerWrapper}>
      <div className={s.burgerContainer}>
        <ul className={s.list}>
          {userData?.full_name && <li style={{textAlign:"center"}}>{userData.full_name}</li>}
          {renderedLinks}
          <li
            className={s.listItem}
            onClick={() => setShowLanguage(!showLanguage)}
          >
            {t("changeLanguage")}
          </li>
          {isLogged ? (
            <li className={s.listItem} onClick={logOutHandler}>
              {t("logOut")}
            </li>
          ) : (
            <Link
              key={"/sign-in"}
              onClick={() => hideBurger()}
              href={"/sign-in"}
            >
              <li className={s.listItem}>{t("signIn")}</li>
            </Link>
          )}
        </ul>
        {showLanguage && <ul className={s.languagelist}>{loacaleList}</ul>}
      </div>
    </div>
  );
};

type Props = {
  userData: UserState;
  hideBurger: () => void;
  isLogged: boolean;
};
