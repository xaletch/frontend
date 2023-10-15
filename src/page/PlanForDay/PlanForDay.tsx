import React, { useState } from 'react'
import { Header } from '../../components/NotePage/Header'
import { Menu } from '../../components/NotePage/Menu/Menu'
import { NoteCreate } from '../../components/NotePage/NoteCreate/NoteCreate';

export const PlanForDay = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className='h-full'>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
      <NoteCreate />
    </div>
  )
}
