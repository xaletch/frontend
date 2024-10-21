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
    isMenu && setMenu(false);
  };

  const handleLogout = () => {
    document.cookie =
      "access_token=; expires=Thu, 14 March 2024 00:00:00 UTC; path=/;";

    setMenu(false);

    setUserDataSuccess(false);

    userDataTrigger();
  };

  return (
    <div onClick={closeMenu}>
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
