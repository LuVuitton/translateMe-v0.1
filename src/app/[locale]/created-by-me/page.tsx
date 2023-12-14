"use client";
import s from "./index.module.scss";
import { useGetMyAssignmentQuery } from "@/app/api/clientRequests/assignment/assignment.api";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Candidates, Preloader, Section } from "@/components";
import { AssignmentShortListItem } from "@/components/modules";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

export default function AssignmentsCreatedByMe() {
  const [shownCandidates, setShownCandidates] = useState<number | null>(null);
  const { data, isLoading } = useGetMyAssignmentQuery();
  const t = useTranslations("createdByMe");
  const [listShown, setListShown] = useState<ListShownOptopns>("upcoming");
  let upcomingAssignments: JSX.Element[] = [];
  let closedAssignments: JSX.Element[] = [];

  const showCandidatesHandler = (assignmentsID: number) => {
    setShownCandidates(assignmentsID);
  };

  const switchOptionHandler = (option: ListShownOptopns) => {
    setListShown(option);
    setShownCandidates(null);
  };

  data?.data.forEach((e) => {
    const item = (
      <li key={e.assignment_id} className={s.listItem}>
        {/* <Link href={`assignments/${e.assignment_id}`}> */}
        <div onClick={() => showCandidatesHandler(e.assignment_id)}>
          <AssignmentShortListItem assignmentData={e} />
        </div>
        {/* </Link> */}
        {/* <Candidates assignmentID={e.assignment_id} /> */}
      </li>
    );

    if ([1, 2, 3].includes(e.assignment_status)) {
      upcomingAssignments.push(item);
    } else {
      closedAssignments.push(item);
    }
  });

  if (isLoading) {
    // return <Preloader type="local" />;
    return <div>loadibg page...</div>;
  }

  return (
    <div className={s.listWrapper}>
      <Section className={s.section}>
        <div className={s.nav}>
          <div
            className={s.navItem}
            onClick={() => switchOptionHandler("upcoming")}
          >
            {t("upcoming")}
          </div>
          <div
            className={s.navItem}
            onClick={() => switchOptionHandler("closed")}
          >
            {t("closed")}
          </div>
        </div>

        <div className={s.main}>
          <ul className={`${s.list} ${s.mainList}`}>
            {listShown === "upcoming" ? upcomingAssignments : closedAssignments}
          </ul>
          <div className={s.mainContainer}>
            <div className={s.mainContainerCandidates}>
              {shownCandidates ? (
                <Candidates assignmentID={shownCandidates} />
              ) : (
                <div className={s.mainContainerCandidatesChoose}>
                  <span className={s.mainContainerCandidatesChooseIcon}>
                    <FaRegArrowAltCircleLeft />
                  </span>
                  <span className={s.mainContainerCandidatesChooseText}>
                    {t("chooseAssignmnent")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

type ListShownOptopns = "upcoming" | "closed";
