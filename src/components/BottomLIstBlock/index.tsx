import s from "./index.module.scss";

const BottomListBlock = ({ bottomText, children, color }: Props) => {
  return (
    <div className={s.bottomListBlock}>
      <div className={`${s.top} ${color === "green" ? s.green : ""}`}>
        {children}
      </div>

      <div className={s.bottom}>{bottomText}</div>
    </div>
  );
};

export default BottomListBlock;

type Props = {
  bottomText: string;
  children: React.ReactNode;
  color?: "green";
};
