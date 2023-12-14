import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import {
  AiOutlineUsergroupAdd,
  AiOutlineUser,
  AiOutlineEye,
  AiOutlineBranches
} from "react-icons/ai";
import s from "./index.module.scss";

const StatusInfo = async ({
  assignment_status,
  candidatesCount,
  executor,
  views,
}: Props) => {
  const t = await getTranslations("assignmnentPage");
  const tCommon = await getTranslations("common");

  const elements = [
    {
      id: 1,
      icon: <AiOutlineBranches />,
      title: t("status"),
      content: tCommon(`statuses.${assignment_status}`),
    },
    {
      id: 2,
      icon: <AiOutlineUser />,
      title: t("executor"),
      content: executor.executor_id ? (
        <Link href={`../profile/${executor.executor_id}`}>
          {executor.full_name}
        </Link>
      ) : (
        t("noExecutor")
      ),
    },
    {
      id: 3,
      icon: <AiOutlineUsergroupAdd />,
      title: t("сandidates"),
      content: candidatesCount,
    },
    {
      id: 4,
      icon: <AiOutlineEye />,
      title: t("views"),
      content: views,
    },
  ];

  const statusElements = elements.map((e) => (
    <div className={s.statusItem} key={e.id}>
      <span className={s.statusItemIcon}>{e.icon}</span>
      <div className={s.statusItemText}>
      <div className={s.statusItemTextTitle}>{e.title}:</div>
      <div className={s.statusItemTextContent}>{e.content}</div>
      </div>
    </div>
  ));

  return <div className={s.status}>{statusElements}</div>;
};

export default StatusInfo;

type Props = {
  assignment_status: number;
  candidatesCount: number;
  views: number;
  executor: {
    executor_id: number | null;
    full_name: string | null;
    user_photo: string | null;
  };
};
