import React, { useEffect, useRef, useState } from "react";
import { Editor } from "./Editor/Editor";
import { Smile } from "../../components/Notes/Smile/Smile";

import "./NoteContent.css";
import {
  useFetchUploadImageMutation,
  usePatchUpdateNoteMutation,
} from "../../redux/api";
import { DocumentHead } from "../DocumentHead/DocumentHead";
import { NoteContentInterface } from "../../app/types";

export const NoteContent: React.FC<NoteContentInterface> = ({
  imageUrl,
  name,
  smile,
  _id,
  blocks,
  isSelectNoteSuccess,
  closeMenu,
  resetWidth,
}) => {
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [selectEmoji, setSelectEmoji] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [noteName, setNoteName] = useState<string>("");

  const fileRef = useRef<any>(null);

  const typingTimer = useRef<any>(null);
  const noteNateRef = useRef<HTMLHeadingElement>(null);
  const noteNateHeadRef = useRef<HTMLHeadingElement>(null);
  const cursorPos = useRef<number>(0);

  const typingTimerBlocks = useRef<any>(null);

  const handleOpenFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  // ЗАГРУЗКА КАРТИНОК
  const [
    uploadImage,
    { data: uploadImageResponse, isSuccess: uploadImageSuccess },
  ] = useFetchUploadImageMutation();

  const [updateNoteContent] = usePatchUpdateNoteMutation();

  const handleChange = async (event: any) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    uploadImage(formData);
  };

  useEffect(() => {
    if (uploadImageSuccess) {
      setImage(uploadImageResponse?.url);
      updateNoteContent({
        id: _id,
        data: { imageUrl: uploadImageResponse?.url },
      });
    }
  }, [uploadImageSuccess, uploadImageResponse]);

  const handleRemoveImg = async () => {
    updateNoteContent({
      id: _id,
      data: { imageUrl: "" },
    });
  };

  // СОХРАНЕНИЕ СМАЙЛИКА
  useEffect(() => {
    if (selectEmoji !== "") {
      updateNoteContent({
        id: _id,
        data: { smile: selectEmoji },
      });
      setSelectEmoji("");
    }
  }, [selectEmoji]);

  // УДАЛЕНИЕ СМАЙЛИКА
  const handleRemoveSmile = () => {
    updateNoteContent({
      id: _id,
      data: { smile: "" },
    });
  };

  // РЕДАКТИРОВАНИЕ ИМЕНИ ЗАМЕТКИ
  const [newNoteName] = usePatchUpdateNoteMutation();

  useEffect(() => {
    if (isSelectNoteSuccess) {
      setNoteName(name);
    }
  }, [isSelectNoteSuccess, name]);

  const handleInput = (e: React.ChangeEvent<HTMLHeadingElement>) => {
    const newName = e.target.innerText;
    setNoteName(newName);

    cursorPos.current = window.getSelection()?.focusOffset || 0;

    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      newNoteName({ id: _id, data: { name: newName } });
    }, 600);
  };

  useEffect(() => {
    if (noteNateRef.current && cursorPos.current > noteName.length) {
      cursorPos.current = noteName.length;
    }

    if (noteNateRef.current && cursorPos.current) {
      const sel = window.getSelection();
      const range = document.createRange();

      const position = Math.min(cursorPos.current, noteName.length);

      range.setStart(noteNateRef.current.childNodes[0], position);
      range.collapse(true);

      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [noteName]);

  // КОНТЕНТ ЗАМЕТКИ
  const [blocksUpdate] = usePatchUpdateNoteMutation();

  const onChange = (content: string) => {
    clearTimeout(typingTimerBlocks.current);
    typingTimerBlocks.current = setTimeout(() => {
      blocksUpdate({ id: _id, data: { blocks: content } });
    }, 300);
  };

  return (
    <div className="flex-1 h-screen relative z-0">
      <DocumentHead
        smile={smile}
        noteName={noteName}
        closeMenu={closeMenu}
        resetWidth={resetWidth}
        noteNateRef={noteNateHeadRef}
        handleInput={handleInput}
      />
      <div className="">
        {imageUrl && (
          <div className="img relative w-full h-[28vh] group top-0 z-0">
            <img
              className="absolute h-full w-full inset-0 object-cover"
              src={`http://localhost:8000/${imageUrl}`}
              alt={""}
            />
            <div className="button-img absolute z-10 bottom-3 right-6 flex gap-2">
              <button
                className="m-[1px] flex cursor-pointer text-xs font-normal text-secondary-500 items-center gap-2  bg-secondary-50 rounded-md p-2 px-3 h-[28px] duration-200 ease-in"
                onClick={handleOpenFile}
              >
                <svg
                  width="14"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
                  fill="rgba(55, 53, 47, 0.35)"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm0 12h10L8.5 5.5l-2 4-2-1.5L2 12z"
                  />
                </svg>
                Изменить
              </button>
              <button
                className="m-[1px] flex cursor-pointer text-xs font-normal text-secondary-500 items-center bg-secondary-50 rounded-md p-2 px-3 h-[28px] duration-200 ease-in"
                onClick={handleRemoveImg}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                  fill="rgba(55, 53, 47, 0.35)"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
                Удалить
              </button>
            </div>
          </div>
        )}
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto pb-12 pt-8">
          <div className="pl-14 manage-note">
            <div
              className={`text-7xl flex items-center gap-3 ${
                smile === "" ? "hidden" : ""
              }`}
            >
              <button>{smile}</button>
              {smile && (
                <button
                  className="p-3 border border-secondary-200 rounded-full hover:border-secondary-300 duration-200 ease-in"
                  onClick={handleRemoveSmile}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M10.192 0.343994L5.949 4.58599L1.707 0.343994L0.292999 1.75799L4.535 5.99999L0.292999 10.242L1.707 11.656L5.949 7.41399L10.192 11.656L11.606 10.242L7.364 5.99999L11.606 1.75799L10.192 0.343994Z"
                      fill="#6F6F6F"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="note-hover">
              <div className="note-setting py-4 flex gap-2 opacity-1 manage-note_btn relative">
                <button
                  className={`flex cursor-pointer text-sm font-normal text-secondary-550 items-center gap-2 hover:bg-secondary-100 rounded-md p-2 px-3 h-[36px] duration-200 ease-in ${
                    smile ? "hidden" : ""
                  }`}
                  onClick={() => setShowEmoji(true)}
                >
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                    fill="rgba(55, 53, 47, 0.35)"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 0c3.861 0 7 3.139 7 7s-3.139 7-7 7-7-3.139-7-7 3.139-7 7-7zM3.561 5.295a1.027 1.027 0 1 0 2.054 0 1.027 1.027 0 0 0-2.054 0zm5.557 1.027a1.027 1.027 0 1 1 0-2.054 1.027 1.027 0 0 1 0 2.054zm1.211 2.816a.77.77 0 0 0-.124-1.087.786.786 0 0 0-1.098.107c-.273.407-1.16.958-2.254.958-1.093 0-1.981-.55-2.244-.945a.788.788 0 0 0-1.107-.135.786.786 0 0 0-.126 1.101c.55.734 1.81 1.542 3.477 1.542 1.668 0 2.848-.755 3.476-1.541z"
                    />
                  </svg>
                  Добавить иконку
                </button>
                <button
                  className={`flex cursor-pointer text-sm font-normal text-secondary-550 items-center gap-2 hover:bg-secondary-100 rounded-md p-2 px-3 h-[36px] duration-200 ease-in ${
                    imageUrl ? "hidden" : ""
                  }`}
                  onClick={handleOpenFile}
                >
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                    fill="rgba(55, 53, 47, 0.35)"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm0 12h10L8.5 5.5l-2 4-2-1.5L2 12z"
                    />
                  </svg>
                  Добавить изображение
                </button>
                {showEmoji && (
                  <Smile
                    setShowEmoji={setShowEmoji}
                    setSelectEmoji={setSelectEmoji}
                  />
                )}
                <input
                  className="hidden"
                  type="file"
                  ref={fileRef}
                  onChange={handleChange}
                  accept="image/*, .png, .jpg, .gif, .web"
                />
              </div>
              <h1
                className="text-5xl font-bold text-secondary-900 leading-none border-none outline-none"
                ref={noteNateRef}
                contentEditable={true}
                onInput={handleInput}
              >
                {noteName}
              </h1>
            </div>
            <div>
              <div className="mt-2 ">
                <Editor key={_id} onChange={onChange} initialContent={blocks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
