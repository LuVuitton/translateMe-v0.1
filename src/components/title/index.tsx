import cl from "classnames";

import s from "./index.module.scss";

const Title = ({ className, children, type, cut }: Props) => {
  const cutClass = cut ? s.titleCut : ""; // Соответствующий класс для количества строк

  if (type === "small") {
    return (
      <h3 className={cl(className, s.title, s.titleSmall, cutClass)}>
        {children}
      </h3>
    );
  }
  return (
    <h2 className={cl(className, s.title, s.titleMedium, cutClass)}>
      {children}
    </h2>
  );
};


export default Title;

type Props = {
  className?: string;
  children: React.ReactNode;
  type: "medium" | "small";
  cut?: boolean;
};
