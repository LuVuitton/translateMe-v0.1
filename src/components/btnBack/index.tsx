import { useRouter } from "@/navigation";
import { IconLeft } from "../svgs";
import s from "./index.module.scss";
import cl from "classnames";

const BtnBack = ({ className }: { className?: string }) => {
  const router = useRouter();
  const toBackHandler = () => {
    router.back();
  };

  return <IconLeft className={cl(s.icon, className)} onClick={toBackHandler} />;
};

export default BtnBack;
