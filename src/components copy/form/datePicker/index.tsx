"use client";

import { Control, Controller, FieldError, useForm } from "react-hook-form";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import s from "./index.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormRegister } from "react-hook-form";
import { InputError } from "@/components";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const TheDataPicker = ({
  registerName,
  control,
  error,
  errorMessage,
  description,
}: Props) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={s.mainWrapper}>
      <div className={s.desriptiom}>{description} </div>
      <div className={s.dateWrapper}>
        <Controller
          control={control}
          name={registerName}
          render={({ field }) => (
            <>
              <DatePicker
                selected={field.value ? field.value : startDate}
                onChange={(date) => {
                  field.onChange(date);
                }}
                showTimeSelect
                dateFormat="MMMM d, hh:mm"
                timeFormat="HH:mm"
                calendarClassName={s.dateCalendar}
              />
            </>
          )}
        />
        <div className={s.errorWrapper}>
          <InputError
            error={error}
            errorMessage={errorMessage}
            className={s.errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default TheDataPicker;

type Props = {
  register: UseFormRegister<any>;
  registerName: string;
  control: Control<any>;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  description: string;
};
