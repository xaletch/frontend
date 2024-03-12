import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../../interfaces/interfaces";

interface HeaderInterface {
  isMenu: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>;
  username: string;
}

export const Header: React.FC<HeaderInterface> = ({
  isMenu,
  setMenu,
  username,
}) => {
  const openMenu = () => {
    setMenu(!isMenu);
  };

  return (
    <div className="container w-full mx-auto">
      <div className="py-6">
        <div className="flex justify-between items-center">
          <div className="">Kotion</div>
          <div className="">
            {isAuth ? (
              <div
                className="w-9 h-9 bg-secondary-100 rounded-md flex justify-center items-center cursor-pointer select-none"
                onClick={openMenu}
              >
                <span className="text-base uppercase font-medium text-secondary-800">
                  {username[0]}
                </span>
              </div>
            ) : (
              <ul className="flex items-center gap-4">
                <li>
                  <Link to="/login">
                    <div className="px-3 p-1 text-secondary-900 text-sm font-normal hover:bg-secondary-100 rounded duration-200 ease-in">
                      Log in
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <div className="px-3 p-1 text-secondary-50 text-sm font-normal bg-secondary-900 rounded hover:bg-secondary-800 duration-200 ease-in">
                      Get started
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
