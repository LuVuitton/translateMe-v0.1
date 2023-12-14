"use client";

import { ProfileShort } from "@/components/modules";
import s from "./test.module.scss";
import { useGetUserQuery } from "@/app/api/clientRequests/user/user.api";



export default function Test() {

  const {data, isLoading}= useGetUserQuery({userID:1})

if (!data) {
  return <div>Loading...</div>
}
  return (
    <div className={s.mainWrapper }>
      <div className={s.container}>
     
      <ProfileShort userData={data} />
      </div>
    </div>
  );
}
