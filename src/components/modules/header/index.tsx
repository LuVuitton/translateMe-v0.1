"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Image from "next/image";
import usersImg from "../../../../public/icons/users.png";
import settingImg from "../../../../public/icons/setting.png";

import { Burger } from "./burger";
import s from "./index.module.scss";
import { useGetMeQuery } from "@/app/api/clientRequests/user/user.api";
import { setIsLogged, setUserData } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Link, usePathname, useRouter } from "@/navigation";
import { Preloader } from "@/components";

const Header = ({ currentLanguage }: { currentLanguage: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("header");
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const userData = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetMeQuery();

  useEffect(() => {
    if (data) {
      const { email, user_id, user_registration_date, full_name } = data;
      dispatch(
        setUserData({ email, user_id, user_registration_date, full_name })
      );
      dispatch(setIsLogged({ isLogged: true }));
    }
  }, [data, dispatch]);

  const switchLang = (lang: any) => {
    router.replace(`${pathname}`, { locale: lang });
  };

  if (isLoading) {
    return (
      <div className={s.mainWrapper}>
        <Preloader show type="local" />
      </div>
    );
  }

  if (userData.isLogged) {
    return (
      <div>
        <div className={s.mainWrapper}>
          <div
            className={s.btnWrapper}
            onClick={() => setBurgerIsOpen(!burgerIsOpen)}
          >
            <Image src={settingImg} alt="settings" />
            <div className={s.btnTitle}>{t("btns.settings")}</div>
          </div>

          <Link className={s.btnWrapper} href={"/assignments"}>
            <Image src={usersImg} alt="users" />
            <div className={s.btnTitle}>{t("btns.assignments")}</div>
          </Link>
        </div>
        {burgerIsOpen && (
          <Burger
            userData={userData.data}
            hideBurger={() => setBurgerIsOpen(false)}
          />
        )}
      </div>
    );
  }
  return (
    <div className={s.mainWrapper}>
      <div>
        <Link href={"/sign-in"}>{"t(toSignIn)"}</Link>
      </div>
      <div>
        <p>UNAUTORIZED</p>
      </div>
      <div>
        <select
          onChange={(e) => switchLang(e.target.value)}
          value={currentLanguage}
          className={s.select}
        >
          <option value="en">English</option>
          {/* <option value="es">Español</option> */}
          {/* <option value="ua">Українська</option> */}
          {/* <option value="it">Italian</option> */}
          <option value="ru">Русский</option>
          {/* <option value="de">Deutsch</option> */}
        </select>
      </div>
    </div>
  );
};


export default Header