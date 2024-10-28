import React from "react";
import { Link } from "react-router-dom";
import { HeaderInterface } from "../../app/types";

export const Header: React.FC<HeaderInterface> = ({
  isMenu,
  setMenu,
  username,
  isUserDataSuccess,
}) => {
  const openMenu = () => {
    setMenu(!isMenu);
  };

  return (
    <div className="container w-full mx-auto relative z-10">
      <div className="py-6">
        <div className="flex justify-between items-center">
          <div className="">Kotion</div>
          <div className="">
            {isUserDataSuccess ? (
              <div
                className="w-9 h-9 bg-secondary-100 rounded-md flex justify-center items-center cursor-pointer select-none"
                onClick={openMenu}
              >
                <span className="text-base uppercase font-medium text-secondary-800">
                  {username && username[0]}
                </span>
              </div>
            ) : (
              <ul className="flex items-center gap-4">
                <li>
                  <Link to="/login">
                    <div className="px-3 p-1 text-secondary-900 text-sm font-medium hover:bg-secondary-100 rounded duration-200 ease-in">
                      Войти
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <div className="px-3 p-1 text-secondary-50 text-sm font-medium bg-secondary-900 rounded hover:opacity-90 duration-200 ease-in">
                      Попробовать
                    </div>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
