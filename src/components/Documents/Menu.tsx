import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Item } from "./Item";
import { useFetchCreateNotesMutation, useGetNotesQuery } from "../../redux/api";
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
}) => {
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const navbarRef = useRef<HTMLDivElement>(null);

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

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    if (newWidth < 224) newWidth = 224;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;

      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    // onClick={(e) => handleCords(e)}
    <div
      className="w-56 h-full flex flex-col pb-12 bg-secondary-150 fixed cursor-ew-resize group-hover/sidebar:opacity-100"
      onMouseDown={handleMouseDown}
      onClick={() => {}}
      ref={sidebarRef}
    >
      <div>
        <div className="p-3 flex justify-between text-center" ref={navbarRef}>
          <div className="gap-2 flex items-center">
            <div className="w-[24px] h-[24px] bg-secondary-200 rounded-md flex justify-center items-center">
              <span className="text-sm uppercase font-medium text-secondary-900">
                {username && username[0]}
              </span>
            </div>
            <span className="text-base font-medium capitalize text-secondary-800">
              {username}
            </span>
          </div>
          <div
            className="p-1 cursor-pointer flex items-center rounded hover:bg-secondary-200 duration-200 ease-in"
            // onClick={handleCloseMenu}
          >
            <svg
              className="fill-secondary-400"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 16 12"
              fill="none"
            >
              <path
                d="M0 0H16V2H0V0ZM4 5H16V7H4V5ZM9 10H16V12H9V10Z"
                fillOpacity="0.8"
              />
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
          <div className="p-1 px-3 flex items-center font-medium text-base cursor-pointer hover:bg-secondary-200">
            <svg
              className="mr-2 fill-secondary-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.01918 5.371e-05C8.08305 -0.00613255 7.22258 0.522515 6.80556 1.35872L6.41877 2.13235C6.26635 2.18896 6.1164 2.25096 5.96806 2.31777L5.14814 2.04444C4.26236 1.74874 3.27923 1.98318 2.62285 2.65024C1.97594 3.30778 1.75387 4.27582 2.04587 5.14858L2.31917 5.96698C2.25094 6.11638 2.18709 6.26732 2.12898 6.42093L1.35861 6.80615C0.523352 7.2228 -0.00678197 8.08251 6.55493e-05 9.01837C0.00681727 9.94106 0.533865 10.7827 1.35701 11.1938L2.13218 11.5838C2.189 11.7363 2.25079 11.8863 2.31758 12.0346L2.04587 12.853C1.75048 13.738 1.98415 14.7204 2.65002 15.3769C3.30699 16.0247 4.27501 16.2469 5.14814 15.9555L5.96646 15.6838C6.11566 15.7519 6.26696 15.8143 6.42037 15.8724L6.80556 16.6413C7.22258 17.4775 8.08305 18.0073 9.01918 17.9999C9.94161 17.9937 10.7835 17.4652 11.1944 16.6413L11.5796 15.8708C11.734 15.8136 11.8866 15.7515 12.0367 15.6838L12.8519 15.9555C13.725 16.2469 14.693 16.0248 15.35 15.3769C16.0162 14.72 16.2503 13.7368 15.9541 12.8514L15.6824 12.033C15.7503 11.8842 15.8132 11.7336 15.871 11.5806L16.6414 11.1938C17.4652 10.783 17.9932 9.94146 17.9999 9.01837C18.0068 8.08248 17.4766 7.2228 16.6414 6.80615L15.8678 6.41933C15.8109 6.26591 15.7494 6.11468 15.6824 5.96538L15.9541 5.14858V5.14698C16.2453 4.27463 16.0237 3.30738 15.3772 2.65024C14.7208 1.98305 13.7376 1.74883 12.8519 2.04444L12.0319 2.31777C11.8832 2.25003 11.7326 2.187 11.5796 2.12916L11.1944 1.35872C10.7836 0.534764 9.94165 0.00726073 9.01918 5.371e-05ZM9.00639 1.63684C9.31416 1.63922 9.59223 1.81377 9.73042 2.09079L10.2499 3.12977C10.2986 3.22749 10.3665 3.31447 10.4494 3.38557C10.5322 3.45667 10.6285 3.51046 10.7325 3.54376C11.0409 3.64213 11.3403 3.76554 11.6276 3.9146C11.7246 3.96508 11.8307 3.99561 11.9397 4.0044C12.0486 4.01318 12.1583 4.00004 12.2621 3.96575L13.3681 3.59811H13.3697C13.6678 3.49851 13.9915 3.57644 14.2104 3.79791C14.426 4.01722 14.4988 4.33709 14.4006 4.63069V4.63229L14.0346 5.73361C14.0005 5.83652 13.9871 5.94519 13.9954 6.05331C14.0036 6.16142 14.0332 6.26682 14.0825 6.36339C14.2298 6.65136 14.3519 6.95147 14.4485 7.2601C14.4815 7.36513 14.5352 7.46244 14.6067 7.54621C14.6781 7.62998 14.7656 7.69848 14.8641 7.74762L15.9094 8.27031C16.1905 8.41043 16.3656 8.69386 16.3633 9.00558C16.361 9.31273 16.1866 9.59144 15.9094 9.72967H15.9078L14.8689 10.2508C14.7715 10.2997 14.6848 10.3676 14.614 10.4505C14.5432 10.5334 14.4897 10.6296 14.4565 10.7335C14.3576 11.0419 14.2337 11.3413 14.0841 11.6286C14.0334 11.7258 14.0028 11.8322 13.994 11.9415C13.9852 12.0508 13.9985 12.1607 14.033 12.2648L14.4006 13.3693C14.5003 13.6672 14.4246 13.991 14.2024 14.2101C13.9834 14.426 13.6634 14.4999 13.3697 14.4019H13.3681L12.2669 14.0358C12.1638 14.0015 12.0548 13.988 11.9464 13.9963C11.838 14.0045 11.7323 14.0343 11.6356 14.0838C11.3472 14.2316 11.0481 14.3544 10.7389 14.4514C10.6339 14.4843 10.5366 14.5381 10.4528 14.6095C10.3691 14.6809 10.3006 14.7685 10.2515 14.867L9.73042 15.9092C9.59224 16.1863 9.31421 16.3607 9.00639 16.3631C8.69388 16.3656 8.40988 16.1905 8.26958 15.9092L7.75014 14.8718C7.70138 14.7741 7.63355 14.6871 7.55065 14.616C7.46775 14.5449 7.37147 14.4911 7.26746 14.4578C6.95862 14.3588 6.65853 14.2351 6.37082 14.0854C6.27362 14.0347 6.16723 14.004 6.05796 13.9952C5.94868 13.9865 5.83876 13.9997 5.73471 14.0342L4.63029 14.4019C4.33659 14.4999 4.01655 14.4266 3.79759 14.2101C3.57539 13.9911 3.49974 13.6672 3.5994 13.3693V13.3677L3.96541 12.2664C3.9995 12.1631 4.01268 12.0541 4.00417 11.9457C3.99566 11.8373 3.96564 11.7317 3.91586 11.635C3.76823 11.3476 3.64539 11.0481 3.54825 10.7399C3.51551 10.6354 3.46214 10.5386 3.39131 10.4551C3.32048 10.3717 3.23363 10.3033 3.1359 10.254L2.09222 9.72967H2.09062C1.81344 9.59141 1.63896 9.31289 1.63671 9.00558C1.63443 8.69386 1.8095 8.41052 2.09062 8.27031L3.1295 7.75082C3.22722 7.70205 3.31418 7.63421 3.38528 7.55131C3.45637 7.4684 3.51015 7.37211 3.54346 7.26809C3.6424 6.95971 3.76632 6.66027 3.91586 6.37298C3.96634 6.27598 3.99687 6.16986 4.00565 6.06087C4.01444 5.95188 4.0013 5.84223 3.96701 5.7384L3.5994 4.63229V4.63069C3.50118 4.33715 3.57398 4.01706 3.7896 3.79791C4.0085 3.57552 4.33225 3.49882 4.63029 3.59811L5.73311 3.96575C5.83625 4.00009 5.9452 4.01353 6.05359 4.0053C6.16199 3.99707 6.26766 3.96732 6.36443 3.91779C6.65192 3.77056 6.95133 3.64839 7.25947 3.55176C7.36449 3.51882 7.46179 3.46505 7.54555 3.39364C7.62931 3.32223 7.69781 3.23466 7.74695 3.13616L8.26958 2.09079C8.40987 1.80932 8.69388 1.6344 9.00639 1.63684ZM9.0032 4.90882C6.75316 4.90882 4.9068 6.74896 4.9068 8.99919C4.90678 11.2494 6.75315 13.0944 9.0032 13.0944C11.2532 13.0944 13.0916 11.2494 13.0916 8.99919C13.0916 6.74896 11.2532 4.90882 9.0032 4.90882ZM9.0032 6.54561C10.3687 6.54561 11.455 7.63354 11.455 8.99919C11.455 10.3648 10.3687 11.4576 9.0032 11.4576C7.63766 11.4576 6.54343 10.3648 6.54344 8.99919C6.54344 7.63354 7.63767 6.54561 9.0032 6.54561Z"
              />
            </svg>
            <span className="text-secondary-400 text-sm font-medium">
              Настройки
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
