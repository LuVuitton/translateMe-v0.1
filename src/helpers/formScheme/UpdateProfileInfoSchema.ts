import { useTranslations } from "next-intl";
import * as yup from "yup";

export const UpdateProfileInfoSchema = () => {
  const t = useTranslations("auth.auth-errors");


  return yup.object({
    about_me: yup.string().min(5).max(1000),
    country_id: yup.number(),
    city_id: yup.number(),
  });
};

