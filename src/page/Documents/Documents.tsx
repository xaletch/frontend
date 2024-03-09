import React from "react";
import { Menu } from "../../components/Documents/Menu";

type DocType = {
  _id: string;
  name: string;
  smile: string;
};

type DocumentsType = {
  documents: DocType[];
};

export const Documents: React.FC = () => {
  return (
    <div className="relative">
      <Menu />
    </div>
  );
};
