"use client"
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
} from "react-hook-form";
import s from "./index.module.scss";
import {TheInputNumber} from "@/components";

const FormNumberController: React.FC<WithNumberControllerProps> = ({
  control,
  name,
  description,
  register,
  error,
  errorMessage,
  interval,
}) => {
  return (
    <div className={s.mainWrapper}>
      <div className={s.description}>{description}</div>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TheInputNumber
            interval={interval}
            register={register}
            registerName={name}
            onChange={(num: number) => field.onChange(num)}
            error={error}
            errorMessage={errorMessage}
          />
        )}
      />
    </div>
  );
};

export default FormNumberController;

type WithNumberControllerProps = {
  control: Control<any, any>;
  name: string;
  description: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  interval: number;
};
