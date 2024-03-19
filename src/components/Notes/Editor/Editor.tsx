import React, { useEffect, useState } from "react";
import {
  BlockNoteEditor,
  PartialBlock,
  PartialInlineContent,
} from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

import "./Edirot.css";

interface Blocks {
  id: string;
  type: "paragraph" | "image";
  props: {
    textColor: string;
    backgroundColor: string;
    textAlignment: string;
  };
  content: string | PartialInlineContent[];
  children: Blocks[];
}

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: PartialBlock[];
}

export const Editor = ({ onChange, initialContent }: EditorProps) => {
  const editor: BlockNoteEditor = useBlockNote({
    initialContent: initialContent ? initialContent : [],
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
