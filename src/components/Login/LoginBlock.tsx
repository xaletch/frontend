import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Axios from '../../axios';

export const LoginBlock = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const data = {email, password};
      const loginData = await Axios.post('/user/login', data);
      console.log(loginData);
  
      if (loginData.statusText === 'OK') {
        setRedirect(true);
      }

      if ('token' in loginData.data) {
        window.localStorage.setItem('logged_in', loginData.data.token);
      };
    }
    catch (err) {
      console.log('При входе в аккаунт произошла ошибка: \n', err)
    }
  };

  if (redirect) {
    return <Navigate to='/frontend'/>
  }

  return (
    <div className='w-[400px]'>
      <h2 className='text-5xl font-medium text-center mb-3'>Login</h2>
      <form onSubmit={handleSubmit}>
        <input className='p-2 px-4 rounded-xl w-full border border-silver outline-none mb-2' type='email' value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder='your @email.com'></input>
        <input className='p-2 px-4 rounded-xl w-full border border-silver outline-none mb-2' type='password' value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder='password'></input>
        <button className='p-2 px-4 rounded-xl w-full border-none outline-none bg-dark text-white' type='submit'>Login</button>
      </form>
      <div className='pt-2 text-center text-dark'>
        <p>Don't have an account yet? <Link to={'/register'} className='underline decoration-solid'>Register</Link></p>
      </div>
    </div>
  )
}
