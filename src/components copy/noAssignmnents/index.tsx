import { Link } from "@/navigation";
import { IconNoSmile } from "../svgs";
import s from "./index.module.scss";

const NoAssignmnents = ({
  text,
  btnText,
}: {
  text: string;
  btnText: string;
}) => {
  return (
    <div className={s.noAssignmnents}>
      <IconNoSmile className={s.noAssignmnentsIcon} />
      <div className={s.noAssignmnentsText}> {text}</div>
      <Link href={"create-assignment"} className={s.noAssignmnentsLink}>
        {btnText}
      </Link>
    </div>
  );
};

export default NoAssignmnents;
