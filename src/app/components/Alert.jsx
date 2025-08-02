"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";

export default function Alert({
  title,
  color = "red-400",
  textColor = "white",
  isRemoving = true,
}) {
  let element = useRef(null);

  isRemoving &&
    useEffect(() => {
      setTimeout(() => {
        element?.current?.remove();
      }, 3000);
    }, []);
  return (
    <div
      className="flex w-full justify-center items-center z-50
    "
      ref={element}
    >
      <div
        className={clsx(
          "z-50 rounded-sm mx-3 px-5 py-3 fixed top-2 left-2 right-2 flex justify-between items-center",
          color,
          textColor
        )}
      >
        {title}
        <img
          src="/plus.svg"
          alt=""
          className="w-7 h-7 m-0 p-0 rotate-45"
          onClick={(e) => {
            e.target.parentNode.remove();
          }}
        />
      </div>
    </div>
  );
}
