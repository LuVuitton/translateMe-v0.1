// import { Controller, UseFormRegister, Control } from "react-hook-form";
// import React from "react";

// type WithFormControllerProps<T> = {
//   Сomponent: React.ComponentType<T>;
//   register: UseFormRegister<any>;
//   registerName: string;
//   control: Control<any>;
// } & T;

// export const WithFormController = <T extends Record<string, any>>({
//   Component: Component,
//   register,
//   registerName,
//   control,
//   ...props
// }: WithFormControllerProps<T>) => {


//   return (
//     <Controller
//       control={control}
//       name={registerName}
//       render={({ field }) => <Component {...field} {...props} />}
//     />
//   );
// };
