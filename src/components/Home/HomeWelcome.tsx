import React from "react";
import { Link } from "react-router-dom";
import { HomeWelcomeInterface, isAuth } from "../../app/types";

export const HomeWelcome: React.FC<HomeWelcomeInterface> = ({
  isUserDataSuccess,
}) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center flex-col text-center mt-24">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-7xl max-lg:text-6xl font-bold max-lg:leading-[62px] leading-[76px] text-secondary-900 msx-md:text-5xl max-sm:text-4xl">
            Write, plan, share. <br /> With AI at your side.
          </h1>
          <p className="text-base font-normal text-secondary-700 max-sm:text-[10px] max-sm:leading-none">
            Name is the connected workspace where better, faster work happens.
          </p>
          <Link
            to={isUserDataSuccess || isAuth ? "/documents" : "/login"}
            className="mt-2 w-[160px]"
          >
            <button className="px-8 p-1 h-[34px] text-secondary-50 font-medium text-sm bg-secondary-900 rounded hover:bg-secondary-800 duration-300 max-sm:text-xs max-sm:px-6 max-sm:h-7">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
