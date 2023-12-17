"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Burger } from "./burger";
import s from "./index.module.scss";
import { useGetMeQuery } from "@/app/api/clientRequests/user/user.api";
import { setIsLogged, setUserData } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Link, usePathname, useRouter } from "@/navigation";
import { Preloader } from "@/components";
import { IconPigMoney, IconSetting } from "@/components/svgs";

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

  return (
    <div>
      <div className={s.mainWrapper}>
        <div
          className={s.btnWrapper}
          onClick={() => setBurgerIsOpen(!burgerIsOpen)}
        >
          <IconSetting />
          <div className={s.btnTitle}>{t("btns.settings")}</div>
        </div>

        <Link className={s.btnWrapper} href={"/assignments"}>
          <IconPigMoney />
          <div className={s.btnTitle}>{t("btns.assignments")}</div>
        </Link>
      </div>
      {burgerIsOpen && (
        <Burger
          userData={userData.data}
          hideBurger={() => setBurgerIsOpen(false)}
          isLogged={userData.isLogged}
        />
      )}
    </div>
  );
};

export default Header;
