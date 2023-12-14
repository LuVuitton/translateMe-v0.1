export default function UserAssignments({params:{userID}}:Props) {
    

    return <div>Get all user assignments by user id {userID}</div>
}



type Props = {
    params: {
      userID: number;
    };
  };
  