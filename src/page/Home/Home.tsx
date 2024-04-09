import React, { Dispatch, SetStateAction, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";

import "./home.css";
import { isAuth } from "../../interfaces/interfaces";

interface UsernameInterface {
  username: string;
  isUserDataSuccess: boolean;
  setUserDataSuccess: Dispatch<SetStateAction<boolean>>;
  userDataTrigger: any;
}

export const Home: React.FC<UsernameInterface> = ({
  username,
  isUserDataSuccess,
  setUserDataSuccess,
  userDataTrigger,
}) => {
  const [isMenu, setMenu] = useState<boolean>(false);

  const closeMenu = () => {
    isMenu && setMenu(false);
  };

  const handleLogout = () => {
    document.cookie =
      "access_token=; expires=Thu, 14 March 2024 00:00:00 UTC; path=/;";

    setMenu(false);
    setUserDataSuccess(false);
  };

  return (
    <div onClick={closeMenu}>
      <Header
        isMenu={isMenu}
        setMenu={setMenu}
        username={username}
        isUserDataSuccess={isUserDataSuccess}
      />
      {/* <Cart /> */}
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
      {isMenu && (
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
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
