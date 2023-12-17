"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Burger } from "./burger";
import s from "./index.module.scss";
import { useGetMeQuery } from "@/app/api/clientRequests/user/user.api";
import { setIsLogged, setUserData } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Link, usePathname, useRouter } from "@/navigation";
import { BtnBack, Preloader } from "@/components";
import BtnBurger from "@/components/btnBurger";

const Header = () => {
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

  const links = [
    { href: `/create-assignment`, text: "createAssignment" },
    { href: `/created-by-me`, text: "createdbyme" },
    { href: "/assignments", text: "assignments" },
    { href: `/profile/${userData.data?.user_id}`, text: "myProfile" },
    { href: `/edit-profile`, text: "editProfile" },
    { href: `/my-applies`, text: "myApplies" },
  ];

  const mappedBtns = links.map((e) => (
    <Link key={e.href} href={e.href} className={s.btnWrapper}>
      <div className={s.btnTitle}>{t(`${e.text}`)}</div>
    </Link>
  ));

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
        <BtnBack />
        {/* <div
          className={s.btnWrapper}
          onClick={() => setBurgerIsOpen(!burgerIsOpen)}
        >
          <div className={s.btnTitle}>{t("settings")}</div>
        </div> */}
        <BtnBurger callback={() => setBurgerIsOpen(!burgerIsOpen)} isOpen={burgerIsOpen}/>
        {mappedBtns}
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
