import React from "react";
import { NoteNameInterface } from "../../app/types";

export const NoteName: React.FC<NoteNameInterface> = ({
  noteNateRef,
  handleInput,
  noteName,
}) => {
  return (
    <h1
      className="text-5xl font-bold text-secondary-900 leading-none border-none outline-none"
      ref={noteNateRef}
      contentEditable={true}
      onInput={handleInput}
    >
      {noteName}
    </h1>
  );
};
