import { useTranslations } from "next-intl";
import s from "./index.module.scss";
import { IconLeft, IconUp } from "../svgs";

const ChooseOne = ({ text, direction, iconClassName }: Props) => {
  const t = useTranslations("createdByMe");
  const icon =
    direction === "up" ? (
      <IconUp className={`${s.chooseIconUp} ${iconClassName}`} />
    ) : (
      <IconLeft className={`${s.chooseIconLeft} ${iconClassName}`} />
    );

  return (
    <div className={s.choose}>
      <span className={s.chooseIcon}>{icon}</span>
      <span className={s.chooseText}>{text}</span>
    </div>
  );
};

export default ChooseOne;

type Props = {
  text: string;
  direction: "up" | "left";
  iconClassName?: string;
};
