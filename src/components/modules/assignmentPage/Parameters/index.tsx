import { formatIsoDateToDMHM, minToHours } from "@/helpers/dateConverter";
import { getTranslations } from "next-intl/server";
import s from "./index.module.scss";
import {
  IconDate,
  IconLocation,
  IconPigMoney,
  IconTime,
} from "@/components/svgs";

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

  const elements: Elements = [
    {
      id: 1,
      icon: <IconLocation />,
      title: t("where"),
      content: [
        { id: 10, text: tCommon(`cities.${city_id}`) },
        { id: 11, text: tCommon(`countries.${country_id}`) },
        { id: 12, text: address },
      ],
    },
    {
      id: 2,
      icon: <IconDate style={{ fontSize: "1.2rem" }} />,
      title: t("when"),
      content: [{ id: 13, text: assignmentDate }],
    },
    {
      id: 3,
      icon: <IconTime />,
      title: t("executionTime"),
      content: [{ id: 14, text: executionTime }],
    },
    {
      id: 4,
      icon: <IconPigMoney />,
      title: "worth",
      content: [{ id: 15, text: `${worth} $` }],
    },
  ];

  const paramsElements = elements.map((e) => (
    <div className={s.paramItem} key={e.id}>
      <span className={s.paramItemIcon}>{e.icon}</span>
      <span className={s.paramItemTitle}>{e.title}:</span>
      <span className={s.paramItemContent}>
        {e.content.map((contentEl) => (
          <span key={contentEl.id} className={s.paramItemContentEl}>
            {contentEl.text}
          </span>
        ))}
      </span>
    </div>
  ));

  return <div className={s.param}>{paramsElements}</div>;
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

type Elements = {
  id: number;
  icon: React.ReactNode;
  title: string;
  content: any[];
}[];
