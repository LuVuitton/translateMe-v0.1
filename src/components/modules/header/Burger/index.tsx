"use client";
import s from "./index.module.scss";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { UserState, setIsLogged } from "@/redux/slices/userSlice";
import { Link, usePathname, useRouter } from "@/navigation";
// import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export const Burger = ({ userData, hideBurger }: Props) => {
  const [showLanguage, setShowLanguage] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  // const t = getTranslations("header.settings");
  const t = useTranslations("header.settings");
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
    { href: `/edit-profile`, text: "editProfile" },
    { href: `/my-applies`, text: "myApplies" },
    { href: `/created-by-me`, text: "createdbyme" },
    { href: `/create-assignment`, text: "createAssignment" },
    { href: `/whywedothis`, text: "whywedothis" },
    { href: `/contacts`, text: "contacts" },
  ];

  const renderedLinks = links.map((link, index) => (
    <Link key={index} href={link.href} onClick={()=> hideBurger()}>
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
          {userData?.full_name && (
            <li className={s.listItem}>{userData.full_name}</li>
          )}

          {renderedLinks}
          {/* <Link href={`/profile/${userData?.user_id}`}>
            <li className={s.listItem}>{t("myProfile")}</li>
          </Link>
          <Link href={`/edit-profile`}>
            <li className={s.listItem}>{t("editProfile")}</li>
          </Link>
          <Link href={`/my-applies`}>
            <li className={s.listItem}>{t("myApplies")}</li>
          </Link>
          <Link href={`/created-by-me`}>
            <li className={s.listItem}>{t("createdbyme")}</li>
          </Link>
          <Link href={`/create-assignment`}>
            <li className={s.listItem}>{t("createAssignment")}</li>
          </Link>
          <Link href={`/whywedothis`}>
            <li className={s.listItem}>{t("whywedothis")}</li>
          </Link>
          <Link href={`/contacts`}>
            <li className={s.listItem}>{t("contacts")}</li>
          </Link> */}

          <li
            className={s.listItem}
            onClick={() => setShowLanguage(!showLanguage)}
          >
            {t("changeLanguage")}
          </li>

          <li className={s.listItem} onClick={logOutHandler}>
            {t("logOut")}
          </li>
        </ul>
        {showLanguage && <ul className={s.languagelist}>{loacaleList}</ul>}
      </div>
    </div>
  );
};


type Props = {
   userData: UserState ,
hideBurger: ()=> void
}