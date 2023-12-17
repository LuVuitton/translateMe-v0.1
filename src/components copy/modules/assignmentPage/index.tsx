import { GetByIDRes } from "@/app/api/clientRequests/assignment/assignment.api";
import s from "./index.module.scss";
import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import LanguagesBlock from "./languagesBlock";
import { Section } from "@/components";
import Parameters from "./parameters";
import AssignmentHead from "./assignmentHead";
import StatusInfo from "./statusInfo";

export default async function Assignment({ assignmentData }: Props) {
  const t = await getTranslations("assignmnentPage");

  const {
    assignment_title,
    assignment_creation_date,
    assignment_update_date,
    assignment_description,
    assignment_status,
    views,
    customer,
    executor,
    assignment_id: assignmentID,
    customer_rating_by_executor,
    executor_rating_by_customer,
    candidates,
    ...paremeters
  } = assignmentData;

  const creationDate = formatIsoDateToDMHM(assignment_creation_date);
  const updateDate = formatIsoDateToDMHM(assignment_update_date);

  return (
    <div>
      <Section className={s.section}>
        <AssignmentHead
          assignment_title={assignment_title}
          creationDate={creationDate}
          customer={customer}
          updateDate={updateDate}
        />
        <ApplyButton
          assignmentID={assignmentID}
          candidates={candidates.candidates}
          customer_id={customer.customer_id}
        />
      </Section>
      <Section className={`${s.section} ${s.languages}`}>
        <LanguagesBlock assignmentID={assignmentID} />
      </Section>
      <Section className={s.section}>
        <div className={s.description}>{assignment_description}</div>
      </Section>
      <Section className={s.section}>
        <Parameters parameters={paremeters} />
      </Section>
      <Section className={s.section}>
        <StatusInfo
          assignment_status={assignment_status}
          candidatesCount={candidates.candidatesCount}
          executor={executor}
          views={views}
        />
      </Section>
    </div>
  );
}

type Props = {
  assignmentData: GetByIDRes;
};

//By default, Next.js pre-renders every page.
// This means that Next.js generates HTML for each page in advance,
// instead of having it all done by client-side JavaScript.
// Pre-rendering can result in better performance and SEO.
// (...) When a page is loaded by the browser,
// its JavaScript code runs and makes the page fully interactive
// (this process is called hydration in React).

const ApplyButton = dynamic(() => import("./applyButton"), {
  ssr: false,
});
