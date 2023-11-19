import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('logged_in');
  };

  return (
    <div className='p-4 px-6'>
      <div className='container'>
        <div className='flex justify-between items-center'>
          <div className='logo'>
            <h1>Logo</h1>
          </div>
          {!localStorage.getItem('logged_in') ?
            <div className='flex gap-4'>
              <Link to={'/login'}>
                <button className='p-2 px-4 rounded-md border border-dark'>Login</button>
              </Link>
              <Link to={'/register'}>
                <button className='p-2 px-4 rounded-md bg-dark text-white hover:opacity-90'>Register</button>
              </Link>
            </div>
          :
            <button className='p-2 px-4 rounded-md bg-dark text-white hover:opacity-90' onClick={handleLogout}>logout</button>
          }
        </div>
      </div>
    </div>
  )
}
