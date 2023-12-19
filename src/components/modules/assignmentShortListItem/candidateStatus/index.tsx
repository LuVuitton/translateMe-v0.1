import { formatIsoDateToDMHM } from "@/helpers/dateConverter";
import s from "./index.module.scss";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/hooks/hooks";
import {
  IconApplyTime,
  IconCheck,
  IconCoffe,
  IconNoSmile,
} from "@/components/svgs";

const CandidateStatus = ({ applyDate, executor_id }: Props) => {
  const applyDateString = formatIsoDateToDMHM(applyDate, "DMHM");
  const t = useTranslations("candidates");
  const userID = useAppSelector((state) => state.user.data?.user_id);

  let candidateDate: CandidateDate = {
    text: "",
    icon: null,
    className: "",
  };
  switch (executor_id) {
    case userID:
      candidateDate.text = t("youAreExecutor");
      candidateDate.icon = <IconCheck className={s.statusTextIcon} />;
      candidateDate.className = s.statusExecutor;
      break;
    case null:
      candidateDate.text = t("underReview");
      candidateDate.icon = <IconCoffe className={s.statusTextIcon} />;
      candidateDate.className = s.statusUnderReview;
      break;
    default:
      candidateDate.text = t("anotherCandidate");
      candidateDate.icon = <IconNoSmile className={s.statusTextIcon} />;
      candidateDate.className = s.statusAnother;
  }

  return (
    <div className={s.status}>
      <time className={s.statusDate}>
        <IconApplyTime className={`${s.statusTextIcon} ${s.applyIcon}`} />
        <span className={s.statusDateText}>{t("applied")} </span>
        <span className={s.statusDateDate}>{applyDateString}</span>
      </time>
      <div className={`${s.statusText} ${candidateDate.className}`}>
        {candidateDate.icon}
        {candidateDate.text}
      </div>
    </div>
  );
};

export default CandidateStatus;

type Props = {
  applyDate: string;
  executor_id: number | null;
};

type CandidateDate = {
  text: string;
  icon: React.ReactNode;
  className: string;
};
