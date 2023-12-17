"use client"

import {
  useAddMeAsCandidateMutation,
  useDeleteMeAsCandidateMutation,
} from "@/app/api/clientRequests/candidates/candidates.api";
import { useAppSelector } from "@/hooks/hooks";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import s from "./index.module.scss";
import { TheButton } from "@/components";

export default function  ApplyButton ({
  assignmentID,
  candidates,
  customer_id,
}: ApplyButton){
  const userID = useAppSelector((state) => state.user.data?.user_id);
  const t = useTranslations("assignmnentPage");

  const [
    addMeAsCandidate,
    { isLoading: addMeLoading, isSuccess: addMeIsSuccess },
  ] = useAddMeAsCandidateMutation();
  const [
    deleteMeAsCandidate,
    { isLoading: deleteMeIsLoading, isSuccess: deleteMeIsSuccess },
  ] = useDeleteMeAsCandidateMutation();

  const btnHandler = () => {
    if (!userID) {
      alert("registrate");
    } else if (candidates.includes(userID)) {
      deleteMeAsCandidate({ assignment_id: assignmentID })
        .unwrap()
        .then((r) => toast.success("You have disapplied"))
        .catch((err) => {
          toast.error("deleteMeAsCandidate lets change server errors ");
          console.log(err);
        });
    } else {
      addMeAsCandidate({ assignment_id: assignmentID })
        .unwrap()
        .then((r) => toast.success("You have applied"))
        .catch(() =>
          toast.error("addMeAsCandidate lets change server errors ")
        );
    }
  };

  const buttonText = 
    userID && candidates.includes(userID)
      ? t("btn.cancelApplication")
      : t("btn.toApply");
  const buttonColor = userID && candidates.includes(userID) ? "red" : "green";

  return (
    <div className={s.btnWrapper}>
      {userID === customer_id ? (
        <div className={s.myAssignmentsLink}>
          <Link href={"/created-by-me"}>{t("myOtherAssignmnents")}</Link>
        </div>
      ) : (
        <div className={s.applyBtn}>
          <TheButton
            btnText={buttonText}
            color={buttonColor}
            isLoading={addMeLoading}
            callback={btnHandler}
          />
        </div>
      )}
    </div>
  );
};

type ApplyButton = {
  assignmentID: number;
  candidates: number[];
  customer_id: number;
};
