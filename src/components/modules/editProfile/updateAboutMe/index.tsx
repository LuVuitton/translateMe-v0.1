"use client";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import s from "./index.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";

import {
  UpdateUserDto,
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/app/api/clientRequests/user/user.api";
import { UpdateProfileInfoSchema } from "../../../../helpers/formScheme/UpdateProfileInfoSchema";

import { useRouter } from "@/navigation";
import { FormInput, Section, TheButton, Title } from "@/components";

export const UpdateAboutMe = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<UpdateUserDto>({
    resolver: yupResolver(UpdateProfileInfoSchema()),
    mode: "onTouched",
    defaultValues: {
      // about_me: data?.about_me ? data?.about_me : "",
      about_me: 'data?.about_me ? data?.about_me : ""',
    },
  });
  const router = useRouter();
  const t = useTranslations("editProfile");
  const [
    update,
    { isLoading: requestPending, isSuccess, isError, data: responseData },
  ] = useUpdateUserMutation();
  const { data, isLoading } = useGetMeQuery();

  const onSubmit: SubmitHandler<any> = (formData: UpdateUserDto) => {
    console.log(formData);
    console.log("SUUUUUUBMIT");

    update(formData)
      .unwrap()
      .then((r) => {
        router.push(`/profile/${r.user.user_id}`);
      });
  };

  return (
    <Section>
      <div className={s.about}>
        <div className={s.aboutHead}>
          <Title type="medium">{t('updateAboutMe')}</Title>
          <p className={s.aboutHeadDescription}>
            {t("updateAboutMeDecs")}
          </p>
        </div>
        <form className={s.aboutForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.aboutFormInput}>
            <FormInput
              isTextarea
              rows={5}
              register={register}
              registerName={"about_me"}
              placeholder={"t(fields-name.description)"}
              error={errors.about_me}
              errorMessage={errors?.about_me?.message}
            />
          </div>

          <div className={s.aboutFormBtn}>
            <TheButton
              btnText="save"
              color="green"
              type="submit"
              isLoading={requestPending || isSuccess}
            />
          </div>
        </form>
      </div>
    </Section>
  );
};
