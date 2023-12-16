import { MdDateRange } from "react-icons/md";
import { IoTimeSharp, IoLocationSharp } from "react-icons/io5";
import { TbPigMoney } from "react-icons/tb";
import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import { useTranslations } from "next-intl";
import s from "./index.module.scss";
import cl from "classnames";

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

  return (
    <div className={cl(s.info, className)}>
      <div className={s.infoItem}>
        <MdDateRange />
        {asDay}
      </div>
      <div className={s.infoItem}>
        <IoTimeSharp />
        {asTime}
      </div>
      <div className={s.infoItem}>
        <IoLocationSharp />
        {country} {city}
      </div>
      <div className={cl(s.infoItem, s.infoItemWorth)}>
        <TbPigMoney style={{ fontSize: "1.1rem" }} />
        {worthCount} $
      </div>
    </div>
  );
};

export default AssignmentInfo;

type Props = {
  assignment_date: string;
  worthCount: number;
  country_id: number;
  city_id: number;
  className?: string;
};
