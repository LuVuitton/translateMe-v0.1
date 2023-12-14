import { GetByIDRes } from "../../clientRequests/assignment/assignment.api";

const BASE_URL = "http://localhost:3000/assignment";

export async function getAssignment({
  assignmentID,
}: {
  assignmentID: number;
}): Promise<GetByIDRes> {
  const res = await fetch(`${BASE_URL}/${assignmentID}`);
  //   const res = await fetch(`${BASE_URL}/user/1000000`);

  if (!res.ok) {
    throw new Error("Failed to fetch data getUser");
  }

  return res.json();
}
