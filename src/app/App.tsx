import React, { useEffect } from "react";

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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
    dispatch(fetchNoteCart());
  }, [dispatch]);

  return (
    <div className="App font-body">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/documents/:_id" element={<SelectNote />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/documents" element={<Documents />}></Route>
      </Routes>
    </div>
  );
}

export default App;
