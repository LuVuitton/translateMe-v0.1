import { useTranslations } from "next-intl";
import * as yup from "yup";

export const UpdateContactsSchema = () => {
  const t = useTranslations("auth.auth-errors");

  return yup.object({
    whatsapp: yup.string(),
    telegram: yup.string(),
    viber: yup.string(),
    phone_number: yup.string(),
    instagram: yup.string(),
    other_contacts: yup.string(),
  });
};

// {
//     "instagram": "hello world",
//     "other_contacts": "hello world",
//     "phone_number": "hello world",
//     "telegram": "hello world",
//     "viber": "hello world",
//     "whatsapp": "hello world"
// }
