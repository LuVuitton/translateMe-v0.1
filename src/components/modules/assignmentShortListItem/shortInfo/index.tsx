import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import { useTranslations } from "next-intl";
import s from "./index.module.scss";
import cl from "classnames";
import { generatelanguagesBlocks } from "@/helpers/generateLanguageBlocks/generateLanguageBlocks";
import {
  IconDate,
  IconLocation,
  IconPigMoney,
  IconRight,
  IconStatus,
  IconTime,
} from "@/components/svgs";

const ShortInfo = ({
  assignment_date,
  worthCount,
  country_id,
  city_id,
  className,
  needsLang,
  speaksLang,
  status,
}: Props) => {
  const asDay = formatIsoDateToDMHM(assignment_date, "DM");
  const asTime = formatIsoDateToDMHM(assignment_date, "HM");
  const tCommon = useTranslations("common");
  const country = tCommon(`countries.${country_id}`);
  const city = tCommon(`cities.${city_id}`);
  let needs: JSX.Element[] = [];
  let speaks: JSX.Element[] = [];

  if (needsLang && speaksLang) {
    needs = generatelanguagesBlocks(needsLang, "small");
    speaks = generatelanguagesBlocks(speaksLang, "small");
  }

  return (
    <div className={cl(s.info, className)}>
      <div className={cl(s.infoItem, s.infoItemStatus)}>
        <IconStatus className={s.infoItemIcon} />
        {tCommon(`statuses.${status}`)}
      </div>
      <div className={s.infoItem}>
        <IconDate className={s.infoItemIcon} />
        {asDay}
      </div>
      <div className={s.infoItem}>
        <IconTime className={s.infoItemIcon} />

        {asTime}
      </div>
      <div className={s.infoItem}>
        <IconLocation className={s.infoItemIcon} />
        {country} {city}
      </div>
      <div className={cl(s.infoItem)}>
        <IconPigMoney className={cl(s.infoItemIcon, s.infoItemIconWorth)} />
        {worthCount} $
      </div>
      <div className={s.infoItem}>
        {speaks}
        {needsLang && speaksLang && (
          <IconRight className={cl(s.infoItemIcon, s.infoItemIconArrow)} />
        )}
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
  needsLang?: number[];
  speaksLang?: number[];
  status: number;
  views?: number;
};
