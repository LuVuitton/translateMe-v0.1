"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Burger } from "./burger";
import s from "./index.module.scss";
import { useGetMeQuery } from "@/app/api/clientRequests/user/user.api";
import { setIsLogged, setUserData } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Link } from "@/navigation";
import { BtnBack, Preloader } from "@/components";
import BtnBurger from "@/components/btnBurger";
import useResize from "@/hooks/useResize";

const Header = () => {
  const t = useTranslations("header");
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const userData = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetMeQuery();
  const size = useResize();

  useEffect(() => {
    if (data) {
      const { email, user_id, user_registration_date, full_name } = data;
      dispatch(
        setUserData({ email, user_id, user_registration_date, full_name })
      );
      dispatch(setIsLogged({ isLogged: true }));
    }
  }, [data, dispatch]);

  const logOutHandler = () => {
    dispatch(setIsLogged({ isLogged: false }));
  };

  const linksCommon: LinkItem[] = [
    { href: "/assignments", text: "assignments" },
  ];
  const linksAuth: LinkItem[] = [
    { href: `/create-assignment`, text: "createAssignment" },
    { href: `/created-by-me`, text: "createdbyme" },
    { href: `/profile/${userData.data?.user_id}`, text: "myProfile" },
    { href: `/edit-profile`, text: "editProfile" },
    { href: `/my-applies`, text: "myApplies" },
  ];

  let links = [...linksCommon];

  if (userData.data) {
    links = [...linksCommon, ...linksAuth];
  }

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
    <div className={s.mainWrapper}>
      <BtnBack />

      {size < 800 ? (
        <>
          <BtnBurger
            callback={() => setBurgerIsOpen(!burgerIsOpen)}
            isOpen={burgerIsOpen}
          />
          {burgerIsOpen && (
            <Burger
              userData={userData.data}
              hideBurger={() => setBurgerIsOpen(false)}
              isLogged={userData.isLogged}
              links={links}
            />
          )}
        </>
      ) : (
        <>
          {mappedBtns}
          {!userData.data ? (
            <Link
              key={"userData.data"}
              href={"/sign-in"}
              className={s.btnWrapper}
            >
              <div className={s.btnTitle}>{t("signIn")}</div>
            </Link>
          ) : (
            <div className={s.btnWrapper} onClick={logOutHandler}>
              {t("logOut")}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Header;

export type LinkItem = { href: string; text: string };
