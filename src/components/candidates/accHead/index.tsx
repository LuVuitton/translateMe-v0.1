import { useTranslations } from "next-intl";
import s from "./index.module.scss";

const AccHead = ({ candidateFullName, date, dateText,isExecutor }: Props) => {
const t = useTranslations('candidates')

  return (
    <div className={s.container}>
    <div className={s.head}>
      <div className={s.headName}>{candidateFullName}</div>
      <div className={s.headDate}>
        {dateText}: {date}
      </div>
    </div>
     {isExecutor && <div className={s.isExecutor}>{t('isExecutor')}</div>}
    </div>
  );
};

export default AccHead

type Props = {
  candidateFullName: string;
  date: string;
  dateText: string;
  isExecutor:boolean
};
