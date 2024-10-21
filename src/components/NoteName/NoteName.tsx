import React from "react";
import { NoteNameInterface } from "../../app/types";

export const NoteName: React.FC<NoteNameInterface> = ({
  noteNateRef,
  handleInput,
  noteName,
  readOnly
}) => {
  return (
    <h1
      className="text-5xl font-bold text-secondary-950 leading-none border-none outline-none"
      ref={noteNateRef}
      contentEditable={readOnly ? false : true}
      onInput={handleInput}
    >
      {noteName}
    </h1>
  );
};
