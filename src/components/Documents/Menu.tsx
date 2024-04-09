import React, { Dispatch, SetStateAction, RefObject } from "react";

import { Item } from "./Item";
import { useFetchCreateNotesMutation } from "../../redux/api";
import { NoteItem } from "../../interfaces/interfaces";
import { DocumentsInterface } from "../../interfaces/types";
import { useNavigate } from "react-router-dom";

interface MenuInterface {
  selectNoteId: string | undefined;
  username: string;
  isOpenNoteControl: boolean;
  setOpenNoteControl: Dispatch<SetStateAction<boolean>>;
  setOpenNoteCart: Dispatch<SetStateAction<boolean>>;
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
  setControlCords: Dispatch<SetStateAction<{ x: number; y: number }>>;
  note: DocumentsInterface[] | undefined;
  navbarRef: RefObject<HTMLDivElement>;
  setCloseMenu: Dispatch<SetStateAction<boolean>>;
  collapse: any;
  resetWidth: any;
}

export const Menu: React.FC<MenuInterface> = ({
  selectNoteId,
  username,
  setOpenNoteControl,
  setControlCords,
  isOpenNoteControl,
  setOpenNoteCart,
  setOpenSearch,
  note,
  navbarRef,
  collapse,
  resetWidth,
}) => {
  const navigate = useNavigate();

  const [createNote] = useFetchCreateNotesMutation();

  const handleCreateNote = async () => {
    try {
      const response = await createNote("");

      if ("data" in response && response.data) {
        const noteId = response.data.note._id;

        navigate(`/documents/${noteId}`);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleOpenCartMenu = () => {
    setOpenNoteCart((props) => !props);
  };

  const handleOpenSearchMenu = () => {
    setOpenSearch((props) => !props);
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-between pb-12 bg-secondary-150"
      ref={navbarRef}
    >
      <div
        className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize group-hover/sidebar:opacity-100 hover:bg-secondary-250 duration-200 ease-linear"
        onDoubleClick={resetWidth}
      ></div>
      <div>
        <div className="p-3 flex justify-between text-center">
          <div className="gap-2 flex items-center">
            <div className="w-[24px] h-[24px] bg-secondary-200 rounded-md flex justify-center items-center cursor-default">
              <span className="text-sm uppercase font-medium text-secondary-800">
                {username && username[0]}
              </span>
            </div>
            <span className="text-sm font-medium capitalize text-secondary-800">
              {username}
            </span>
          </div>
          <div
            className="p-1 cursor-pointer flex items-center rounded hover:bg-secondary-200 duration-200 ease-in"
            onClick={collapse}
          >
            <svg
              className="fill-secondary-400"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M7.07031 13.8887C7.2207 14.0391 7.40527 14.1211 7.62402 14.1211C8.06836 14.1211 8.41699 13.7725 8.41699 13.3281C8.41699 13.1094 8.32812 12.9043 8.17773 12.7539L3.37207 8.05762L8.17773 3.375C8.32812 3.21777 8.41699 3.0127 8.41699 2.80078C8.41699 2.35645 8.06836 2.00781 7.62402 2.00781C7.40527 2.00781 7.2207 2.08984 7.07031 2.24023L1.73828 7.44922C1.56055 7.62012 1.46484 7.8252 1.46484 8.06445C1.46484 8.29688 1.55371 8.49512 1.73828 8.67969L7.07031 13.8887ZM13.1748 13.8887C13.3252 14.0391 13.5098 14.1211 13.7354 14.1211C14.1797 14.1211 14.5283 13.7725 14.5283 13.3281C14.5283 13.1094 14.4395 12.9043 14.2891 12.7539L9.4834 8.05762L14.2891 3.375C14.4395 3.21777 14.5283 3.0127 14.5283 2.80078C14.5283 2.35645 14.1797 2.00781 13.7354 2.00781C13.5098 2.00781 13.3252 2.08984 13.1748 2.24023L7.84961 7.44922C7.66504 7.62012 7.57617 7.8252 7.56934 8.06445C7.56934 8.29688 7.66504 8.49512 7.84961 8.67969L13.1748 13.8887Z" />
            </svg>
          </div>
        </div>
        <div className="">
          <div
            className="p-1 px-3 flex items-center font-medium text-base cursor-pointer hover:bg-secondary-200"
            onClick={handleOpenSearchMenu}
          >
            <svg
              className="mr-2 fill-secondary-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 19 19"
              fill="none"
            >
              <path d="M8 16C9.77498 15.9996 11.4988 15.4054 12.897 14.312L17.293 18.708L18.707 17.294L14.311 12.898C15.405 11.4997 15.9996 9.77544 16 8C16 3.589 12.411 0 8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16ZM8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2Z" />
            </svg>
            <span className="text-secondary-400 text-sm font-medium">
              Поиск
            </span>
          </div>
          <div
            className="p-1 px-3 flex items-center font-medium text-base cursor-pointer hover:bg-secondary-200"
            onClick={handleCreateNote}
          >
            <svg
              className="mr-2 fill-secondary-400"
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.8 5H8.2V8.2H5V9.8H8.2V13H9.8V9.8H13V8.2H9.8V5Z" />
              <path d="M9 0C4.0374 0 0 4.0374 0 9C0 13.9626 4.0374 18 9 18C13.9626 18 18 13.9626 18 9C18 4.0374 13.9626 0 9 0ZM9 16.2C5.0301 16.2 1.8 12.9699 1.8 9C1.8 5.0301 5.0301 1.8 9 1.8C12.9699 1.8 16.2 5.0301 16.2 9C16.2 12.9699 12.9699 16.2 9 16.2Z" />
            </svg>
            <span className="text-secondary-400 text-sm font-medium">
              Новая страница
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 h-full flex flex-col justify-between overflow-hidden">
        <div className="h-[500px] overflow-auto">
          {note &&
            note.map((obj: NoteItem, index: any) => (
              <Item
                {...obj}
                selectNoteId={selectNoteId}
                isOpenNoteControl={isOpenNoteControl}
                setOpenNoteControl={setOpenNoteControl}
                setControlCords={setControlCords}
                key={index}
              />
            ))}
        </div>
        <div className="mt-4">
          {/* CREATE PAGE */}
          <div className="p-1 px-3 flex items-center font-medium text-base cursor-pointer hover:bg-secondary-200">
            <svg
              className="mr-3 fill-secondary-400"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path d="M14 6H8V0H6V6H0V8H6V14H8V8H14V6Z" />
            </svg>
            <span
              className="text-secondary-400 text-sm font-medium"
              // onClick={handleCreateNote}
            >
              Добавить страницу
            </span>
          </div>

          {/* BASKET */}
          <div
            className="p-1 px-3 flex items-center font-medium text-base cursor-pointer hover:bg-secondary-200"
            onClick={handleOpenCartMenu}
          >
            <svg
              className="mr-2 fill-secondary-400"
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.15 7.14474L13.85 16.225C13.8245 17.0027 13.4969 17.7398 12.9368 18.2799C12.3766 18.8199 11.6281 19.1205 10.85 19.1177H5.15002C4.37244 19.1205 3.62434 18.8204 3.0643 18.2809C2.50427 17.7415 2.17634 17.0051 2.15002 16.228L1.85002 7.14474C1.84346 6.94583 1.91618 6.75246 2.05219 6.60716C2.1882 6.46187 2.37636 6.37656 2.57527 6.36999C2.77418 6.36343 2.96756 6.43615 3.11285 6.57216C3.25814 6.70817 3.34346 6.89633 3.35002 7.09524L3.65002 16.1777C3.66496 16.5655 3.82956 16.9323 4.10927 17.2013C4.38897 17.4702 4.762 17.6203 5.15002 17.62H10.85C11.2385 17.6203 11.612 17.4698 11.8918 17.2002C12.1716 16.9306 12.3358 16.563 12.35 16.1747L12.65 7.09524C12.6566 6.89633 12.7419 6.70817 12.8872 6.57216C13.0325 6.43615 13.2259 6.36343 13.4248 6.36999C13.6237 6.37656 13.8118 6.46187 13.9479 6.60716C14.0839 6.75246 14.1566 6.94583 14.15 7.14474ZM15.1423 4.12299C15.1423 4.32191 15.0633 4.51267 14.9226 4.65332C14.7819 4.79398 14.5912 4.87299 14.3923 4.87299H1.60852C1.40961 4.87299 1.21884 4.79398 1.07819 4.65332C0.937538 4.51267 0.858521 4.32191 0.858521 4.12299C0.858521 3.92408 0.937538 3.73332 1.07819 3.59266C1.21884 3.45201 1.40961 3.37299 1.60852 3.37299H3.93352C4.17116 3.37363 4.40053 3.28584 4.57701 3.12669C4.75348 2.96754 4.86443 2.74843 4.88827 2.51199C4.94362 1.95736 5.20347 1.44319 5.61719 1.06967C6.03092 0.696156 6.56888 0.490043 7.12627 0.491493H8.87377C9.43116 0.490043 9.96912 0.696156 10.3828 1.06967C10.7966 1.44319 11.0564 1.95736 11.1118 2.51199C11.1356 2.74843 11.2466 2.96754 11.423 3.12669C11.5995 3.28584 11.8289 3.37363 12.0665 3.37299H14.3915C14.5904 3.37299 14.7812 3.45201 14.9219 3.59266C15.0625 3.73332 15.1415 3.92408 15.1415 4.12299H15.1423ZM6.19027 3.37299H9.81127C9.71272 3.1478 9.64826 2.90918 9.62002 2.66499C9.60144 2.48012 9.5149 2.30873 9.37717 2.18403C9.23944 2.05932 9.06032 1.99018 8.87452 1.98999H7.12702C6.94122 1.99018 6.7621 2.05932 6.62437 2.18403C6.48664 2.30873 6.4001 2.48012 6.38152 2.66499C6.35304 2.90922 6.28908 3.14784 6.19027 3.37299ZM6.94552 14.7362V8.34999C6.94552 8.15108 6.8665 7.96032 6.72585 7.81966C6.5852 7.67901 6.39443 7.59999 6.19552 7.59999C5.99661 7.59999 5.80584 7.67901 5.66519 7.81966C5.52454 7.96032 5.44552 8.15108 5.44552 8.34999V14.7392C5.44552 14.9382 5.52454 15.1289 5.66519 15.2696C5.80584 15.4102 5.99661 15.4892 6.19552 15.4892C6.39443 15.4892 6.5852 15.4102 6.72585 15.2696C6.8665 15.1289 6.94552 14.9382 6.94552 14.7392V14.7362ZM10.556 14.7362V8.34999C10.556 8.15108 10.477 7.96032 10.3363 7.81966C10.1957 7.67901 10.0049 7.59999 9.80602 7.59999C9.60711 7.59999 9.41634 7.67901 9.27569 7.81966C9.13504 7.96032 9.05602 8.15108 9.05602 8.34999V14.7392C9.05602 14.9382 9.13504 15.1289 9.27569 15.2696C9.41634 15.4102 9.60711 15.4892 9.80602 15.4892C10.0049 15.4892 10.1957 15.4102 10.3363 15.2696C10.477 15.1289 10.556 14.9382 10.556 14.7392V14.7362Z" />
            </svg>
            <span className="text-secondary-400 text-sm font-medium">
              Корзина
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
