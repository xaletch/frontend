/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DocInterface, NoteItem } from "../../app/types";
import { useFetchCreateSubNoteMutation } from "../../redux/api";

export const Item: React.FC<DocInterface> = ({
  _id,
  name,
  smile,
  selectNoteId,
  isOpenNoteControl,
  setOpenNoteControl,
  setControlCords,
  subnotes,
  l,
}) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [createSubNote] = useFetchCreateSubNoteMutation();

  const handleCreateSubNote = async (id: string) => {
    try {
      const response = await createSubNote(id);

      setIsOpen(true);

      if ("data" in response && response.data) {
        const noteId = response.data.note._id;

        navigate(`/documents/${noteId}`);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleOpenUnderNote = (i: string) => {
    if (i === _id) {
      setIsOpen(!isOpen);
    }
  };

  const handleClickWindow = (e: any) => {
    const x = e.clientX;
    const y = e.clientY;
    setControlCords({ x, y });

    setOpenNoteControl(!isOpenNoteControl);
  };

  return (
    <div className="" key={_id}>
      <Link to={`/documents/${_id}`}>
        <div
          className={`page p-1 px-3 h-8 flex items-center rounded justify-between text-base font-medium cursor-pointer hover:bg-secondary-250 relative ${
            _id === selectNoteId ? " bg-secondary-200" : ""
          }`}
          style={{ paddingLeft: `${l === 0 ? "" : l * 8 + 16}px` }}
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
                className={`${
                  isOpen ? "rotate-90" : ""
                } stroke-secondary-450 duration-200 ease-in-out`}
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
            ) : subnotes.length > 0 ? (
              <svg
                className="mr-2 fill-secondary-450"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703ZM10.4336 9.00098H5.42969C5.16992 9.00098 4.98535 9.19238 4.98535 9.43164C4.98535 9.67773 5.16992 9.86914 5.42969 9.86914H10.4336C10.6797 9.86914 10.8643 9.67773 10.8643 9.43164C10.8643 9.19238 10.6797 9.00098 10.4336 9.00098ZM10.4336 11.2979H5.42969C5.16992 11.2979 4.98535 11.4893 4.98535 11.7354C4.98535 11.9746 5.16992 12.1592 5.42969 12.1592H10.4336C10.6797 12.1592 10.8643 11.9746 10.8643 11.7354C10.8643 11.4893 10.6797 11.2979 10.4336 11.2979Z"></path>
              </svg>
            ) : (
              <svg
                className="mr-2 fill-secondary-450"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703Z" />
              </svg>
            )}
            <div className="flex overflow-hidden">
              <span className="whitespace-nowrap text-sm font-medium text-secondary-400">
                {name.length >= 16 ? `${name.slice(0, 12)}...` : name}
              </span>
            </div>
          </div>
          <div className="setting flex items-center gap-2">
            <button
              className="w-4 h-4 flex justify-center items-center rounded hover:bg-secondary-300 duration-150 ease-linear"
              onClick={handleClickWindow}
            >
              <svg
                className="fill-secondary-450"
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
                handleCreateSubNote(_id);
              }}
            >
              <svg
                className="fill-secondary-450"
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
        <>
          {subnotes.length > 0 ? (
            subnotes.map((obj: NoteItem, index: any) => (
              <Item
                {...obj}
                selectNoteId={selectNoteId}
                isOpenNoteControl={isOpenNoteControl}
                setOpenNoteControl={setOpenNoteControl}
                setControlCords={setControlCords}
                key={index}
                l={l + 1}
              />
            ))
          ) : (
            <>
              <p
                className="text-xs font-medium text-secondary-450 cursor-default"
                style={{ paddingLeft: "37px" }}
              >
                Нет страниц внутри
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
};
