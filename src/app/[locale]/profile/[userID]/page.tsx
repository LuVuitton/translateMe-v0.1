import { Profile, Reviews } from "@/components/modules";
import { getUser } from "@/app/api/serverRequests/profile/user";




export default async function ProfilePage(props: Props) {
  const {
    params: { userID },
  } = props;


  const userData = await getUser({ userID });

  return (
    <div>
      <Profile userData={userData}/>
      <Reviews userID={userID} />
    </div>
  );
}

type Props = {
  params: {
    userID: number;
  };
};
