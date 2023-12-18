import { IconNoSmile } from "../svgs";
import s from "./index.module.scss";

const NoContent = ({ text, children }: Props) => {
  return (
    <div className={s.noAssignmnents}>
      <IconNoSmile className={s.noAssignmnentsIcon} />
      <div className={s.noAssignmnentsText}> {text}</div>
      {children}
    </div>
  );
};

export default NoContent;

type Props = {
  text: string;
  children?: React.ReactNode;
};
