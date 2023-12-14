import { formatIsoDateToDMHM, minToHours } from "@/helpers/dateConverter";
import { getTranslations } from "next-intl/server";
import s from "./index.module.scss";
import { FiMapPin } from "react-icons/fi";
import { MdDateRange, MdAccessTime } from "react-icons/md";

import { TbPigMoney } from "react-icons/tb";

const Parameters = async ({ parameters }: Props) => {
  const t = await getTranslations("assignmnentPage");
  const tCommon = await getTranslations("common");

  const {
    address,
    assignment_date,
    city_id,
    country_id,
    execution_time_minutes,
    worth,
  } = parameters;
  const assignmentDate = formatIsoDateToDMHM(assignment_date);
  const executionTime = minToHours(execution_time_minutes);

  const elements = [
    {
      id: 1,
      icon: <FiMapPin />,
      title: t("where"),
      content: [
        tCommon(`cities.${city_id}`),
        tCommon(`countries.${country_id}`),
        address,
      ],
    },
    {
      id: 2,
      icon: <MdDateRange />,
      title: t("when"),
      content: [assignmentDate],
    },
    {
      id: 3,
      icon: <MdAccessTime />,
      title: t("executionTime"),
      content: [executionTime],
    },
    {
      id: 4,
      icon: <TbPigMoney />,
      title: "worth",
      content: [worth],
    },
  ];

  const paramsElements = elements.map((e) => (
    <div className={s.paramItem} key={e.id}>
      <span className={s.paramItemIcon}>{e.icon}</span>
      <span className={s.paramItemTitle}>{e.title}:</span>
      <span className={s.paramItemContent}>
        {e.content.map((contentEl) => (
          <span key={e.title} className={s.paramItemContentEl}>{contentEl}</span>
        ))}
      </span>
    </div>
  ));

  return (
    <div className={s.param}>
      {paramsElements}
    </div>
  );
};

export default Parameters;

type Props = {
  parameters: {
    address: string;
    assignment_date: string;
    city_id: number;
    country_id: number;
    execution_time_minutes: number;
    worth: number;
  };
};
