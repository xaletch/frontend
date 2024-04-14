import React from "react";
import { HeaderTypes } from "../../../app/types";

export const Header: React.FC<HeaderTypes> = ({ menuOpen, name, smile }) => {
  return (
    <div
      className="flex-1 relative p-2 px-3"
      style={{
        width: `${menuOpen === true ? `calc(100%)` : `calc(100% - 240px)`}`,
        left: `${menuOpen === true ? `0` : `240px`}`,
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <p>{smile}</p>
          <button className="p-1 text-base font-normal rounded-md hover:bg-secondary-100 duration-200 ease-in">
            <span>{name}</span>
          </button>
        </div>
        <div className="flex items-center">...</div>
      </div>
    </div>
  );
};
