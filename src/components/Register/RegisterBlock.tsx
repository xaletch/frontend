import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useFetchRegisterMutation } from "../../redux/api";
import { RegistrationValue, UserDataTriggerInterface } from "../../app/types";

export const RegisterBlock = ({
  userDataTrigger,
}: UserDataTriggerInterface) => {
  const [redirect, setRedirect] = useState<boolean>(false);

  const [fetchRegister] = useFetchRegisterMutation();

  const setCookieWithExpiration = (
    cookieName: string,
    cookieValue: string,
    expHours: number
  ) => {
    const date = new Date();
    date.setTime(date.getTime() + expHours * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `${cookieName}=${cookieValue}; expires=${expires}; path=/;`;
  };

  const {
    register: registration,
    handleSubmit: handleSubmitReg,
    formState: { errors: errorsReg },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmitRegistration = async (value: RegistrationValue) => {
    try {
      const data = await fetchRegister(value);

      if ("data" in data) {
        if (data.data.access_token) {
          setCookieWithExpiration("access_token", data.data.access_token, 24);
          setRedirect(true);

          userDataTrigger();
        }
      }
    } catch (err) {
      console.log("При регистрации произошла ошибка: ", err);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-[400px]">
      <h2 className="text-4xl text-secondary-900 font-medium text-center mb-3">
        Регистрация
      </h2>
      <form onSubmit={handleSubmitReg(onSubmitRegistration)}>
        <input
          className={`${
            errorsReg?.username ? "border-primary-500" : "mb-2"
          } p-2 px-4 rounded-xl w-full text-base font-normal text-secondary-800 border border-secondary-800 outline-none placeholder:text-secondary-400 placeholder:font-normal placeholder:text-base`}
          type="text"
          placeholder="Введите ваше имя"
          {...registration("username", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 3,
              message: "Имя должно состоять не менее чем из 3 символов",
            },
          })}
        ></input>
        {errorsReg?.username && (
          <p className="text-sm pl-2 mb-2 text-primary-500">
            {errorsReg?.username?.message}
          </p>
        )}
        <input
          className={`${
            errorsReg?.email ? "border-primary-500" : "mb-2"
          } p-2 px-4 rounded-xl w-full text-base font-normal text-secondary-800 border border-secondary-800 outline-none placeholder:text-secondary-400 placeholder:font-normal placeholder:text-base`}
          type="email"
          placeholder="Ваш email"
          {...registration("email", {
            required: "Поле обязательно к заполнению",
          })}
        ></input>
        {errorsReg?.email && (
          <p className="text-sm pl-2 mb-2 text-primary-500">
            Поле обязательно к заполнению
          </p>
        )}
        <input
          className={`${
            errorsReg?.password ? "border-primary-500" : "mb-2"
          } p-2 px-4 rounded-xl w-full text-base font-normal text-secondary-800 border border-secondary-800 outline-none placeholder:text-secondary-400 placeholder:font-normal placeholder:text-base`}
          type="password"
          placeholder="Пароль"
          {...registration("password", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 8,
              message: "Пароль должен состоять не менее чем из 8 символов",
            },
          })}
        ></input>
        {errorsReg?.password && (
          <p className="text-sm pl-2 mb-2 text-primary-500">
            {errorsReg?.password?.message}
          </p>
        )}
        <button
          className="p-2 px-4 rounded-xl w-full border-none text-base font-normal outline-none bg-secondary-900 text-secondary-50 hover:opacity-90 duration-200 ease-in"
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
