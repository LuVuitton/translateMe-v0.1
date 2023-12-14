"use client";

import { useGetCandidatesByAsIDQuery } from "@/app/api/clientRequests/candidates/candidates.api";
import s from "./index.module.scss";
import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import { useSelectCandidateMutation } from "@/app/api/clientRequests/assignment/assignment.api";
import { useTranslations } from "next-intl";
import { Preloader, TheButton } from "@/components";
import { ProfileShort } from "../modules";
import { Accordion } from "../bootsrtap";
import { CgSmileNeutral } from "react-icons/cg";

const Candidates = ({ assignmentID }: { assignmentID: number }) => {
  const t = useTranslations("candidates");

  const { data, isLoading } = useGetCandidatesByAsIDQuery({
    assignmentID,
  });
  const [pickOne, { isLoading: pickLoading }] = useSelectCandidateMutation();

  const pickHandler = (candodateID: number) => {
    pickOne({ assignment_id: assignmentID, candidate_id: candodateID });
  };

  const cancelHandler = () => {
    console.log("cancel candidate");
  };

  if (isLoading) {
    // return <Preloader type="local" />;
    return <div>Candidates loading...</div>;
  }

  if (data) {
    const candidates = data?.candidates?.map((e, i) => {
      const date = formatIsoDateToDMHM(e.apply_time, "DMHM");
      return (
        <Accordion.Item
          key={`${e.candidate_id}-${e.assignment_id}`}
          eventKey={e.candidate_full_name}
        >
          <Accordion.Header>
            <div className={s.candidateWrapper}>
              <div className={s.name}>{e.candidate_full_name}</div>
              <div className={s.date}>
                {t("applied")}: {date}
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <ProfileShort userID={e.candidate_id}>
              <TheButton
                btnText={t(e.isExecutor ? "btn.cancel" : "btn.pickOne")}
                callback={() =>
                  e.isExecutor ? cancelHandler() : pickHandler(e.candidate_id)
                }
                isLoading={pickLoading}
                color={e.isExecutor ? "red" : "green"}
              />
            </ProfileShort>
          </Accordion.Body>
        </Accordion.Item>
      );
    });

    return (
      <Accordion defaultActiveKey="0" flush>
        {candidates.length !== 0 ? (
          candidates
        ) : (
          <div className={s.noCandidates}>
            <div className={s.noCandidatesIcon}>
              <CgSmileNeutral />
            </div>
            <div className={s.noCandidatesText}> {t("noCandidates")}</div>
          </div>
        )}
      </Accordion>
    );
  }
};

export default Candidates;

{
  /* <div className={s.itemWrapper} key={i}>
            <Link href={`profile/${e.candidate_id}`}>
              <div className={s.candidateWrapper}>
                <div className={s.name}>{e.candidate_full_name}</div>
                <div className={s.date}>
                  {t("applied")}: {date}
                </div>
              </div>
            </Link>
            <div>{e.isExecutor && t("isCandidate")}</div>
            <div className={s.btn}>
              <TheButton
                btnText={t(e.isExecutor ? "btn.cancel" : "btn.pickOne")}
                callback={() =>
                  e.isExecutor ? cancelHandler() : pickHandler(e.candidate_id)
                }
                isLoading={pickLoading}
                color={e.isExecutor ? "red" : "green"}
              />
            </div>
          </div> */
}
