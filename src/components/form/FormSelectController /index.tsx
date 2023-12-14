"use client"
import { Control, Controller, FieldError } from "react-hook-form";
import s from "./index.module.scss";
import TheSelect from "../Select";
import { SelectOptions } from "@/helpers/convertDataToSelect";

const FormSelectController: React.FC<WithSelectControllerProps> = ({
  control,
  name,
  description,
  error,
  errorMessage,
  options,
  placeholder,
  isMulti,
}) => {
  return (
    <div className={s.mainWrapper}>
      {description && <div className={s.description}>{description}</div>}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TheSelect
            name={name}
            onChange={(data:number) => field.onChange(data)}
            noOptionsMessage="there is mo more (on your language)"
            options={options}
            placeholder={placeholder}
            error={error}
            errorMessage={errorMessage}
            isMulti={isMulti}
          />
        )}
      />
    </div>
  );
};


export default FormSelectController

type WithSelectControllerProps = {
  control: Control<any, any>;
  name: string;
  description?: string;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  options: SelectOptions;
  placeholder: string;
  isMulti?: true;
};
