import React, { useEffect, useRef, useState } from "react";
import { Editor } from "./Editor/Editor";
import { Smile } from "../../components/Notes/Smile/Smile";

import "./NoteContent.css";
import {
  useFetchUploadImageMutation,
  usePatchUpdateNoteMutation,
} from "../../redux/api";
import { PartialBlock } from "@blocknote/core";
import { DocumentHead } from "../DocumentHead/DocumentHead";

interface NoteContentInterface {
  imageUrl: string;
  name: string;
  smile: string;
  _id: string;
  blocks: PartialBlock[];
  isSelectNoteSuccess: boolean;
  resetWidth: any;
  closeMenu: boolean;
}

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
    }, 300);
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
                className="m-[1px] px-3 rounded-md bg-secondary-50 text-sm font-normal text-secondary-900 h-[34px] flex items-center justify-center hover:bg-secondary-100 duration-200 ease-in gap-1"
                onClick={handleOpenFile}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M19.5081 3.21109H5.50815C4.40515 3.21109 3.50815 4.10809 3.50815 5.21109V19.2111C3.50815 20.3141 4.40515 21.2111 5.50815 21.2111H19.5081C20.6111 21.2111 21.5081 20.3141 21.5081 19.2111V5.21109C21.5081 4.10809 20.6111 3.21109 19.5081 3.21109ZM5.50815 19.2111V5.21109H19.5081L19.5101 19.2111H5.50815Z"
                    fill="#333332"
                  />
                  <path
                    d="M10.5081 14.2111L9.50815 13.2111L6.50815 17.2111H18.5081L13.5081 10.2111L10.5081 14.2111Z"
                    fill="#333332"
                  />
                </svg>
                Изменить
              </button>
              <button
                className="m-[1px] px-3 rounded-md bg-secondary-50 text-sm font-normal text-secondary-900 h-[34px] flex items-center justify-center hover:bg-secondary-100 duration-200 ease-in gap-1"
                onClick={handleRemoveImg}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
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
                  className={`flex cursor-pointer text-sm font-normal text-secondary-800 items-center gap-2 border border-secondary-200 hover:bg-secondary-100 rounded-md p-2 px-3 h-[36px] duration-200 ease-in ${
                    smile ? "hidden" : ""
                  }`}
                  onClick={() => setShowEmoji(true)}
                >
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,26A102,102,0,1,0,230,128,102.1153,102.1153,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.10217,90.10217,0,0,1,128,218Zm46.77148-62.99951a54.02665,54.02665,0,0,1-93.543.001,5.99977,5.99977,0,1,1,10.38671-6.00878,42.20387,42.20387,0,0,0,20.03809,17.70556,41.95759,41.95759,0,0,0,46.04492-9.0039,42.18412,42.18412,0,0,0,6.68653-8.70264,5.99978,5.99978,0,1,1,10.38671,6.00879ZM82,108a10,10,0,1,1,10,10A10.01114,10.01114,0,0,1,82,108Zm72,0a10,10,0,1,1,10,10A10.01114,10.01114,0,0,1,154,108Z" />
                  </svg>
                  Добавить иконку
                </button>
                <button
                  className={`flex cursor-pointer text-sm font-normal text-secondary-800 items-center gap-2 border border-secondary-200 hover:bg-secondary-100 rounded-md p-2 px-3 h-[36px] duration-200 ease-in ${
                    imageUrl ? "hidden" : ""
                  }`}
                  onClick={handleOpenFile}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M19.5081 3.21109H5.50815C4.40515 3.21109 3.50815 4.10809 3.50815 5.21109V19.2111C3.50815 20.3141 4.40515 21.2111 5.50815 21.2111H19.5081C20.6111 21.2111 21.5081 20.3141 21.5081 19.2111V5.21109C21.5081 4.10809 20.6111 3.21109 19.5081 3.21109ZM5.50815 19.2111V5.21109H19.5081L19.5101 19.2111H5.50815Z"
                      fill="#333332"
                    />
                    <path
                      d="M10.5081 14.2111L9.50815 13.2111L6.50815 17.2111H18.5081L13.5081 10.2111L10.5081 14.2111Z"
                      fill="#333332"
                    />
                  </svg>
                  Добавить изображение
                </button>
                {showEmoji && (
                  <Smile
                    setShowEmoji={setShowEmoji}
                    selectEmoji={selectEmoji}
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
