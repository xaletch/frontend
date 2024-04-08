import React, { useEffect, useState, useRef } from "react";
import { Menu } from "../../components/Documents/Menu";
import { NoteContent } from "../../components/Notes/NoteContent";
import { useParams } from "react-router-dom";
import { useGetNotesQuery, useLazyGetOneNoteQuery } from "../../redux/api";
import { Control } from "../../components/Notes/Control/Control";
import { Cart } from "../../components/Cart/Cart";
import { Search } from "../../components/Search/Search";
import { DocumentsInterface } from "../../interfaces/types";
import { PartialBlock } from "@blocknote/core";
import { CreateNote } from "../../components/CreateNote/CreateNote";

interface User {
  username: string;
}

type NoteData = {
  _id: string;
  imageUrl: string;
  name: string;
  title: string;
  smile: string;
  createNote: string;
  user: User;
  blocks: PartialBlock[];
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
  const [note, setNote] = useState<DocumentsInterface[] | undefined>();

  const [selectNote, { data: noteData, isSuccess: isSelectNoteSuccess }] =
    useLazyGetOneNoteQuery();

  const { data: dataNote, isSuccess: isDataNoteSuccess } = useGetNotesQuery("");

  useEffect(() => {
    if (isDataNoteSuccess) {
      setNote(dataNote);
    }
  }, [isDataNoteSuccess, dataNote]);

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

  // МЕНЮ
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const navbarRef = useRef<HTMLDivElement>(null);
  const [closeMenu, setCloseMenu] = useState(false);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    if (newWidth < 224) newWidth = 224;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;

      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      // navbarRef.current.style.setProperty(
      //   "width",
      //   `calc(100% - ${newWidth}px)`
      // );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setCloseMenu(false);

      sidebarRef.current.style.width = "224px";
      navbarRef.current.style.setProperty("left", "240px");
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setCloseMenu(true);

      sidebarRef.current.style.width = "0";
      sidebarRef.current.style.overflow = "hidden";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
    }
  };

  return (
    <div className="relative flex">
      <div
        className={`bg-secondary-150 h-screen w-56 relative duration-300 ease-out ${
          closeMenu ? "" : ""
        }`}
        onMouseDown={handleMouseDown}
        onClick={() => {}}
        ref={sidebarRef}
      >
        <Menu
          selectNoteId={selectNoteId}
          username={username}
          setOpenNoteControl={setOpenNoteControl}
          setControlCords={setControlCords}
          isOpenNoteControl={isOpenNoteControl}
          setOpenNoteCart={setOpenNoteCart}
          setOpenSearch={setOpenSearch}
          note={note}
          navbarRef={navbarRef}
          setCloseMenu={setCloseMenu}
          collapse={collapse}
          resetWidth={resetWidth}
        />
      </div>
      {isOpenNoteControl && (
        <Control
          controlCords={controlCords}
          name={selectNoteData?.name || ""}
          _id={selectNoteData?._id || ""}
          username={username}
          createNote={selectNoteData?.createNote || ""}
          setOpenNoteControl={setOpenNoteControl}
        />
      )}
      {isOpenNoteCart && <Cart setOpenNoteCart={setOpenNoteCart} />}
      {isOpenSearch && <Search setOpenSearch={setOpenSearch} note={note} />}
      <div
        className={`flex-1 ${
          isOpenNoteCart || isOpenSearch ? "relative -z-50" : ""
        }`}
      >
        {note?.length === 0 && <CreateNote />}

        {isSelectNoteSuccess && _id && (
          <NoteContent
            imageUrl={selectNoteData?.imageUrl || ""}
            name={selectNoteData?.name || ""}
            smile={selectNoteData?.smile || ""}
            _id={selectNoteData?._id || ""}
            blocks={selectNoteData?.blocks || []}
            isSelectNoteSuccess={isSelectNoteSuccess}
            closeMenu={closeMenu}
            resetWidth={resetWidth}
          />
        )}
      </div>
    </div>
  );
};
