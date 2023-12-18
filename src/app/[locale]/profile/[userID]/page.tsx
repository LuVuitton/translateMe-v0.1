import {ProfileShort, Reviews } from "@/components/modules";
import { getUser } from "@/app/api/serverRequests/profile/user";
import s from "./index.module.scss";
import { AboutMe, Section } from "@/components";

export default async function ProfilePage(props: Props) {
  const {
    params: { userID },
  } = props;

  const userData = await getUser({ userID });

  console.log(userData);
  

  return (
    <Section>
      <div className={s.profile}>
        <div className={s.profileMain}>
          <ProfileShort userID={userID}>
            <div>Btn Send message</div>
          </ProfileShort>
          <AboutMe aboutMe={userData.about_me}/>
        </div>
        <div className={s.profileReview}>
          <Reviews userID={userID} />
        </div>
      </div>
    </Section>
  );
}

type Props = {
  params: {
    userID: number;
  };
};

{
  /* <Profile userData={userData} /> */
}
