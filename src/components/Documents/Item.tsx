import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DocInterface } from "../../interfaces/types";

export const Item: React.FC<DocInterface> = ({
  _id,
  name,
  smile,
  selectNoteId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenUnderNote = (i: string) => {
    if (i === _id) {
      setIsOpen(!isOpen);
    }
  };

  // const handleCreateNote = async () => {
  //   try {
  //     await Axios.post("/api/notes/save");
  //   } catch (err) {
  //     console.log("Не удалось создать заметку: \n", err);
  //   }
  // };

  // const handleSelectNote = () => {
  //   selectNote(_id);
  // };

  return (
    <div className="px-1">
      <Link to={`/documents/${_id}`}>
        <div
          className={`page p-1 px-3 h-8 flex items-center rounded justify-between text-base font-medium cursor-pointer hover:bg-secondary-250 relative ${
            _id === selectNoteId ? " bg-secondary-200" : ""
          }`}
          // onClick={handleSelectNote}
        >
          <div className="flex items-center">
            <div
              className="w-5 h-5 mr-1 rounded flex items-center justify-center hover:bg-secondary-300 duration-150 ease-linear"
              onClick={(e) => {
                e.preventDefault();
                handleOpenUnderNote(_id);
              }}
            >
              <svg
                className={`${isOpen} stroke-secondary-400`}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </div>
            {smile ? (
              <span className="mr-1 whitespace-nowrap text-sm">{smile}</span>
            ) : (
              <svg
                className="mr-2 fill-secondary-400"
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 16 20"
                fill="none"
              >
                <path d="M15.937 6.68C15.926 6.648 15.917 6.617 15.904 6.586C15.8566 6.47747 15.7902 6.37825 15.708 6.293L9.708 0.293C9.62275 0.210782 9.52353 0.144411 9.415 0.0969999C9.385 0.0829999 9.353 0.0749999 9.321 0.0639999C9.23733 0.0355262 9.15022 0.0183742 9.062 0.013C9.04 0.011 9.021 0 9 0H2C0.897 0 0 0.897 0 2V18C0 19.103 0.897 20 2 20H14C15.103 20 16 19.103 16 18V7C16 6.979 15.989 6.96 15.987 6.938C15.9819 6.85016 15.9651 6.7634 15.937 6.68ZM12.586 6H10V3.414L12.586 6ZM2 18V2H8V7C8 7.26522 8.10536 7.51957 8.29289 7.70711C8.48043 7.89464 8.73478 8 9 8H14L14.002 18H2Z" />
              </svg>
            )}
            <div className="flex">
              <span className="whitespace-nowrap text-sm font-medium text-secondary-400">
                {name.length >= 16 ? `${name.slice(0, 9)}...` : name}
              </span>
            </div>
          </div>
          <div className="setting flex items-center gap-2">
            {/* onClick={actionNote} */}
            <button
              className="w-4 h-4 flex justify-center items-center rounded hover:bg-secondary-300 duration-150 ease-linear"
              onClick={(e) => e.preventDefault()}
            >
              <svg
                className="fill-secondary-400"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="4"
                viewBox="0 0 16 4"
                fill="none"
              >
                <path d="M8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0Z" />
              </svg>
            </button>
            <button
              className="w-4 h-4 flex justify-center items-center rounded hover:bg-secondary-300 duration-150 ease-linear"
              onClick={(e) => {
                e.preventDefault();
                // handleCreateNote();
              }}
            >
              <svg
                className="fill-secondary-400"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path d="M14 6H8V0H6V6H0V8H6V14H8V8H14V6Z" />
              </svg>
            </button>
          </div>
        </div>
      </Link>
      {isOpen && (
        <p
          className="text-xs font-medium text-secondary-400"
          style={{ paddingLeft: "37px" }}
        >
          Нет страниц внутри
        </p>
      )}
    </div>
  );
};
