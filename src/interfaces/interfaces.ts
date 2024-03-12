import { Dispatch, SetStateAction } from "react";

import { Note } from "./types";

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
  data: Note[];
}
