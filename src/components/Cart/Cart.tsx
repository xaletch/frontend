import React, { useEffect, useRef, useState } from "react";
import {
  useFetchDeleteNoteMutation,
  useFetchRecoveryNoteMutation,
  useGetCartNotesQuery,
  useLazyGetSearchNotesCartQuery,
} from "../../redux/api";
import { Item } from "./Item";
import { CartInterface, CartItemsInterface } from "../../app/types";

export const Cart: React.FC<CartInterface> = ({ setOpenNoteCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [searchResponseItems, setSearchResponseItems] = useState([]);
  const [value, setValue] = useState<string>("");
  const typingTimer = useRef<any>(null);

  const { data: cart, isSuccess: cartSuccess } = useGetCartNotesQuery("");
  const [deleteNote] = useFetchDeleteNoteMutation();
  const [refetchNote] = useFetchRecoveryNoteMutation();
  const [
    search,
    {
      data,
      isLoading: searchDataLoading,
      isSuccess: searchDataSuccess,
    },
  ] = useLazyGetSearchNotesCartQuery();

  useEffect(() => {
    if (cartSuccess) {
      setCartItems(cart?.data);
    }
  }, [cartSuccess, cart?.data]);

  // ПОИСК ЗАМЕТОК
  const searchCartNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      search(event.target.value);
    }, 600);
  };

  useEffect(() => {
    if (searchDataSuccess) {
      setSearchResponseItems(data);
    }
  }, [searchDataSuccess, data]);

  // УДАЛНИЕ ЗАМЕТКИ ПО ID
  const handleDeleteNote = (id: string) => {
    deleteNote(id);
  };

  // ВОССТАНОВЛЕНИЕ ЗАМЕТКИ ПО ID
  const handleRecoveryNote = (id: string) => {
    refetchNote(id);
  };

  return (
    <div
      className="fixed w-full h-screen top-0"
      onClick={() => setOpenNoteCart(false)}
    >
      <div
        className="w-[500px] h-[300px] shadow-xl top-1/4 bg-secondary-50 rounded-xl relative left-2/4 transform -translate-x-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 h-full">
          <div
            className="absolute right-3 top-3 cursor-pointer z-[60]"
            onClick={() => setOpenNoteCart(false)}
          >
            <svg
              className="fill-secondary-300 hover:fill-secondary-400 duration-100 ease-in"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.41 8L15.71 1.71C15.8983 1.5217 16.0041 1.2663 16.0041 1C16.0041 0.733701 15.8983 0.478306 15.71 0.290002C15.5217 0.101699 15.2663 -0.00408936 15 -0.00408936C14.7337 -0.00408936 14.4783 0.101699 14.29 0.290002L8 6.59L1.71 0.290002C1.5217 0.101699 1.2663 -0.00408912 1 -0.00408912C0.733698 -0.00408912 0.478304 0.101699 0.29 0.290002C0.101696 0.478306 -0.0040915 0.733701 -0.0040915 1C-0.0040915 1.2663 0.101696 1.5217 0.29 1.71L6.59 8L0.29 14.29C0.196272 14.383 0.121877 14.4936 0.0711088 14.6154C0.0203401 14.7373 -0.00579834 14.868 -0.00579834 15C-0.00579834 15.132 0.0203401 15.2627 0.0711088 15.3846C0.121877 15.5064 0.196272 15.617 0.29 15.71C0.382963 15.8037 0.493564 15.8781 0.615423 15.9289C0.737282 15.9797 0.867988 16.0058 1 16.0058C1.13201 16.0058 1.26272 15.9797 1.38458 15.9289C1.50644 15.8781 1.61704 15.8037 1.71 15.71L8 9.41L14.29 15.71C14.383 15.8037 14.4936 15.8781 14.6154 15.9289C14.7373 15.9797 14.868 16.0058 15 16.0058C15.132 16.0058 15.2627 15.9797 15.3846 15.9289C15.5064 15.8781 15.617 15.8037 15.71 15.71C15.8037 15.617 15.8781 15.5064 15.9289 15.3846C15.9797 15.2627 16.0058 15.132 16.0058 15C16.0058 14.868 15.9797 14.7373 15.9289 14.6154C15.8781 14.4936 15.8037 14.383 15.71 14.29L9.41 8Z" />
            </svg>
          </div>
          <input
            className="outline-none w-full px-4 py-2 mt-3 rounded-lg bg-white-50 shadow-sm text-secondary-900 text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-secondary-300 placeholder:select-none"
            type="text"
            value={value}
            onChange={searchCartNote}
            placeholder="Поиск по корзине"
          />
          <div className="h-[73%] flex flex-col gap-2 mt-4 overflow-y-scroll scroll-smooth">
            {searchResponseItems?.map((obj: CartItemsInterface, index) => (
              <Item
                key={index}
                {...obj}
                handleDeleteNote={handleDeleteNote}
                handleRecoveryNote={handleRecoveryNote}
              />
            ))}
            {value.length === 0 &&
              cartItems?.map((obj: CartItemsInterface, index) => (
                <Item
                  key={index}
                  {...obj}
                  handleDeleteNote={handleDeleteNote}
                  handleRecoveryNote={handleRecoveryNote}
                />
              ))}
            {value.length > 0 &&
              searchResponseItems.length === 0 &&
              !searchDataLoading && (
                <div className="w-full flex items-center justify-center py-2">
                  <p className="text-sm text-secondary-900 font-normal">
                    Ничего не найдено
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
