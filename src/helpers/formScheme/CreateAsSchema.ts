import { useTranslations } from "next-intl";
import * as yup from "yup";

export const CreateAsSchema = () => {
  const t = useTranslations("auth.auth-errors");


  return yup.object({
    assignment_title: yup.string().min(5).max(100).required(),
    assignment_description: yup.string().min(10).max(1000).required(),
    address: yup.string().min(5).max(100).required(),
    country_id: yup.number().required(),
    city_id: yup.number().required(),
    required_languages_id:  yup.array(yup.number().required()).required(),
    customer_languages_id: yup.array(yup.number().required()).required(),
    worth: yup.number().min(1).max(10000).required(),
    execution_time_minutes: yup.number().min(10, "время должно быть хотя бы 10").required(),
    assignment_date: yup.string().required("указать дату и время когда вообще все будет то"),  

  });
};