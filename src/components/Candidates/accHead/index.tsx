import s from "./index.module.scss";

const AccHead = ({ candidateFullName, date, dateText }: Props) => {
  return (
    <div className={s.candidateWrapper}>
      <div className={s.name}>{candidateFullName}</div>
      <div className={s.date}>
        {dateText}: {date}
      </div>
    </div>
  );
};

export default AccHead

type Props = {
  candidateFullName: string;
  date: string;
  dateText: string;
};
