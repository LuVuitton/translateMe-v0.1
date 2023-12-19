import { Title } from "@/components";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import s from "./index.module.scss";
import { IconUser } from "@/components/svgs";

const AssignmentHead = async ({
  assignment_title,
  creationDate,
  customer,
  updateDate,
}: Props) => {
  const t = await getTranslations("assignmnentPage");

  return (
    <div className={s.head}>
      <Title type="medium">{assignment_title}</Title>
      <section className={s.headSection}>

          


        <div className={s.headSectionAuthor}>
          <Link href={`../profile/${customer.customer_id}`}>
        <IconUser className={s.headSectionAuthorIcon} />
            {customer.full_name}
          </Link>
        </div>
        <data className={s.headSectionDate}>
          <span> {t("posted")}: </span> {creationDate}
        </data>
      </section>
    </div>
  );
};

export default AssignmentHead;

type Props = {
  assignment_title: string;
  creationDate: string;
  updateDate: string;
  customer: {
    customer_id: number;
    full_name: string;
    user_photo: string | null;
  };
};
