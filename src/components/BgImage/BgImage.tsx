import React from "react";
import { BgImageInterface } from "../../app/types";

export const BgImage: React.FC<BgImageInterface> = ({
  imageUrl,
  handleOpenFile,
  handleRemoveImg,
}) => {
  return (
    <div className="img relative w-full h-[28vh] group top-0 z-0">
      <img
        className="absolute h-full w-full inset-0 object-cover"
        src={`http://localhost:4000/${imageUrl}`}
        alt={""}
      />
      <div className="button-img absolute z-10 bottom-3 right-6 flex gap-2">
        <button
          className="m-[1px] flex cursor-pointer text-xs font-normal text-secondary-500 items-center gap-2  bg-secondary-50 rounded-md p-2 px-3 h-[28px] duration-200 ease-in"
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
          Изменить
        </button>
        <button
          className="m-[1px] flex cursor-pointer text-xs font-normal text-secondary-500 items-center bg-secondary-50 rounded-md p-2 px-3 h-[28px] duration-200 ease-in"
          onClick={handleRemoveImg}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 mr-2"
            fill="rgba(55, 53, 47, 0.35)"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
          Удалить
        </button>
      </div>
    </div>
  );
};
