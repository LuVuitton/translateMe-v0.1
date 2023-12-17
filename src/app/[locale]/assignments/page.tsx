"use client";
import { useGetSortedAssignmentQuery } from "@/app/api/clientRequests/assignment/assignment.api";
import { Link } from "@/navigation";
import { Section } from "@/components";
import s from "./index.module.scss";
import { AssignmentItem } from "@/components/modules";

export default function AssignmentList() {
  const { data, isLoading, isError } = useGetSortedAssignmentQuery({});

  const assignments = data?.assigments.map((e) => (
    <li key={e.assignment_id}>
      <Link href={`/assignments/${e.assignment_id}`}>
        <AssignmentItem assignmentData={e} />
      </Link>
    </li>
  ));

  if (isLoading) {
    // return <Preloader type="local" />;
    return <div>LOADING...</div>;
  }
  return (
    <Section>
      <ul className={s.list}>{assignments}</ul>
    </Section>
  );
}
