import React, { useEffect, useRef, useState } from "react";
import { Editor } from "./Editor/Editor";

import "./NoteContent.css";
import {
  useFetchUploadImageMutation,
  usePatchUpdateNoteMutation,
} from "../../redux/api";
import { DocumentHead } from "../DocumentHead/DocumentHead";
import { NoteContentInterface } from "../../app/types";
import { BgImage } from "../BgImage/BgImage";
import { SelectSmile } from "../SelectSmile/SelectSmile";
import { ControlButtons } from "../ControlButtons/ControlButtons";
import { NoteName } from "../NoteName/NoteName";
import { Smile } from "./Smile/Smile";

export const NoteContent: React.FC<NoteContentInterface> = ({
  imageUrl,
  name,
  smile,
  _id,
  blocks,
  isSelectNoteSuccess,
  closeMenu,
  resetWidth,
  isPublic
}) => {
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [selectEmoji, setSelectEmoji] = useState<string>("");
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
        id={_id}
        smile={smile}
        noteName={noteName}
        closeMenu={closeMenu}
        resetWidth={resetWidth}
        noteNateRef={noteNateHeadRef}
        handleInput={handleInput}
        isPublic={isPublic}
      />

      <div className="">
        {imageUrl && (
          <BgImage
            imageUrl={imageUrl}
            handleOpenFile={handleOpenFile}
            handleRemoveImg={handleRemoveImg}
          />
        )}
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto pb-12 pt-8">
          <div className="pl-14 manage-note">
            <SelectSmile smile={smile} handleRemoveSmile={handleRemoveSmile} />

            <div className="note-hover">
              <div className="note-setting py-4 flex gap-2 opacity-1 manage-note_btn relative">
                <ControlButtons
                  smile={smile}
                  setShowEmoji={setShowEmoji}
                  handleOpenFile={handleOpenFile}
                  imageUrl={imageUrl}
                />

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

              <NoteName
                noteNateRef={noteNateRef}
                handleInput={handleInput}
                noteName={noteName}
              />
            </div>

            <div>
              <div className="mt-2 ">
                <Editor key={_id} onChange={onChange} initialContent={blocks} isEditable={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
