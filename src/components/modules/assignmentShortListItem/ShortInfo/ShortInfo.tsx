import { MdDateRange } from "react-icons/md";
import { IoTimeSharp, IoLocationSharp } from "react-icons/io5";
import { TbPigMoney } from "react-icons/tb";
import { BsArrowRightCircle } from "react-icons/bs";

import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import { useTranslations } from "next-intl";
import s from "./index.module.scss";
import cl from "classnames";
import { generatelanguagesBlocks } from "@/helpers/generateLanguageBlocks/generateLanguageBlocks";
import { AiOutlineBranches } from "react-icons/ai";

const ShortInfo = ({
  assignment_date,
  worthCount,
  country_id,
  city_id,
  className,
  needsLang,
  speaksLang,
  status
}: Props) => {
  const asDay = formatIsoDateToDMHM(assignment_date, "DM");
  const asTime = formatIsoDateToDMHM(assignment_date, "HM");
  const tCommon = useTranslations("common");
  const country = tCommon(`countries.${country_id}`);
  const city = tCommon(`cities.${city_id}`);
  const needs = generatelanguagesBlocks(needsLang, "small");
  const speaks = generatelanguagesBlocks(speaksLang, "small");

  return (
    <div className={cl(s.info, className)}>
      <div className={cl(s.infoItem, s.infoItemStatus)}>
        <AiOutlineBranches className={s.infoItemIcon} />
        {tCommon(`statuses.${status}`)}
      </div>
      <div className={s.infoItem}>
        <MdDateRange className={s.infoItemIcon}/>
        {asDay}
      </div>
      <div className={s.infoItem}>
        <IoTimeSharp className={s.infoItemIcon}/>
        {asTime}
      </div>
      <div className={s.infoItem}>
        <IoLocationSharp className={s.infoItemIcon}/>
        {country} {city}
      </div>
      <div className={cl(s.infoItem)}>
        <TbPigMoney style={{ fontSize: "1.1rem" }} className={cl(s.infoItemIcon,s.infoItemIconWorth) }/>
        {worthCount} $
      </div>
      <div className={s.infoItem}>
        {speaks}
        <BsArrowRightCircle className={cl( s.infoItemIcon, s.infoItemIconArrow)} />
        {needs}
      </div>
    </div>
  );
};

export default ShortInfo;

type Props = {
  assignment_date: string;
  worthCount: number;
  country_id: number;
  city_id: number;
  className?: string;
  needsLang: number[];
  speaksLang: number[];
  status: number;
  views: number;
};
