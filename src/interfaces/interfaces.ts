import { Dispatch, SetStateAction } from "react";

export const isAuth = document.cookie
  ?.split("; ")
  .find((row) => row?.startsWith("access_token="));

interface TaskInterface {
  name: string;
}

export interface MenuInterface {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  setTasks: Dispatch<SetStateAction<TaskInterface[]>>;
  tasks: TaskInterface[];
  newTask: string;
}

export interface DataNotes {
  _id: string;
  notes: {
    _id: string;
    name: string;
    blocks: {
      id: string;
      type: string;
      props: {
        textColor: string;
        backgroundColor: string;
        textAlignment: string;
      };
      content: {
        type: string;
        text: string;
        styles: {};
      }[];
      children: any[];
    }[];
    user: string;
    __v: number;
  }[];
  __v: number;
}

export interface NoteItem {
  _id: string;
  name: string;
  smile: string;
}
