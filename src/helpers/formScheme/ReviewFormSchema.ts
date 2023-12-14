import { useTranslations } from "next-intl";
import * as yup from "yup";

export const RewiewFormSchema = () => {
  const t = useTranslations("auth.auth-errors");


  return yup.object({
    review: yup.string().min(3).max(1000).required(),

  });
};