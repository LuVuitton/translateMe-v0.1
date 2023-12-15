"use client";

import { useGetCandidatesByAsIDQuery } from "@/app/api/clientRequests/candidates/candidates.api";
import s from "./index.module.scss";
import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import { useSelectCandidateMutation } from "@/app/api/clientRequests/assignment/assignment.api";
import { useTranslations } from "next-intl";
import { Preloader, TheButton } from "@/components";
import { ProfileShort } from "../modules";
import { Accordion } from "../bootsrtap";
import AccHead from "./accHead";
import NoCandidate from "./noCandidate";

const Candidates = ({ assignmentID }: { assignmentID: number }) => {
  const t = useTranslations("candidates");
  // const [noCandidatesAnimation, setCandidatesAnimation] = useState(false)

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
          <Accordion.Header >
            <AccHead
              candidateFullName={e.candidate_full_name}
              date={date}
              dateText={t("applied")}
            />
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
      <Accordion defaultActiveKey="0" flush style={{ height: "100%" }} className={s.main}>
        {candidates.length !== 0 ? (
          candidates
        ) : (
          <NoCandidate text={t("noCandidates")} />
        )}
      </Accordion>
    );
  }
};

export default Candidates;
