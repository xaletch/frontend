import React, { useEffect, useState } from "react";
// import { Menu } from "../../components/Notes/Menu/Menu";
import { NoteContent } from "../../components/Notes/NoteContent";
import { useParams } from "react-router-dom";
import Axios from "../../axios";

import { Control } from "../../components/Notes/Control/Control";
import { Header } from "../../components/Notes/Header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Cart } from "../../components/Cart/Cart";
import { Menu } from "../../components/Documents/Menu";
import { useGetOneNoteMutation } from "../../redux/api";

interface User {
  username: string;
}

interface Blocks {
  id: string;
  type: string;
  props: {
    textColor: string;
    backgroundColor: string;
    textAlignment: string;
  };
  content: Array<{
    type: string;
    text?: string;
    styles?: {};
  }>;
  children: Blocks[];
}

type NoteData = {
  _id: string;
  imageUrl: string;
  name: string;
  title: string;
  smile: string;
  text: string;
  user: User;
  blocks: Blocks[];
};

export const SelectNote: React.FC = () => {
  const { _id } = useParams();

  const [selectNoteData, setSelectNoteData] = useState();

  const [selectNote, { data: noteData, isSuccess: isSelectNoteSuccess }] =
    useGetOneNoteMutation();

  useEffect(() => {
    if (_id && !selectNoteData) {
      selectNote(_id);
    }
  }, [_id, selectNoteData]);

  useEffect(() => {
    if (isSelectNoteSuccess) {
      setSelectNoteData(noteData);
    }
  }, [isSelectNoteSuccess, noteData]);

  console.log(selectNoteData);
  // const [menuOpen, setMenuOpen] = useState<boolean>(false);
  // const [isUpdate, setIsUpdate] = useState(false);
  // const [noteUpdate, setNoteUpdate] = useState(false);
  // const [isControl, setIsControl] = useState(false);
  // const [username, setUsername] = useState<string>("");
  // const [controlCords, setControlCords] = useState({ x: 0, y: 0 });

  // const { _id } = useParams();
  // const [selectNote, setSelectNote] = useState<NoteData>();
  // const [isName, setName] = useState(selectNote?.name);

  // console.log(_id);

  // useEffect(() => {
  //   const fetchNote = async () => {
  //     try {
  //       if (_id) {
  //         const { data } = await Axios.get("/notes/oneNote/" + _id);
  //         setSelectNote(data);
  //         setIsUpdate(false);
  //         setNoteUpdate(false);
  //         data.blocks = JSON.parse(data.blocks);
  //       }
  //     } catch (err) {
  //       console.log("Не удалось открыть заметку");
  //     }
  //   };
  //   fetchNote();
  // }, [_id, isUpdate, noteUpdate, isName]);

  // // OBTAINING USERNAME
  // useEffect(() => {
  //   const myAccount = async () => {
  //     try {
  //       const { data } = await Axios.get("/api/user/account");
  //       setUsername(data.username);
  //     } catch (err) {
  //       console.log(
  //         "При получении имени пользователя произошла ошибка: \n",
  //         err
  //       );
  //     }
  //   };
  //   myAccount();
  // }, []);

  return (
    <div className="relative">
      {/* <Menu /> */}
      {/* <Menu
        setMenuOpen={setMenuOpen}
        menuOpen={menuOpen}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        username={username}
        controlCords={controlCords}
        setControlCords={setControlCords}
        setIsControl={setIsControl}
      />
      <Header
        menuOpen={menuOpen}
        name={selectNote?.name}
        smile={selectNote?.smile}
      />
      <NoteContent
        imageUrl={selectNote?.imageUrl}
        name={selectNote?.name}
        smile={selectNote?.smile}
        _id={selectNote?._id}
        blocks={selectNote?.blocks}
        menuOpen={menuOpen}
        setNoteUpdate={setNoteUpdate}
        isName={isName}
        setName={setName}
        setIsControl={setIsControl}
      />
      {isControl && (
        <Control
          name={selectNote?.name}
          id={selectNote?._id}
          username={username}
          controlCords={controlCords}
          setIsControl={setIsControl}
        />
      )} */}
      {/* <Cart /> */}
    </div>
  );
};
