import React from "react";
import { MenuHeadInterface } from "../../app/types";

export const MenuHead: React.FC<MenuHeadInterface> = ({
  username,
  collapse,
}) => {
  return (
    <div className="p-3 flex justify-between text-center">
      <div className="gap-2 flex items-center">
        <div className="w-[24px] h-[24px] bg-secondary-200 rounded-md flex justify-center items-center cursor-default">
          <span className="text-sm uppercase font-medium text-secondary-800">
            {username && username[0]}
          </span>
        </div>
        <span className="text-sm font-medium capitalize text-secondary-800">
          {username}
        </span>
      </div>
      <div
        className="p-1 cursor-pointer flex items-center rounded hover:bg-secondary-200 duration-200 ease-in"
        onClick={collapse}
      >
        <svg
          className="fill-secondary-400"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M7.07031 13.8887C7.2207 14.0391 7.40527 14.1211 7.62402 14.1211C8.06836 14.1211 8.41699 13.7725 8.41699 13.3281C8.41699 13.1094 8.32812 12.9043 8.17773 12.7539L3.37207 8.05762L8.17773 3.375C8.32812 3.21777 8.41699 3.0127 8.41699 2.80078C8.41699 2.35645 8.06836 2.00781 7.62402 2.00781C7.40527 2.00781 7.2207 2.08984 7.07031 2.24023L1.73828 7.44922C1.56055 7.62012 1.46484 7.8252 1.46484 8.06445C1.46484 8.29688 1.55371 8.49512 1.73828 8.67969L7.07031 13.8887ZM13.1748 13.8887C13.3252 14.0391 13.5098 14.1211 13.7354 14.1211C14.1797 14.1211 14.5283 13.7725 14.5283 13.3281C14.5283 13.1094 14.4395 12.9043 14.2891 12.7539L9.4834 8.05762L14.2891 3.375C14.4395 3.21777 14.5283 3.0127 14.5283 2.80078C14.5283 2.35645 14.1797 2.00781 13.7354 2.00781C13.5098 2.00781 13.3252 2.08984 13.1748 2.24023L7.84961 7.44922C7.66504 7.62012 7.57617 7.8252 7.56934 8.06445C7.56934 8.29688 7.66504 8.49512 7.84961 8.67969L13.1748 13.8887Z" />
        </svg>
      </div>
    </div>
  );
};
