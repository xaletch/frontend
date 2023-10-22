import React, { useState } from 'react'
import { Header } from '../../components/NotePage/Header'
import { Menu } from '../../components/NotePage/Menu/Menu'
import { NoteCreate } from '../../components/NotePage/NoteCreate/NoteCreate';
import { ManageNote } from '../../components/NotePage/ManageNote/ManageNote';

interface TaskInterface { 
  name: string;
}

export const PlanForDay = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Array<TaskInterface>>([]);
  const [newTask, setNewTask] = useState<string>("без названия");
  const [selectOpenTask, setSelectOpenTask] = useState<string>("");

  console.log(tasks.length)

  return (
    <div className='h-full'>
      {menuOpen && <Menu selectOpenTask={selectOpenTask} setSelectOpenTask={setSelectOpenTask} setMenuOpen={setMenuOpen} setTasks={setTasks} tasks={tasks} setNewTask={setNewTask} newTask={newTask} />}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} selectOpenTask={selectOpenTask} />
      {tasks.length !== 0 && <ManageNote menuOpen={menuOpen} selectOpenTask={selectOpenTask} />}
      {tasks.length <= 0 && <NoteCreate setMenuOpen={setMenuOpen} setTasks={setTasks} tasks={tasks} newTask={newTask} />}
    </div>
  )
}
