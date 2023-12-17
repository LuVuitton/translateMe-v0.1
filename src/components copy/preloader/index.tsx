import s from "./index.module.scss";

const Preloader = ({ show = true, type }: Props) => {
  return (
    <>
      {show && (
        <div className={type === "blocking" ? s.blockWrapper : s.localWrapper}>
          <div className={s.container}>
            <div className={s.loader}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Preloader;

type Props = {
  show?: boolean;
  type: "local" | "blocking";
};
