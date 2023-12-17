import s from "./index.module.scss";
import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import { useTranslations } from "next-intl";
import { Title } from "@/components";
import ShortInfo from "./shortInfo";

const AssignmentShortListItem: React.FC<Props> = ({
  assignmentData: {
    assignment_date,
    assignment_creation_date,
    assignment_description,
    assignment_id,
    assignment_title,
    city_id,
    country_id,
    customer_languages_id,
    required_languages_id,
    worth,
    assignment_status,
    views,
    candidates,
  },
  isActive,
}) => {
  const t = useTranslations("assignmnentPage");

  
  const creationDate = formatIsoDateToDMHM(assignment_creation_date, "DM");

  return (
    <div
      className={`${s.assignmentWrapper} ${isActive ? s.isActiveClass : ""}`}
    >
      <div className={s.candidates}>{candidates.totalCount}</div>
      <div className={s.container}>
        <time className={s.posted}>{`${t("posted")}: ${creationDate}`}</time>
        <Title type="small" cut className={s.titleHover}>
          {assignment_title}
        </Title>
        <div className={s.description}>{assignment_description}</div>
        <ShortInfo
          assignment_date={assignment_date}
          city_id={city_id}
          country_id={country_id}
          worthCount={worth}
          className={s.shotrInfo}
          needsLang={required_languages_id}
          speaksLang={customer_languages_id}
          status={assignment_status}
          views={views}
        />
      </div>
    </div>
  );
};

export default AssignmentShortListItem;

type Props = {
  assignmentData: {
    assignment_id: number;
    worth: number;
    assignment_status: number;
    address: string;
    assignment_date: string;
    country_id: number;
    city_id: number;
    assignment_title: string;
    assignment_description: string;
    execution_time_minutes: number;
    executor_rating_by_customer: null;
    customer_rating_by_executor: null;
    views: number;
    assignment_creation_date: string;
    assignment_update_date: string;
    required_languages_id: number[];
    customer_languages_id: number[];
    candidates: {
      totalCount: number;
      assignment_id: number;
      candidates: number[];
    };
  };
  isActive?: boolean | null;
};
