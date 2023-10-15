import React, { useState } from 'react'
import { Header } from '../../components/NotePage/Header'
import { Menu } from '../../components/NotePage/Menu/Menu'

export const PlanForDay = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className='h-screen'>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
    </div>
  )
}
