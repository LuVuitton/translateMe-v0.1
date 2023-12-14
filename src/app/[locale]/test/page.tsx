"use client";

import s from "./test.module.scss";


const elements = [1,2,3,4,5,6,7]

export default function Test() {

const mapped = elements.map(e=> <div className={s.el}>hello</div> )

  return (
    <div className={s.main}>
      <span className={`${s.item} ${s.absolute}`}>{mapped}</span>
      <span className={`${s.item} ${s.fixed}`}>fixed</span>
    </div>
  );
}
