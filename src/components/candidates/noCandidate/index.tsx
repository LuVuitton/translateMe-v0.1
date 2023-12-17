import { IconNoSmile } from "@/components/svgs";
import s from "./index.module.scss";


const NoCandidate = ({ text }: { text: string }) => {
  return (
    <div className={s.noCandidates}>
      <IconNoSmile className={s.noCandidatesIcon}/>
      <div className={s.noCandidatesText}> {text}</div>
    </div>
  );
};

export default NoCandidate;
