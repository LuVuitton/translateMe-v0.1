import { Title } from "@/components";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import s from "./index.module.scss";
import { BsPostcard } from "react-icons/bs";

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
        <span className={s.headSectionIcon}>
          <BsPostcard />
        </span>

        <div className={s.headSectionAuthor}>
          <span>{t("author")}: </span>
          <Link href={`../profile/${customer.customer_id}`}>
            {customer.full_name}
          </Link>
        </div>
        <data className={s.headSectionDate}>
          <span> {t("posted")}: </span> {creationDate}
          {/* <span> {t("updated")}:</span> {updateDate} */}
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
