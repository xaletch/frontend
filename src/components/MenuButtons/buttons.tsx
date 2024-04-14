import React from "react";
import { ButtonProps } from "../../app/types";

export const Buttons: React.FC<ButtonProps> = ({ text, svg, handleClick }) => {
  return (
    <div
      className="p-1 px-3 flex items-center font-medium text-base cursor-pointer hover:bg-secondary-200"
      onClick={handleClick}
    >
      {svg}
      <span className="text-secondary-400 text-sm font-medium">{text}</span>
    </div>
  );
};
