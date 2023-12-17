import s from "./index.module.scss";

const Section = ({ className, children }: Props) => {
  return <section className={`${className} ${s.section}`}>{children}</section>;
};

export default Section;

type Props = {
  className?: string;
  children: React.ReactNode;
};
 