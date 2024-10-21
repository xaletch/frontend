import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetchLoginMutation } from "../../redux/api";
import { LoginValue, UserDataTriggerInterface } from "../../app/types";

export const LoginForm = ({ userDataTrigger }: UserDataTriggerInterface) => {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [isStatus, setStatus] = useState<number>();

  const [fetchLogin] = useFetchLoginMutation();

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
    register: login,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmitLogin = async (value: LoginValue) => {
    try {
      const data = await fetchLogin(value);

      if ("data" in data) {
        if (data.data.access_token) {
          setCookieWithExpiration("access_token", data.data.access_token, 24);
          setRedirect(true);

          userDataTrigger();
        }
      } else if ("error" in data) {
        const status = data.error;
        if ("status" in status) {
          status.status === 400 ? setStatus(400) : setStatus(0);
        }
      }
    } catch (err) {
      console.log("При регистрации произошла ошибка: ", err);
    }
  };

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="w-[400px]">
      <h2 className="text-4xl text-secondary-900 font-medium text-center mb-3">
        Авторизация
      </h2>
      <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
        <input
          className={` ${errorsLogin?.email ? "border-primary-500" : "mb-2"} ${
            isStatus === 400 ? "border-primary-500" : "mb-2"
          } p-2 px-4 rounded-xl w-full text-base font-normal text-secondary-800 border border-secondary-800 outline-none placeholder:text-secondary-400 placeholder:font-normal placeholder:text-base`}
          type="email"
          placeholder="Ваш email"
          {...login("email", {
            required: "Поле обязательно к заполнению",
          })}
        ></input>
        {errorsLogin?.email && (
          <p className="text-sm pl-2 mb-2 text-primary-500">
            Поле обязательно к заполнению
          </p>
        )}
        {isStatus === 400 && (
          <p className="text-sm pl-2 mb-2 text-primary-500">
            Неверный логин или пароль
          </p>
        )}
        <input
          className={`${
            errorsLogin?.password ? "border-primary-500" : "mb-2"
          } ${
            isStatus === 400 ? "border-primary-500" : "mb-2"
          } p-2 px-4 rounded-xl w-full text-base font-normal text-secondary-800 border border-secondary-800 outline-none placeholder:text-secondary-400 placeholder:font-normal placeholder:text-base`}
          type="password"
          placeholder="Пароль"
          {...login("password", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 8,
              message: "Пароль должен состоять не менее чем из 8 символов",
            },
          })}
        ></input>
        {errorsLogin?.password && (
          <p className="text-sm pl-2 mb-2 text-primary-500">
            {errorsLogin?.password?.message}
          </p>
        )}
        {isStatus === 400 && (
          <p className="text-sm pl-2 mb-2 text-primary-500">
            Неверный логин или пароль
          </p>
        )}
        <button
          className="p-2 px-4 rounded-xl w-full border-none text-base font-normal outline-none bg-secondary-900 text-secondary-50 hover:opacity-90 duration-200 ease-in"
          type="submit"
        >
          Войти
        </button>
      </form>
      <div className="pt-2 text-center text-secondary-900 text-sm font-normal">
        <p>
          У вас еще нет учетной записи?
          <Link to={"/register"} className="underline decoration-solid">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};
