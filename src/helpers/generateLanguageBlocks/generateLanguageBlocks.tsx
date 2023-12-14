import { languageMapping } from "../mappingData";
import s from "./index.module.scss";

export const generatelanguagesBlocks = (
  languages: number[],
  size: Size = "medium"
): JSX.Element[] => {

const sizeClass = size === "small" ? s.small : ""



  if (languages.length <= 3) {
    return languages.map((e, i) => (
      <div
        key={i}
        className={`${s.langItem} ${sizeClass}`}
        title={languageMapping[e].full}
        // key={"add id to lang"}
      >
        {languageMapping[e].short}
      </div>
    ));
  } else {
    const newArr = [];

    for (let i = 0; i < 2; i++) {
      const e = languages[i];
      newArr.push(
        <div
          key={i}
          className={`${s.langItem} ${sizeClass}`}
          title={languageMapping[e].full}
        >
          {languageMapping[e].short}
        </div>
      );
    }
    newArr.push(
      <div className={`${s.langItem} ${sizeClass} `}>
        +{languages.length - 2}
      </div>
    );

    return newArr;
  }
};

type Size = "small" | "medium";
