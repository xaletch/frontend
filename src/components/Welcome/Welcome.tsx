import React from "react";
import { Link } from "react-router-dom";
import { HomeWelcomeInterface } from "../../app/types";
import { isAuth } from "../../utils/isAuth";

export const Welcome: React.FC<HomeWelcomeInterface> = ({
  isUserDataSuccess,
}) => {
  return (
    <div className="container mx-auto h-custom">
      <div className="h-full flex justify-center flex-col text-center">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-7xl max-lg:text-6xl font-bold max-lg:leading-[62px] leading-[76px] text-secondary-900 msx-md:text-5xl max-sm:text-4xl">
            Откройте ваш личный <br /> архив мыслей и идей.
          </h1>
          <p className="text-base font-normal text-secondary-700 max-sm:text-[10px] max-sm:leading-none">
            Добро пожаловать в Kotion — ваш личный архив мыслей и идей. Здесь вы
            сможете <br /> работать более продуктивно и эффективно, создавая,
            организуя и делитесь своим творчеством.
          </p>
          <Link
            to={isUserDataSuccess || isAuth ? "/documents" : "/login"}
            className="mt-2 w-[160px]"
          >
            <button className="px-8 p-1 h-[34px] text-secondary-50 font-medium text-sm bg-secondary-900 rounded hover:opacity-90 duration-300 max-sm:text-xs max-sm:px-6 max-sm:h-7">
              Начать
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
