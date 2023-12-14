import { FieldError } from "react-hook-form";
import s from './index.module.scss'



 const InputError: React.FC<Props> = ({ errorMessage, error, className }) => {
  return (
    <>
      {error && (
        <p className={s.errorMessage}>
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default InputError

type Props = {
  error: FieldError | undefined;
  errorMessage: string | undefined;
  className?:string

};