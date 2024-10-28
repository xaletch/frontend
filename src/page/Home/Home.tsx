import React, { useState } from "react";
import { Header } from "../../components/Header/Header";

import "./home.css";
import { HomeInterface } from "../../app/types";
import { LogoutMenu } from "../../components/LogoutMenu/LogoutMenu";
import { Welcome } from "../../components/Welcome/Welcome";

export const Home: React.FC<HomeInterface> = ({
  username,
  isUserDataSuccess,
  setUserDataSuccess,
  userDataTrigger,
}) => {
  const [isMenu, setMenu] = useState<boolean>(false);

  const closeMenu = () => {
<<<<<<< HEAD
    if (isMenu) setMenu(false);
=======
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isMenu && setMenu(false);
>>>>>>> 272834f (home page)
  };

  const handleLogout = () => {
    document.cookie =
      "access_token=; expires=Thu, 14 March 2024 00:00:00 UTC; path=/;";

    console.log("logout");

    setMenu(false);

    setUserDataSuccess(false);

    userDataTrigger();
  };

  return (
    <div onClick={closeMenu} className="bg-home">
      <div className="bg-shadow"></div>
      <div className="shadow shadow-1"></div>
      <div className="shadow shadow-2"></div>
      
      <Header
        isMenu={isMenu}
        setMenu={setMenu}
        username={username}
        isUserDataSuccess={isUserDataSuccess}
      />

      <Welcome isUserDataSuccess={isUserDataSuccess} />

      {isMenu && <LogoutMenu username={username} handleLogout={handleLogout} />}
    </div>
  );
};
