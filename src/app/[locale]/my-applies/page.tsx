"use client";


import s from "./index.module.scss";
import { useGetAssignmentsByCandidateIDQuery } from "@/app/api/clientRequests/candidates/candidates.api";
import { Preloader, SecondAsignmentBlock } from "@/components";

import { useAppSelector } from "@/hooks/hooks";
import { Link } from "@/navigation";

export default function MyApplies() {
  const { data, isLoading } = useGetAssignmentsByCandidateIDQuery();
  const userID = useAppSelector(state=> state.user.data?.user_id)

  const assignments = data?.assignments.map((e) => {
    return (
      <li key={e.assignment_id} className={s.listItem}>
        <Link href={`./assignments/${e.assignment_id}`}>
          <SecondAsignmentBlock
            address={e.address}
            apply_time={e.apply_time}
            assignment_id={e.assignment_id}
            worth={e.worth}
            status={e.status}
            date={e.date}
            country_id={e.country_id}
            city_id={e.city_id}
            title={e.title}
            description={e.description}
            execution_time_minutes={e.execution_time_minutes}
            executor_id={e.executor_id}
            userID={userID? userID: null}
          />
        </Link>
      </li>
    );
  });

  if (isLoading) {
    return <Preloader type="local"/>;
  }
  return (
    <div className={s.listWrapper}>
      <ul className={s.list}>{assignments}</ul>
    </div>
  );
}
