import {
  convertLanguageToSelect,
  convertProficiencyToSelect,
} from "@/helpers/convertDataToSelect";
import { languageMapping, proficiencyMapping } from "@/helpers/mappingData";

import s from "./index.module.scss";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddMeLangsSchema } from "../../../../helpers/formScheme/AddMeLangsSchema";
import { FormSelectController, TheButton } from "@/components";

export const AddMeLangs = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<AddMeLangsForm>({
    resolver: yupResolver(AddMeLangsSchema()),
    mode: "onTouched",
  });

  const languagesOptions = convertLanguageToSelect(languageMapping);
  const proficiencyOptions = convertProficiencyToSelect(proficiencyMapping);

  const onSubmit: SubmitHandler<any> = (formData: AddMeLangsForm) => {
    console.log(formData);
  };

  return (
    <div className={s.mainWrapper}>
      <form className={s.formEl} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.languages}>
          <FormSelectController
            control={control}
            name={"languages"}
            options={languagesOptions}
            placeholder="select language(s) what you speak (on your language)"
            error={errors.languages as FieldError | undefined}
            errorMessage={errors?.languages?.message}
          />

          <FormSelectController
            control={control}
            name={"proficiency"}
            options={proficiencyOptions}
            placeholder="select  what you wont (on your language)"
            error={errors.proficiency as FieldError | undefined}
            errorMessage={errors?.proficiency?.message}
          />
        </div>

        <div className={s.btnWrapper}>
          <TheButton
            btnText="Create"
            color="green"
            type="submit"
            // isLoading={requestPending || isSuccess}
          />
        </div>
      </form>
    </div>
  );
};

type AddMeLangsForm = {
  languages: number;
  proficiency: number;
};
