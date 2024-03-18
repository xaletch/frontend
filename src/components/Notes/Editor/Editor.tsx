import React, { useEffect, useState } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

import "./Edirot.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
}

export const Editor = ({ onChange, initialContent }: EditorProps) => {
  const editor: BlockNoteEditor = useBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });

  return (
    <div>
      <BlockNoteView editor={editor} theme={"light"} />
    </div>
  );
};
