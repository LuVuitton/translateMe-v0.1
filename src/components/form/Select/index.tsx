"use client";
import React from "react";
import Select, { components, IndicatorsContainerProps } from "react-select";
import s from "./index.module.scss";
import { useId } from "react";
import { InputError } from "@/components";
import { FieldError } from "react-hook-form";
import { SelectOptions } from "@/helpers/convertDataToSelect";

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
  const onChangeHandler = (e:any) => {
  // const onChangeHandler = (e: number | number[]) => {
    let selectedValues: number | number[];

    if (Array.isArray(e)) {
      selectedValues = e.map((option) => option.value);
    } else {
      selectedValues = e.value;
    }

    onChange(selectedValues);
    console.log("hello");
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
        // styles={{
        //   option: (base) => ({
        //     ...base,
        //     // color: "#17161b",
        //   }),
        //   control: (base, state) => ({
        //     ...base,
        //     // border: "2px solid white",
        //     // ":hover": {
        //       // border: "2px solid #47a085",
        //     // },
        //     // padding: "none",
        //     // boxShadow: "none",
        //     // borderRadius: "none",
        //     // ...(state.isFocused && { border: "2px solid #47a085" }),
        //   }),
        //   valueContainer: (base) => ({
        //     ...base,
        //     // color: "#94292b",
        //   }),
        //   indicatorSeparator: () => ({}),
        //   multiValueLabel: (base) => ({
        //     ...base,
        //     // color: "#17161b",
        //     // padding: "5px",
        //   }),
        //   placeholder: (base) => ({
        //     ...base,
        //     // fontSize: "13px",
        //     // fontWeight: "400",
        //     // color: "#6c6d6c",
        //   }),
        // }}
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
