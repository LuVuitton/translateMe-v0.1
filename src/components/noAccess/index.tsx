import { IconLock } from "../svgs";
import s from "./index.module.scss";

const NoAccess = ({ text, children }: Props) => {
  return (
    <div className={s.noAccess}>
      <IconLock className={s.noAccessIcon} />
      <div className={s.noAccessText}> {text}</div>
      {children}
    </div>
  );
};

export default NoAccess;

type Props = {
  text: string;
  children?: React.ReactNode;
};
