import React, { useEffect, useState } from "react";

import "./styles/index.css";

import { Route, Routes } from "react-router-dom";

import { Home } from "../page/Home/Home";
import { Register } from "../page/Register/Register";
import { Login } from "../page/Login/Login";
import { SelectNote } from "../page/Notes/SelectNote";
import { Documents } from "../page/Documents/Documents";
import { useDispatch } from "react-redux";
import { fetchNoteCart, fetchNotes } from "../redux/slice/noteSlice";
import { NotFound } from "../page/NotFound/NotFound";
import { useGetUserInfoQuery } from "../redux/api";
import { isAuth } from "../interfaces/interfaces";

function App() {
  const [username, setUsername] = useState<string>("");
  const {
    data: userData,
    isSuccess: isUserData,
    isLoading: isLoadingUserData,
    refetch: refetchUserData,
  } = useGetUserInfoQuery("");

  useEffect(() => {
    if (isAuth) {
      setUsername(userData?.username);
    }
  }, [isAuth, isUserData, userData?.username]);

  return (
    <div className="App font-body">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home username={username} />}></Route>
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
