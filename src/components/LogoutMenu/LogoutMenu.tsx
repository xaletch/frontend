import React from "react";
import { LogoutMenuInterface } from "../../app/types";

export const LogoutMenu: React.FC<LogoutMenuInterface> = ({
  username,
  handleLogout,
}) => {
  return (
    <div
      className="home-menu absolute p-6 px-0 rounded-2xl bg-secondary-50"
      onClick={(e: any) => e.stopPropagation()}
    >
      <div className="flex flex-col">
        <div className="px-4 mb-2 flex gap-3 items-center">
          <div className="w-[44px] h-[44px] bg-secondary-100 rounded-md flex justify-center items-center select-none">
            <span className="text-lg uppercase font-medium text-secondary-700">
              {username[0]}
            </span>
          </div>
          <span className="text-base font-medium capitalize text-secondary-800">
            {username}
          </span>
        </div>
        <div>
          <button
            className="p-3 px-6 text-sm text-secondary-900 w-full flex items-center gap-3 hover:bg-secondary-100 duration-100 ease-in"
            onClick={handleLogout}
          >
            <div className="w-[44px] flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 15 16"
                className="w-[12px] h-[12px]"
              >
                <path
                  fill="rgba(103, 103, 103)"
                  d="M1 0a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V1a1 1 0 0 0-1-1Zm10.3 9.3a1 1 0 0 0 1.4 1.4l3-3a1 1 0 0 0 0-1.4l-3-3a1 1 0 1 0-1.4 1.4L12.58 6H5a1 1 0 1 0 0 2h7.59l-1.3 1.3Z"
                ></path>
              </svg>
            </div>
            <span>Выйти</span>
          </button>
        </div>
      </div>
    </div>
  );
};
