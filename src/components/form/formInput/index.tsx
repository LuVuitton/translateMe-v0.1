import { FieldError, UseFormRegister } from "react-hook-form";
import s from "./index.module.scss";
import { HTMLInputTypeAttribute } from "react";
import {InputError} from "@/components";

const FormInput: React.FC<Props> = ({
  register,
  registerName,
  placeholder,
  error,
  errorMessage,
  type,
  isTextarea=false,
  rows  
}) => {

  const InputComponent = isTextarea ? "textarea" : "input"; // Определение, какой элемент использовать




  return (
    <div className={s.mainWrapper}>
      <div className={s.mainContainer}>
        <InputComponent
          type={type}
          {...register(registerName)}
          placeholder={placeholder}
          className={`${s.customInput}  ${error ? s.redBorder : ""}`}
          rows={rows} 

        />
        <InputError
          error={error}
          errorMessage={errorMessage}
          className={s.errorMessage}

        />
      </div>
    </div>
  );
};

export default FormInput

type Props = {
  register: UseFormRegister<any>;
  registerName: string;
  placeholder: string;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  type?: HTMLInputTypeAttribute;
  isTextarea?: boolean; // Новый проп для указания, является ли элемент textarea
  rows?: number;  
};
