import { useGoBack } from "../../hooks/useGoBack";
import { Link } from "react-router-dom";

export const NotFound = () => {
  const goBack = useGoBack();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-9xl text-center font-bold">404</h1>
        <p className="mt-2 text-base">Страница не найдена:(</p>
        <div className="mt-8 flex gap-4">
          <button
            className="px-8 p-1 h-[34px] text-secondary-50 font-medium text-sm bg-secondary-900 rounded hover:opacity-90 duration-300 max-sm:text-xs max-sm:px-6 max-sm:h-7"
            onClick={goBack}
          >
            Вернуться назад
          </button>
          <Link
            to={"/home"}
            className="flex items-center px-8 p-1 h-[34px] text-secondary-50 font-medium text-sm bg-secondary-900 rounded hover:opacity-90 duration-300 max-sm:text-xs max-sm:px-6 max-sm:h-7"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};
