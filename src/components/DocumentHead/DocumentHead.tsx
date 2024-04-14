import React from "react";
import { DocumentHeadInterface } from "../../app/types";

export const DocumentHead: React.FC<DocumentHeadInterface> = ({
  smile,
  noteName,
  closeMenu,
  resetWidth,
  noteNateRef,
  handleInput,
}) => {
  return (
    <div className="px-3 py-[10px]">
      <div className="flex items-center gap-3">
        {closeMenu && (
          <div className="">
            <div
              className="w-6 h-6 rounded p-1 cursor-pointer flex items-center hover:bg-secondary-200 duration-200 ease-in"
              onClick={resetWidth}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                className="fill-secondary-400 rotate-180"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0,1.25 L14,1.25 L14,2.75 L0,2.75 L0,1.25 Z M0,6.25 L14,6.25 L14,7.75 L0,7.75 L0,6.25 Z M0,11.25 L14,11.25 L14,12.75 L0,12.75 L0,11.25 Z"></path>
              </svg>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {smile && <span className="cursor-default">{smile}</span>}
            <p
              className="text-sm text-secondary-900 hover:bg-secondary-100 px-2 py-1 rounded-md border-none outline-none"
              ref={noteNateRef}
              contentEditable={true}
              onInput={handleInput}
            >
              {noteName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
