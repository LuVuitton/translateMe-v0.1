import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import s from "./index.module.scss";
import { useTranslations } from "next-intl";

const SecondAsignmentBlock = (data: Props) => {
  const {
    address,
    apply_time,
    assignment_id,
    city_id,
    country_id,
    date,
    description,
    execution_time_minutes,
    status,
    title,
    worth,
    executor_id,
    userID
  } = data;

  const amIExecutor = executor_id && executor_id === userID

  const asDay = formatIsoDateToDMHM(date, "DM");
  const asTime = formatIsoDateToDMHM(date, "HM");
  const commonName = useTranslations("common");

  return (
    <div className={s.assignmentWrapper}>
      <div className={s.container}>
        <div className={s.left}>
          <div className={s.topLeft}>
            <div className={s.title}>{title}</div>
            <div className={s.description}>{description}</div>
          </div>
          <div className={s.bottomLeft}>
            <div className={s.fn}>status:</div>
            <div className={s.status}> {commonName(`statuses.${status}`)}</div>
            {amIExecutor && <div>you are executor</div>}
          </div>
        </div>

        <div className={s.right}>
          <div> {commonName(`cities.${city_id}`)}</div>

          <div>
            <div>{`${asDay} ${asTime}`}</div>
          </div>
          <div className={s.worth}>{worth}$</div>
        </div>
      </div>
    </div>
  );
};

export default SecondAsignmentBlock

type Props = {
  assignment_id: number;
  apply_time: string;
  worth: number;
  status: number;
  address: string;
  date: string;
  country_id: number;
  city_id: number;
  title: string;
  description: string;
  execution_time_minutes: number;
  executor_id: number | null;
  userID: number | null;
};
