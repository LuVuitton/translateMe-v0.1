"use client";
import React from "react";
import Select, { components, IndicatorsContainerProps } from "react-select";
import s from "./index.module.scss";
import { useId } from "react";
import { InputError } from "@/components";
import { FieldError } from "react-hook-form";
import { SelectOptions } from "@/helpers/convertDataToSelect";
import scssVars from "../../../style/variables.module.scss";

const IndicatorsContainer = (
  props: IndicatorsContainerProps<{ label: string; value: number }, true>
) => {
  return (
    <div className={s.backgroundColor}>
      <components.IndicatorsContainer {...props} />
    </div>
  );
};

export default function TheSelect({
  // onSelectChange,
  placeholder,
  options,
  noOptionsMessage,
  isMulti,
  onChange,
  name,
  error,
  errorMessage,
}: any) {
  const onChangeHandler = (e: any) => {
    // const onChangeHandler = (e: number | number[]) => {
    let selectedValues: number | number[];

    if (Array.isArray(e)) {
      selectedValues = e.map((option) => option.value);
    } else {
      selectedValues = e.value;
    }
  };

  return (
    <div className={s.mainWrapper}>
      <Select
        name={name}
        instanceId={useId()}
        placeholder={placeholder}
        onChange={onChangeHandler}
        components={{ IndicatorsContainer }}
        noOptionsMessage={() => noOptionsMessage}
        isMulti={isMulti}
        options={options}
        styles={{
          // @ts-ignore
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: `2px solid ${
              state.isFocused ? scssVars.green : scssVars.line
            }`,
            borderRadius: "10px",
            ":hover": {
              border: `2px solid ${
                state.isFocused ? scssVars.green : scssVars.line
              }`,
            },
            boxShadow: `none`,
            color: `${scssVars.greyText}`
          }),
          // @ts-ignore
          option: (baseStyles, state) => ({
            ...baseStyles,
            ":hover": { backgroundColor: scssVars.line },
            backgroundColor: state.isSelected && scssVars.line
          }),
        }}
      />
      <InputError
        error={error}
        errorMessage={errorMessage}
        className={s.errorMessage}
      />
    </div>
  );
}

type Props = {
  placeholder: string;
  options: SelectOptions;
  noOptionsMessage: string;
  isMulti?: true;
  onChange: (data: number | number[]) => void;
  name: string;
  error: FieldError | undefined;
  errorMessage: string | undefined;
};
