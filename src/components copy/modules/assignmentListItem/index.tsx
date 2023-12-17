import { AssignmentListItem } from "@/app/api/clientRequests/assignment/assignment.api";
import s from "./index.module.scss";
import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import { useTranslations } from "next-intl";
import {  Title } from "@/components";
import Languages from "./languages";
import AssignmentInfo from "./assignmentInfo";
;

const AssignmentItem: React.FC<Props> = ({
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
  },
}) => {
  const t = useTranslations("assignmnentPage");

  const creationDate = formatIsoDateToDMHM(assignment_creation_date, "DM");

  return (
    <div className={s.assignmentWrapper}>
      <div className={s.container}>
          <time className={s.posted}>
            {`${t("posted")}: ${creationDate}`}
          </time>
          <Title type="small" cut className={s.titleHover}>
            {assignment_title}
          </Title>
          <div className={s.description}>{assignment_description}</div>
          <Languages
            needsLang={required_languages_id}
            speaksLang={customer_languages_id}
          />
          <AssignmentInfo
            assignment_date={assignment_date}
            city_id={city_id}
            country_id={country_id}
            worthCount={worth}
            className={s.shotrInfo}
          />
      </div>
    </div>
  );
};

export default AssignmentItem;

type Props = {
  assignmentData: AssignmentListItem;
};
