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
import { citiesMapping, countriesMapping } from "@/helpers/mappingData";
import { citiesOptions, countriesOptions } from "@/helpers/convertDataToSelect";
import { UpdateProfileInfoSchema } from "../../../../helpers/formScheme/UpdateProfileInfoSchema";

import { useRouter } from "@/navigation";
import { FormInput, FormSelectController, TheButton } from "@/components";

export const UpdateProfileInfo = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<UpdateUserDto>({
    resolver: yupResolver(UpdateProfileInfoSchema()),
    mode: "onTouched",
    // defaultValues: {
    //   about_me: data?.about_me ? data?.about_me : "",
    // },
  });
  const router = useRouter();
  const t = useTranslations("auth");
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
    <div className={s.mainWrapper}>
      <div className={s.container}>
        <div className={s.titleAndDescription}>
          <h1>Edit my profile</h1>
          <p>Fill out the form to edit your data</p>
        </div>
        <form className={s.formEl} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputsWrapper}>
            <div className={s.description}>
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

            <div className={s.location}>
              <FormSelectController
                control={control}
                name={"country_id"}
                options={countriesOptions}
                placeholder={
                  data?.country_id
                    ? countriesMapping[data?.country_id].countryName
                    : "country"
                }
                error={errors.country_id as FieldError | undefined}
                errorMessage={errors?.country_id?.message}
              />
              <FormSelectController
                control={control}
                name={"city_id"}
                options={citiesOptions}
                placeholder={
                  data?.city_id ? citiesMapping[data?.city_id] : "city"
                }
                error={errors.city_id as FieldError | undefined}
                errorMessage={errors?.city_id?.message}
              />
            </div>

            <div className={s.btnWrapper}>
              <TheButton
                btnText="apply changes"
                color="green"
                type="submit"
                isLoading={requestPending || isSuccess}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
