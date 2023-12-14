import { useTranslations } from "next-intl";

import s from "./index.module.scss";
import Image from "next/image";
import googleIMG from "../../../../../public/google.png";
import fbIMG from "../../../../../public/fb.png";

export const SocialAuthBtn: React.FC<Props> = ({
  socailNetworkName,
  btnPurpose,
}) => {
  const t = useTranslations("auth.social-auth");

  const onClickHandler = () => {
    console.log("make request to ", socailNetworkName);
  };

  const img = socailNetworkName === "Google" ? googleIMG : fbIMG;

  const btnText = btnPurpose === "sign-in" ? t("sign-in-btn-text") : t("sign-up-btn-text");

  return (
    <div className={s.socialAuthWrapper}>
      <button onClick={onClickHandler} className={s.btn}>
        <Image className={s.btnImg} src={img} alt={socailNetworkName} />
        <p> {`${btnText} ${socailNetworkName}`}</p>
      </button>
    </div>
  );
};

type Props = {
  socailNetworkName: "Google" | "Facebook";
  btnPurpose: "sign-in" | "sign-up";
};
