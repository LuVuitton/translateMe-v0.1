import { CgSmileNeutral } from "react-icons/cg";
import s from "./index.module.scss";
import { useEffect, useState } from "react";

const NoCandidate = ({ text }: { text: string }) => {

  return (
    <div className={s.noCandidates}>
      <div
        className={s.noCandidatesIcon}
      >
        <CgSmileNeutral />
      </div>
      <div className={s.noCandidatesText}> {text}</div>
    </div>
  );
};

export default NoCandidate;
