import React, { useEffect, useState } from "react";

import "./styles/index.css";

import { Route, Routes } from "react-router-dom";

import { Home } from "../page/Home/Home";
import { Register } from "../page/Register/Register";
import { Login } from "../page/Login/Login";
import { Documents } from "../page/Documents/Documents";
import { NotFound } from "../page/NotFound/NotFound";
import { useLazyGetUserInfoQuery } from "../redux/api";
import { isAuth } from "./types";

function App() {
  const [username, setUsername] = useState<string>("");
  const [isUserDataSuccess, setUserDataSuccess] = useState<boolean>(false);
  const [
    userDataTrigger,
    { data: userData, isSuccess: isUserData, isLoading: isLoadingUserData },
  ] = useLazyGetUserInfoQuery();

  useEffect(() => {
    if (isUserData) {
      setUsername(userData?.username);
      setUserDataSuccess(true);
    }
  }, [isUserData, userData?.username, username, userDataTrigger]);

  useEffect(() => {
    if (isAuth) {
      userDataTrigger("");
    }
  }, [isAuth]);

  return (
    <div className="App font-body">
      <Routes>
        <Route
          path="/register"
          element={<Register userDataTrigger={userDataTrigger} />}
        />
        <Route
          path="/login"
          element={<Login userDataTrigger={userDataTrigger} />}
        ></Route>
        <Route
          path="/home"
          element={
            <Home
              username={username}
              isUserDataSuccess={isUserDataSuccess}
              setUserDataSuccess={setUserDataSuccess}
              userDataTrigger={userDataTrigger}
            />
          }
        ></Route>
        <Route
          path="/documents/:_id"
          element={<Documents username={username} />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route
          path="/documents"
          element={<Documents username={username} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
