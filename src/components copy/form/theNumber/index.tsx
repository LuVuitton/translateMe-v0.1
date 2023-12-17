"use client";


import { useState } from "react";
import s from "./index.module.scss";
import { FieldError, UseFormRegister } from "react-hook-form";
import { InputError, TheButton } from "@/components";


 const TheInputNumber = ({
  interval = 1,
  register,
  registerName,
  onChange,
  error,
  errorMessage,
}: TheInputNumberProps) => {
  const [count, setCount] = useState(0);

  const onKeyPress = (num: number) => {
    if (!/[0-9]/.test(num.toString())) {
      return;
    } else {
      setCount(+num);
      onChange(+num);
    }
  };

  return (
    <div className={s.mianWrapper}>
      <div className={s.btnWrapper}>
        <TheButton
          btnText="-"
          color="red"
          callback={() => onKeyPress(count - interval)}
        />
      </div>

      <div className={s.inputWrapper}>
        <input
          type="number"
          {...register(registerName)}
          name={registerName}
          value={Number(count).toString()}
          onChange={(e) => onKeyPress(+e.currentTarget.value)}
        />
      </div>

      <div className={s.btnWrapper}>
        <TheButton
          btnText="+"
          color="red"
          callback={() => onKeyPress(count + interval)}
        />
      </div>

      <InputError
        error={error}
        errorMessage={errorMessage}
        className={s.errorMessage}
      />
    </div>
  );
};

export default TheInputNumber

export type TheInputNumberProps = {
  interval?: number;
  register: UseFormRegister<any>;
  registerName: string;
  onChange: (num: number) => void;
  error: FieldError | undefined;
  errorMessage: string | undefined;
};
