import React from "react";

export default function Full({
  fill = "#FFF",
  ...rest
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {" "}
      <path
        d="M2 7V2H7"
        stroke={fill}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />{" "}
      <path
        d="M22 7V2H17"
        stroke={fill}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />{" "}
      <path
        d="M7 22L2 22L2 17"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />{" "}
      <path
        d="M17 22L22 22L22 17"
        stroke={fill}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />{" "}
    </svg>
  );
}
