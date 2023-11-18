import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from '../../axios';

export const RegisterBlock = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const data = { username, email, password };
      const loginData = await Axios.post('/user/register', data);
      console.log(loginData);
    }
    catch (err) {
      console.log('Данное имя или логин уже используется другим пользователем: \n', err)
    }
  };

  return (
    <div className='w-[400px]'>
      <h2 className='text-5xl font-medium text-center mb-3'>Register</h2>
      <form onSubmit={handleSubmit}>
        <input className='p-2 px-4 rounded-xl w-full border border-silver outline-none mb-2' type='text' value={username} onChange={(e: any) => setUsername(e.target.value)} placeholder='your name'></input>
        <input className='p-2 px-4 rounded-xl w-full border border-silver outline-none mb-2' type='email' value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder='your @email.com'></input>
        <input className='p-2 px-4 rounded-xl w-full border border-silver outline-none mb-2' type='password' value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder='password'></input>
        <button className='p-2 px-4 rounded-xl w-full border-none outline-none bg-dark text-white' type='submit'>Register</button>
      </form>
      <div className='pt-2 text-center text-dark'>
        <p>Already a member? <Link to={'/login'} className='underline decoration-solid'>Login</Link></p>
      </div>
    </div>
  )
}
