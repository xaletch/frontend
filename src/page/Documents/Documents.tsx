import React, { useEffect, useState } from "react";
import { Menu } from "../../components/Documents/Menu";
import { NoteContent } from "../../components/Notes/NoteContent";
import { useParams } from "react-router-dom";
import { useGetOneNoteMutation } from "../../redux/api";
import { Control } from "../../components/Notes/Control/Control";
import { Cart } from "../../components/Cart/Cart";
import { Search } from "../../components/Search/Search";

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

interface UsernameInterface {
  username: string;
}

export const Documents: React.FC<UsernameInterface> = ({ username }) => {
  const { _id } = useParams();

  const [selectNoteData, setSelectNoteData] = useState<NoteData>();
  const [selectNoteId, setSelectNoteId] = useState<string>();
  const [controlCords, setControlCords] = useState({ x: 0, y: 0 });
  const [isOpenNoteControl, setOpenNoteControl] = useState<boolean>(false);
  const [isOpenNoteCart, setOpenNoteCart] = useState<boolean>(false);
  const [isOpenSearch, setOpenSearch] = useState<boolean>(false);

  const [selectNote, { data: noteData, isSuccess: isSelectNoteSuccess }] =
    useGetOneNoteMutation();

  useEffect(() => {
    if (_id && _id !== selectNoteId) {
      selectNote(_id);
    }
  }, [_id, selectNote, selectNoteId]);

  useEffect(() => {
    if (isSelectNoteSuccess) {
      setSelectNoteData(noteData);
      setSelectNoteId(noteData._id);
    }
  }, [isSelectNoteSuccess, noteData]);

  return (
    <div className="relative flex">
      <div className="bg-secondary-150 h-screen w-56 overflow-hidden">
        <Menu
          selectNoteId={selectNoteId}
          username={username}
          setOpenNoteControl={setOpenNoteControl}
          setControlCords={setControlCords}
          isOpenNoteControl={isOpenNoteControl}
          setOpenNoteCart={setOpenNoteCart}
          setOpenSearch={setOpenSearch}
        />
      </div>
      {isOpenNoteControl && (
        <Control
          controlCords={controlCords}
          name={selectNoteData?.name || ""}
          _id={selectNoteData?._id || ""}
          username={username}
          setOpenNoteControl={setOpenNoteControl}
        />
      )}
      {isOpenNoteCart && <Cart setOpenNoteCart={setOpenNoteCart} />}
      {isOpenSearch && (
        <Search setOpenSearch={setOpenSearch} _id={selectNoteData?._id || ""} />
      )}
      <div
        className={`flex-1 ${
          isOpenNoteCart || isOpenSearch ? "relative -z-50" : ""
        }`}
      >
        <NoteContent
          imageUrl={selectNoteData?.imageUrl || ""}
          name={selectNoteData?.name || ""}
          smile={selectNoteData?.smile || ""}
          _id={selectNoteData?._id || ""}
          blocks={selectNoteData?.blocks || []}
          isSelectNoteSuccess={isSelectNoteSuccess}
        />
      </div>
    </div>
  );
};
