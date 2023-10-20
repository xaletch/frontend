import { Dispatch, SetStateAction } from "react";

interface TaskInterface { 
    name: string;
}

export interface MenuInterface {
    setMenuOpen: Dispatch<SetStateAction<boolean>>;
    setTasks: Dispatch<SetStateAction<TaskInterface[]>>;
    tasks: TaskInterface[];
    newTask: string;
};