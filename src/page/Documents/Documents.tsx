import React, { useEffect, useState, useRef } from "react";
import { Menu } from "../../components/Documents/Menu";
import { NoteContent } from "../../components/Notes/NoteContent";
import { useParams } from "react-router-dom";
import { useGetNotesQuery, useLazyGetOneNoteQuery } from "../../redux/api";
import { Control } from "../../components/Notes/Control/Control";
import { Cart } from "../../components/Cart/Cart";
import { Search } from "../../components/Search/Search";
import { CreateNote } from "../../components/CreateNote/CreateNote";
import {
  DocumentsInterface,
  NoteDataInterface,
  Username,
} from "../../app/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSelectNoteData } from "../../redux/slice/noteData.slice";

export const Documents: React.FC<Username> = ({ username }) => {
  const { _id } = useParams();

  const dispatch = useDispatch();

  const { selectNoteData } = useSelector((state: RootState) => state.noteDataSlice)

  // const [selectNoteData, setSelectNoteData] = useState<NoteDataInterface>();
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
      dispatch(setSelectNoteData(noteData));
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

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;

      navbarRef.current.style.setProperty("left", `${newWidth}px`);
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

      sidebarRef.current.style.width = "240px";
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
    <div className="relative flex overflow-hidden">
      <div
        className={`bg-secondary-100 h-screen w-60 relative duration-300 ease-out ${
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
          sidebarRef={sidebarRef}
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
        className={`flex-1 overflow-y-scroll ${
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
            isPublic={selectNoteData?.isPublic || false}
          />
        )}
      </div>
    </div>
  );
};
