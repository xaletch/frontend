import React from "react";
import { ControlButtonInterface } from "../../app/types";

export const ControlButtons: React.FC<ControlButtonInterface> = ({
  smile,
  setShowEmoji,
  handleOpenFile,
  imageUrl,
}) => {
  return (
    <>
      <button
        className={`flex cursor-pointer text-sm font-normal text-secondary-550 items-center gap-2 hover:bg-secondary-100 rounded-md p-2 px-3 h-[36px] duration-200 ease-in ${
          smile ? "hidden" : ""
        }`}
        onClick={() => setShowEmoji(true)}
      >
        <svg
          width="14"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 14"
          fill="rgba(55, 53, 47, 0.35)"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 0c3.861 0 7 3.139 7 7s-3.139 7-7 7-7-3.139-7-7 3.139-7 7-7zM3.561 5.295a1.027 1.027 0 1 0 2.054 0 1.027 1.027 0 0 0-2.054 0zm5.557 1.027a1.027 1.027 0 1 1 0-2.054 1.027 1.027 0 0 1 0 2.054zm1.211 2.816a.77.77 0 0 0-.124-1.087.786.786 0 0 0-1.098.107c-.273.407-1.16.958-2.254.958-1.093 0-1.981-.55-2.244-.945a.788.788 0 0 0-1.107-.135.786.786 0 0 0-.126 1.101c.55.734 1.81 1.542 3.477 1.542 1.668 0 2.848-.755 3.476-1.541z"
          />
        </svg>
        Добавить иконку
      </button>
      <button
        className={`flex cursor-pointer text-sm font-normal text-secondary-550 items-center gap-2 hover:bg-secondary-100 rounded-md p-2 px-3 h-[36px] duration-200 ease-in ${
          imageUrl ? "hidden" : ""
        }`}
        onClick={handleOpenFile}
      >
        <svg
          width="14"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 14"
          fill="rgba(55, 53, 47, 0.35)"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm0 12h10L8.5 5.5l-2 4-2-1.5L2 12z"
          />
        </svg>
        Добавить изображение
      </button>
    </>
  );
};
