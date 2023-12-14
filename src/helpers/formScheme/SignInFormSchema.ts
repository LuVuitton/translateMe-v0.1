import { useTranslations } from "next-intl";
import * as yup from "yup";

export const SignInFormSchema = () => {
  const t = useTranslations("auth.auth-errors");

  // const emailValidationRegex = /^[^|$%&/=?^*+!#~'{}]+$/;

  const emailValidation = yup
    .string()
    .required(t("common.required"))
    // .matches(emailValidationRegex, t("email.invalid-characters"))
    .test("valid-domain", t("email.invalid-characters"), (value) => {
      const parts = value.split("@");
      if (parts.length === 2) {
        const [, domain] = parts;
        return domain.includes(".");
      }
      return false;
    })


  const passwordValidation = yup
    .string()
    .required(t("common.required"))
    .test("not-spaces", t("password.spaces"), (value) => {
      return value.trim() !== "" && !/\s/.test(value);
    })





  
  
  
  
  
    return yup.object({
    email: emailValidation,
    password: passwordValidation,
  });
};
