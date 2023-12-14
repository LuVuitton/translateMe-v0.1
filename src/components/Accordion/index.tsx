"use client";
import {
  MeResponse,
  useGetUserQuery,
} from "@/app/api/clientRequests/user/user.api";
import { Accordion } from "../bootsrtap";
import { Profile } from "../modules";
import { useEffect, useState } from "react";

const elements = ["1", "2"];
// let map:JSX.Element[]=[];


function AccordionComponent() {
  const [users, setUsers] = useState<MeResponse>();
  const [map, setMap] = useState<JSX.Element[]>([]); // Добавляем состояние для map

  const { data } = useGetUserQuery({ userID: 1 });

  useEffect(() => {
    data && setUsers(data);
  }, [data]);

  useEffect(() => {
    if (users) {
      const mappedElements = elements.map((e, i) => (
        <Accordion.Item key={i} eventKey={e}>
          <Accordion.Header>Accordion Item {e}</Accordion.Header>
          <Accordion.Body>
            {/* <Profile userData={users} /> */}
          </Accordion.Body>
        </Accordion.Item>
      ));
      setMap(mappedElements); // Обновляем состояние map
    }
  }, [users]);

  return (
    <Accordion defaultActiveKey="0" flush>
      {map.length !== 0 ? map : "loading..."}
    </Accordion>
  );
}


export default AccordionComponent;
