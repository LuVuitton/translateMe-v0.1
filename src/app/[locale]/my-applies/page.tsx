"use client";

import s from "./index.module.scss";
import { useGetAssignmentsByCandidateIDQuery } from "@/app/api/clientRequests/candidates/candidates.api";
import { Section } from "@/components";
import { AssignmentShortListItem } from "@/components/modules";
// import { Preloader} from "@/components";
import { Link } from "@/navigation";

export default function MyApplies() {
  const { data, isLoading } = useGetAssignmentsByCandidateIDQuery();

  const assignments = data?.assignments.map((e) => {
    const assignmentData = {
      address: e.address,
      assignment_id: e.assignment_id,
      city_id: e.city_id,
      assignment_date: e.date,
      assignment_description: e.description,
      execution_time_minutes: e.execution_time_minutes,
      country_id: e.country_id,
      assignment_status: e.status,
      assignment_title: e.title,
      worth: e.worth,
      assignment_creation_date: "added date from back",
      applyDate: e.apply_time,
      executor_id: e.executor_id,
    };
    return (
      <li key={e.assignment_id} className={s.listItem}>
        <Link href={`./assignments/${e.assignment_id}`}>
          <AssignmentShortListItem assignmentData={assignmentData} />
        </Link>
      </li>
    );
  });

  if (isLoading) {
    // return <Preloader type="local"/>;
    return <div>Loading</div>;
  }
  return (
    <Section>
      <ul className={s.list}>{assignments}</ul>
    </Section>
  );
}
