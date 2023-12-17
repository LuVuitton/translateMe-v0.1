"use client";
import s from "./index.module.scss";
import {Preloader} from "@/components";



const TheButton: React.FC<Props> = ({
  callback,
  btnText,
  color = "green",
  isLoading,
  type = "button",
}) => {
  let btnColor: string = "";
  switch (color) {
    case "red":
      btnColor = s.redBtn;
      break;
    case "green":
      btnColor = s.greenBtn;
      break;
    default:
      break;
  }

  return (
    <button
      className={`${s.btnWrapper} ${btnColor ? btnColor : ""}`}
      type={type}
      onClick={callback}
      disabled={isLoading} //
    >
      <span className={s.btnText}>
        {isLoading ? <Preloader show type="local" /> : btnText}
      </span>
    </button>
  );
};

export default TheButton;

type Props = {
  btnText: string;
  callback?: () => void;
  color?: "red" | "green";
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
};
