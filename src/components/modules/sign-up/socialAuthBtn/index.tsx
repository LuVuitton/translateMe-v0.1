import { useTranslations } from "next-intl";

import s from "./index.module.scss";
import { IconFb, IconGoogle } from "@/components/svgs";

export const SocialAuthBtn: React.FC<Props> = ({
  socailNetworkName,
  btnPurpose,
}) => {
  const t = useTranslations("auth.social-auth");

  const onClickHandler = () => {
    console.log("make request to ", socailNetworkName);
  };

  const ImgComponen =
    socailNetworkName === "Google" ? (
      <IconGoogle className={s.btnImg} />
    ) : (
      <IconFb className={s.btnImg} />
    );

  const btnText =
    btnPurpose === "sign-in" ? t("sign-in-btn-text") : t("sign-up-btn-text");

  return (
    <div className={s.socialAuthWrapper}>
      <button onClick={onClickHandler} className={s.btn}>
        {ImgComponen}
        <p> {`${btnText} ${socailNetworkName}`}</p>
      </button>
    </div>
  );
};

type Props = {
  socailNetworkName: "Google" | "Facebook";
  btnPurpose: "sign-in" | "sign-up";
};
