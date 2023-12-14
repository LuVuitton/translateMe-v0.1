import { useTranslations } from "next-intl";
import * as yup from "yup";

export const AddMeLangsSchema = () => {
  const t = useTranslations("auth.auth-errors");

  return yup.object({
    languages: yup.number().required(),
    // proficiency: yup.number().required(),
    proficiency: yup.number().oneOf([1, 2, 3]).required(),
  });
};
