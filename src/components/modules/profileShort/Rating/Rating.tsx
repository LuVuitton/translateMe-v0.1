import { getTranslations } from "next-intl/server";
import s from './index.module.scss'

export default async function Rating({ userID }: { userID: number }) {
  const t = await getTranslations("profilePage.rating");
  // const data = await getUserRating({ userID });

  // debugger
// const {
//   complitedAssignments,
//   createdAssignments,
//   rating_as_customer,
//   rating_as_executor,
// } = rating;

// rating: { !!!
//   rating_as_customer: {
//     reviewCount: 3,
//     rating: 5,
//   },
//   rating_as_executor: { reviewCount: 1, rating: 5 },
//   createdAssignments: [1, 2, 3, 4],
//   complitedAssignments: [5, 6, 7, 8],
// },


  return (
    <div className={s.mainWrapper}>
      <div className={s.container}>
      <div>{t("userRating")}</div>
      <div>{`${"number"}(${"number"})`}</div>
      <div>{t("raters")}</div>
      </div>
    </div>
  );
}
