import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

import "./Edirot.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: PartialBlock[] | string;
}

export const Editor = ({ onChange, initialContent }: EditorProps) => {
  let transformedInitialContent;
  if (initialContent && typeof initialContent === "string") {
    transformedInitialContent = JSON.parse(initialContent);
  }
  const editor: BlockNoteEditor = useBlockNote({
    initialContent: transformedInitialContent,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });

  console.log("initialContent: ", initialContent);

  return (
    <div>
      <BlockNoteView editor={editor} theme={"light"} />
    </div>
  );
};
