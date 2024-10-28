import React from "react";
import { Link } from "react-router-dom";
import { HomeWelcomeInterface } from "../../app/types";
import { isAuth } from "../../utils/isAuth";

export const Welcome: React.FC<HomeWelcomeInterface> = ({
  isUserDataSuccess,
}) => {
  return (
    <div className="container mx-auto h-custom relative z-10">
      <div className="h-full flex justify-center flex-col text-center">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-6xl max-lg:text-6xl font-bold text-secondary-900 leading-[1.1] msx-md:text-5xl max-sm:text-4xl">
            <span>Создавайте</span> и<span> организуйте</span>
            <br /> идеи легко в одном месте
          </h1>
          <p className="text-[18px] max-w-[580px] leading-[1.6] font-normal text-secondary-700">
            С Kotion вы сможете легко фиксировать свои мысли, писать текст,
            структурировать идеи и управлять проектами в одном месте
          </p>
          <Link
            to={isUserDataSuccess || isAuth ? "/documents" : "/login"}
            className="mt-4 "
          >
            <button className="px-12 p-1 h-[48px] text-secondary-50 font-medium text-lg bg-secondary-900 rounded hover:opacity-90 duration-300 max-sm:text-xs max-sm:px-6 max-sm:h-7">
              Попробовать
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
