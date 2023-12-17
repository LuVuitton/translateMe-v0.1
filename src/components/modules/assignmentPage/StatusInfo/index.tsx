import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import s from "./index.module.scss";
import { IconEye, IconStatus, IconUser, IconUsers } from "@/components/svgs";

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
      icon: <IconStatus style={{ fontSize: "1.9rem" }} />,
      title: t("status"),
      content: tCommon(`statuses.${assignment_status}`),
      className: s.iconStatus

    },
    {
      id: 2,
      icon: <IconUser />,
      title: t("executor"),
      content: executor.executor_id ? (
        <Link href={`../profile/${executor.executor_id}`}>
          {executor.full_name}
        </Link>
      ) : (
        t("noExecutor")
      ),
      className: s.iconUser

    },
    {
      id: 3,
      icon: <IconUsers style={{ fontSize: "2rem" }} />,
      title: t("сandidates"),
      content: candidatesCount,
      className: s.iconUsers

    },
    {
      id: 4,
      icon: <IconEye />,
      title: t("views"),
      content: views,
      className: s.iconEye
    },
  ];

  const statusElements = elements.map((e) => (
    <div className={s.statusItem} key={e.id}>
      <span className={`${s.statusItemIcon} ${e.className}`}>{e.icon}</span>
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
