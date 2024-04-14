import React from "react";
import { SmileInterface } from "../../app/types";

export const SelectSmile: React.FC<SmileInterface> = ({
  smile,
  handleRemoveSmile,
}) => {
  return (
    <div
      className={`text-7xl flex items-center gap-3 ${
        smile === "" ? "hidden" : ""
      }`}
    >
      <button>{smile}</button>
      {smile && (
        <button
          className="p-3 border border-secondary-200 rounded-full hover:border-secondary-300 duration-200 ease-in"
          onClick={handleRemoveSmile}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M10.192 0.343994L5.949 4.58599L1.707 0.343994L0.292999 1.75799L4.535 5.99999L0.292999 10.242L1.707 11.656L5.949 7.41399L10.192 11.656L11.606 10.242L7.364 5.99999L11.606 1.75799L10.192 0.343994Z"
              fill="#6F6F6F"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
