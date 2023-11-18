import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterBlock = () => {
  return (
    <div className='w-[400px]'>
      <h2 className='text-5xl font-medium text-center mb-3'>Register</h2>
      <form>
        <input className='p-2 px-4 rounded-xl w-full border border-silver outline-none mb-2' type='text' placeholder='your name'></input>
        <input className='p-2 px-4 rounded-xl w-full border border-silver outline-none mb-2' type='email' placeholder='your @email.com'></input>
        <input className='p-2 px-4 rounded-xl w-full border border-silver outline-none mb-2' type='password' placeholder='password'></input>
        <button className='p-2 px-4 rounded-xl w-full border-none outline-none bg-dark text-white' type='submit'>Register</button>
      </form>
      <div className='pt-2 text-center text-dark'>
        <p>Already a member? <Link to={'/login'} className='underline decoration-solid'>Login</Link></p>
      </div>
    </div>
  )
}
