import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

import "./Edirot.css";
import { EditorProps } from "../../../app/types";

export const Editor = ({ onChange, initialContent, isEditable }: EditorProps) => {
  let transformedInitialContent;
  if (initialContent && typeof initialContent === "string") {
    transformedInitialContent = JSON.parse(initialContent);
  }
  const editor: BlockNoteEditor = useBlockNote({
    initialContent: transformedInitialContent,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    editable: isEditable,
  });

  return (
    <div>
      <BlockNoteView editor={editor} theme={"light"} />
    </div>
  );
};
