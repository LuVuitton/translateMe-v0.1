import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import { useTranslations } from "next-intl";
import s from "./index.module.scss";
import cl from "classnames";
import {
  IconDate,
  IconLocation,
  IconPigMoney,
  IconTime,
} from "@/components/svgs";

const AssignmentInfo = ({
  assignment_date,
  worthCount,
  country_id,
  city_id,
  className,
}: Props) => {
  const asDay = formatIsoDateToDMHM(assignment_date, "DM");
  const asTime = formatIsoDateToDMHM(assignment_date, "HM");
  const tCommon = useTranslations("common");
  const country = tCommon(`countries.${country_id}`);
  const city = tCommon(`cities.${city_id}`);

  const infoData = [
    {
      id: country,
      text: `${country} ${city}`,
      icon: <IconLocation className={s.infoItemIconLocation} />,
    },
    {
      id: asDay,
      text: asDay,
      icon: <IconDate className={s.infoItemIconDate} />,
    },
    {
      id: asTime,
      text: asTime,
      icon: <IconTime className={s.infoItemIconTime} />,
    },
    {
      id: worthCount,
      text: `${worthCount} $`,
      icon: <IconPigMoney className={s.infoItemIconWorth} />,
    },
  ];

  const mapInfoData = infoData.map((e) => (
    <div key={e.id} className={s.infoItem}>
      <span className={s.infoItemIcon}>{e.icon}</span>
      <span className={s.infoItemText}> {e.text}</span>
    </div>
  ));

  return <div className={cl(s.info, className)}>{mapInfoData}</div>;
};

export default AssignmentInfo;

type Props = {
  assignment_date: string;
  worthCount: number;
  country_id: number;
  city_id: number;
  className?: string;
};
