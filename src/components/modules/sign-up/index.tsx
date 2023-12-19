"use client";
import React, { useEffect } from "react";
import s from "./index.module.scss";
import {
  useForm,
  SubmitHandler,
  FieldError,
  FieldErrors,
} from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";

import { SocialAuthBtn } from "@/components/modules/sign-up/socialAuthBtn";
import { AgreementsCheckbox } from "@/components/modules/sign-up/agreementsCheckbox";
import { useRegistrationMutation } from "@/app/api/clientRequests/auth/auth.api";
import { setIsLogged, setUserData } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import { Link, useRouter } from "@/navigation";
import { toast } from "react-hot-toast";
import { SignUpFormSchema } from "@/helpers/formScheme/SignUpFormSchema";
import { FormInput, TheButton, Title } from "@/components";

const fields = [
  { type: "text", fieldName: "full_name" },
  { type: "email", fieldName: "email" },
  { type: "password", fieldName: "password" },
  { type: "password", fieldName: "passwordConfirm" },
];

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: yupResolver(SignUpFormSchema()),
    mode: "onTouched",
  });
  const dispatch = useAppDispatch();
  const t = useTranslations("auth");

  const [toSignUp, registrationData] = useRegistrationMutation();
  const isLogged = useAppSelector((state) => state.user.isLogged);

  useEffect(() => {
    if (isLogged) {
      router.push("/");
    }
  }, [isLogged, router]);

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const { agreements, passwordConfirm, ...registrationDto } = formData;
    toSignUp(registrationDto);
  };

  if (registrationData.data) {
    const { token, ...userData } = registrationData.data;
    dispatch(setUserData(userData));
    dispatch(setIsLogged({ isLogged: true, token: token }));
  }

  if (registrationData.error && "data" in registrationData.error) {
    // понять шо с этим делать
    // toast.error(registrationData.error.data.message);
  }

  const mappedFormFields = fields.map((e, i) => {
    const fieldName = e.fieldName as keyof FieldErrors<Inputs>;
    const errorValue = errors && errors[fieldName];

    return (
      <FormInput
        key={i}
        type={e.type}
        register={register}
        registerName={e.fieldName}
        placeholder={t(`fields-name.${e.fieldName}`)}
        error={errorValue as FieldError}
        errorMessage={errorValue?.message}
      />
    );
  });

  return (
    <div className={s.mainWrapper}>
      <div className={s.container}>
        <div className={s.titleAndDescription}>
          <Title type="medium">{t("common.regestration-title")}</Title>
          <p>{t("common.registration-description")}</p>
        </div>
        <form className={s.formEl} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputsWrapper}>
            {mappedFormFields}

            <AgreementsCheckbox
              register={register}
              registerName={"agreements"}
              error={errors.agreements}
              errorMessage={errors?.agreements?.message}
            />

            <div className={s.btnWrapper}>
              <div className={s.btnWrapperBtn}>
                <TheButton type="submit" btnText={t("common.sign-up-btn")} />
              </div>
            </div>
          </div>
        </form>

        <p className={s.or}>{t("social-auth.or")}</p>

        <div className={s.socialsBtns}>
          <SocialAuthBtn socailNetworkName={"Google"} btnPurpose={"sign-up"} />
        </div>

        <Link href={"/sign-in"} className={s.alreadyHaveAccoutn}>
          {t("common.already-have-account")}
        </Link>
      </div>
    </div>
  );
}

type Inputs = {
  email: string;
  full_name: string;
  password: string;
  passwordConfirm: string;
  agreements: boolean;
};
