import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Axios from "../../axios";

export const RegisterBlock = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const data = { username, email, password };
      const loginData = await Axios.post("/user/register", data);
      console.log(loginData);

      if (loginData.statusText === "OK") {
        setRedirect(true);
      }

      if ("token" in loginData.data) {
        window.localStorage.setItem("logged_in", loginData.data.token);
      }
    } catch (err) {
      console.log(
        "Данное имя или логин уже используется другим пользователем: \n",
        err
      );
    }
  };

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="w-[400px]">
      <h2 className="text-4xl text-secondary-900 font-medium text-center mb-3">
        Регистрация
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          className="p-2 px-4 rounded-xl w-full text-base font-normal text-secondary-800 border border-secondary-800 outline-none mb-2 placeholder:text-secondary-400 placeholder:font-normal placeholder:text-base"
          type="text"
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
          placeholder="Введите ваше имя"
        ></input>
        <input
          className="p-2 px-4 rounded-xl w-full text-base font-normal text-secondary-800 border border-secondary-800 outline-none mb-2 placeholder:text-secondary-400 placeholder:font-normal placeholder:text-base"
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          placeholder="Ваш email"
        ></input>
        <input
          className="p-2 px-4 rounded-xl w-full text-base font-normal text-secondary-800 border border-secondary-800 outline-none mb-2 placeholder:text-secondary-400 placeholder:font-normal placeholder:text-base"
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          placeholder="Пароль"
        ></input>
        <button
          className="p-2 px-4 rounded-xl w-full border-none text-base font-normal outline-none bg-secondary-900 text-secondary-50 hover:bg-secondary-800 duration-200 ease-in"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="pt-2 text-center text-secondary-900 text-sm font-normal">
        <p>
          Уже зарегестрированы?{" "}
          <Link to={"/login"} className="underline decoration-solid">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
