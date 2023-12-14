import { useTranslations } from "next-intl";
import * as yup from "yup";

export const SignUpFormSchema = () => {
  const t = useTranslations("auth.auth-errors");

  const passwordCompletly = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/;
  const emailValidationRegex = /^[^|$%&/=?^*+!#~'{}]+$/;
  const firsLastCharEmail = /^[^|$%&/=?^*+@!#~'.{}—-]+$/;
  const emailDomainRegex = /^[A-Za-z0-9-]+$/;
  const emailSubdomainRegex = /^[A-Za-z0-9]+$/;

  const emailValidation = yup
    .string()
    .required(t("common.required"))
    .matches(emailValidationRegex, t("email.invalid-characters"))
    .test("valid-domain", t("email.invalid-characters"), (value) => {
      const parts = value.split("@");
      if (parts.length === 2) {
        const [local, fullDomain] = parts;
        const domainParts = fullDomain.split(".");
        if (domainParts.length >= 2) {
          const subdomain = domainParts
            .slice(0, domainParts.length - 1)
            .join(".");
          return (
            emailDomainRegex.test(subdomain) &&
            emailDomainRegex.test(domainParts[domainParts.length - 1]) &&
            fullDomain.includes(".") &&
            !local.includes("..") &&
            !fullDomain.includes("..") &&
            subdomain.trim() !== "" &&
            emailSubdomainRegex.test(subdomain) &&
            !value.includes(",") // Добавляем проверку на запятые
          );
        }
      }
      return false;
    })
    .test("firstLastSpec", t("email.invalid-characters"), (value) => {
      const lastChar = value.indexOf("@");
      return (
        firsLastCharEmail.test(value[lastChar - 1]) &&
        firsLastCharEmail.test(value[0])
      );
    })
    .test("not-spaces", t("email.spaces"), (value) => {
      return value.trim() !== "" && !/\s/.test(value);
    });

  const passwordValidation = yup
    .string()
    .required(t("common.required"))
    .test("not-spaces", t("password.spaces"), (value) => {
      return value.trim() !== "" && !/\s/.test(value);
    })
    .min(6, t("password.min"))
    .max(20, t("password.max"))
    .matches(passwordCompletly, `${t("password.complexity")} `);

  const passwordConfirmValidation = yup
    .string()
    .oneOf([yup.ref("password")], t("password-confirm.oneOf"))
    .required(t("common.required"));

  const full_nameValidation = yup
    .string()
    .required(t("common.required"))
    .min(3, t("full_name.min"))
    .max(40, t("full_name.max"));
  // .oneOf([yup.ref("full_name")], t("full_name.oneOf"))

  const agreementsValidation = yup
    .boolean()
    .oneOf([true], t("common.required"))
    .required(t("common.required"));

  return yup.object({
    email: emailValidation,
    full_name: full_nameValidation,
    password: passwordValidation,
    passwordConfirm: passwordConfirmValidation,
    agreements: agreementsValidation,
  });
};
