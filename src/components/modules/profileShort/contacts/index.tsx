"use client";
import { useTranslations } from "next-intl";
import s from "./index.module.scss";
import { useGetContactsByIDQuery } from "@/app/api/clientRequests/contacts/contacts.api";
import { Preloader } from "@/components";


export default function Contacts({ userID }: { userID: number }) {
  const { data, isError, isLoading, error } = useGetContactsByIDQuery({
    userID,
  });

  const t = useTranslations("common.contacts")
  

  if (isLoading) {
    return <Preloader type="local"/>;
  }
  if (isError) {
    return <div>isError</div>;
  }
  if (data && "user_contact_id" in data) {
    const {
      contact_create_date,
      contact_update_date,
      user_contact_id,
      user_id,
      ...contacts
    } = data;

    const gridContactBlocks: React.ReactNode[] = [];

    Object.entries(contacts).forEach(
      ([k, v]: [string, string | null | undefined], i) => {
        if (v !== null) {
          gridContactBlocks.push(
            <div key={i} className={s.contactItem}>
              <span>{t(`${k}`)}</span>
            </div>
          );
          gridContactBlocks.push(
            <div key={i * 100} className={s.contactItem}>
              <span>{v}</span>
            </div>
          );
        }
      }
    );

    return (
      <div className={s.mainWrapper}>
        {gridContactBlocks.length > 0 ? (
          <div className={s.contactsWrapper}>{gridContactBlocks}</div>
        ) : (
          <div className={s.noContacts}>{t("notAdded")}</div>
        )}
      </div>
    );
  } else if (data && "message" in data && data.status === 403) {
    return (
      <div className={s.mainWrapper}>
        <div className={s.forbiden}>
        {t("noAccess")}
        </div>
      </div>
    );
  }
}
