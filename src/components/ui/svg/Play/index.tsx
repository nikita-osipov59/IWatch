import { svgSize } from "@/utils/interfaces";

import style from "./style.module.scss";

export const Play = ({ text, size = 22 }: svgSize) => {
  return (
    <div className={style.box}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="6 3 20 12 6 21 6 3" />
      </svg>
      {text}
    </div>
  );
};
