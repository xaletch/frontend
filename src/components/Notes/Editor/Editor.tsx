import React, { useEffect, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

import "./Edirot.css";

interface PartialBlock {
  id?: string;
  type?: string;
  props?: Partial<{
    textColor: string;
    backgroundColor: string;
    textAlignment: string;
  }>;
  content?: Array<{
    type: string;
    text?: string;
    styles?: {};
  }>;
  children?: PartialBlock[];
}

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: PartialBlock[] | [];
}

export const Editor: React.FC<EditorProps> = ({ onChange, initialContent }) => {
  let transformedInitialContent;
  if (initialContent && typeof initialContent === "string") {
    transformedInitialContent = JSON.parse(initialContent);
  }
  const editor: BlockNoteEditor = useBlockNote({
    initialContent: transformedInitialContent,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
      console.log(editor);
    },
  });

  return (
    <div>
      <BlockNoteView editor={editor} theme={"light"} />
    </div>
  );
};
