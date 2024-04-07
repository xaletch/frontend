import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  // useRef,
  useState,
} from "react";
import {
  useFetchDeleteNoteMutation,
  useFetchRecoveryNoteMutation,
  useGetCartNotesQuery,
  // useGetSearchNotesMutation,
} from "../../redux/api";
import { CartItemInterface } from "../../interfaces/types";

interface CartInterface {
  setOpenNoteCart: Dispatch<SetStateAction<boolean>>;
}

export const Cart: React.FC<CartInterface> = ({ setOpenNoteCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [value, setValue] = useState<string>("");
  // const typingTimer = useRef<any>(null);

  const { data: cart, isSuccess: cartSuccess } = useGetCartNotesQuery("");
  const [deleteNote] = useFetchDeleteNoteMutation();
  const [refetchNote] = useFetchRecoveryNoteMutation();
  // const [search] = useGetSearchNotesMutation();

  useEffect(() => {
    if (cartSuccess) {
      setCartItems(cart?.data);
    }
  }, [cartSuccess, cart?.data]);

  // ПОИСК ЗАМЕТОК
  // const searchCartNote = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(event.target.value);

  //   clearTimeout(typingTimer.current);
  //   typingTimer.current = setTimeout(() => {
  //     search(value);
  //   }, 300);
  // };

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
            // onChange={searchCartNote}
            placeholder="Поиск по корзине"
          />
          <div className="h-[73%] flex flex-col gap-2 mt-4 overflow-y-scroll scroll-smooth">
            {cartItems?.map((item: CartItemInterface, index) => (
              <div
                className="px-3 py-5 min-h-[40px] max-h-[40px] flex items-center justify-between rounded-lg bg-white-50 cursor-default relative shadow-sm overflow-hidden cart_menu-item"
                key={index}
              >
                {/* {items?.notes.map((item, index) =>  */}
                <>
                  <div className="flex items-center relative z-50">
                    {item.smile && (
                      <div className="mr-1 text-sm">{item.smile}</div>
                    )}
                    <div>
                      <span className="text-sm text-secondary-900 font-medium">
                        {item.name && item.name.length > 20
                          ? `${item.name.slice(0, 20)}...`
                          : item.name}
                      </span>
                    </div>
                  </div>
                </>
                {/* ))} */}
                <div className="flex justify-end items-center absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-white-50 z-30 shadow-sm">
                  <div className="mr-3 flex items-center gap-2">
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white-50 hover:shadow-sm duration-200 ease-linear"
                      onClick={() => handleDeleteNote(item._id)}
                    >
                      <svg
                        width="14"
                        height="18"
                        viewBox="0 0 14 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.6375 6.38269L12.3625 14.7063C12.3391 15.4191 12.0388 16.0948 11.5253 16.5899C11.0119 17.085 10.3257 17.3605 9.61249 17.3579H4.38749C3.6747 17.3605 2.98894 17.0854 2.47558 16.5909C1.96222 16.0964 1.66161 15.4214 1.63749 14.709L1.36249 6.38269C1.35647 6.20036 1.42313 6.0231 1.54781 5.88991C1.67249 5.75673 1.84496 5.67852 2.0273 5.67251C2.20964 5.66649 2.3869 5.73315 2.52008 5.85783C2.65327 5.9825 2.73147 6.15498 2.73749 6.33732L3.01249 14.6629C3.02618 15.0184 3.17707 15.3546 3.43346 15.6012C3.68986 15.8477 4.0318 15.9853 4.38749 15.985H9.61249C9.96863 15.9852 10.311 15.8473 10.5674 15.6002C10.8239 15.3531 10.9745 15.0161 10.9875 14.6602L11.2625 6.33732C11.2685 6.15498 11.3467 5.9825 11.4799 5.85783C11.6131 5.73315 11.7903 5.66649 11.9727 5.67251C12.155 5.67852 12.3275 5.75673 12.4522 5.88991C12.5768 6.0231 12.6435 6.20036 12.6375 6.38269ZM13.5471 3.61276C13.5471 3.79509 13.4746 3.96996 13.3457 4.09889C13.2168 4.22782 13.0419 4.30026 12.8596 4.30026H1.14111C0.958777 4.30026 0.783908 4.22782 0.654977 4.09889C0.526046 3.96996 0.453613 3.79509 0.453613 3.61276C0.453613 3.43042 0.526046 3.25555 0.654977 3.12662C0.783908 2.99769 0.958777 2.92526 1.14111 2.92526H3.27236C3.4902 2.92584 3.70046 2.84536 3.86222 2.69948C4.02399 2.55359 4.1257 2.35274 4.14755 2.13601C4.19828 1.62759 4.43648 1.15627 4.81573 0.81388C5.19498 0.471489 5.68811 0.282552 6.19905 0.283881H7.80093C8.31187 0.282552 8.805 0.471489 9.18425 0.81388C9.5635 1.15627 9.80169 1.62759 9.85243 2.13601C9.87428 2.35274 9.97598 2.55359 10.1378 2.69948C10.2995 2.84536 10.5098 2.92584 10.7276 2.92526H12.8589C13.0412 2.92526 13.2161 2.99769 13.345 3.12662C13.4739 3.25555 13.5464 3.43042 13.5464 3.61276H13.5471ZM5.34105 2.92526H8.6603C8.56996 2.71883 8.51087 2.5001 8.48499 2.27626C8.46796 2.10679 8.38863 1.94968 8.26237 1.83537C8.13612 1.72106 7.97193 1.65767 7.80161 1.65751H6.19974C6.02942 1.65767 5.86523 1.72106 5.73898 1.83537C5.61272 1.94968 5.53339 2.10679 5.51636 2.27626C5.49026 2.50013 5.43163 2.71887 5.34105 2.92526ZM6.03336 13.3416V7.48751C6.03336 7.30517 5.96093 7.1303 5.832 7.00137C5.70307 6.87244 5.5282 6.80001 5.34586 6.80001C5.16353 6.80001 4.98866 6.87244 4.85973 7.00137C4.7308 7.1303 4.65836 7.30517 4.65836 7.48751V13.3443C4.65836 13.5267 4.7308 13.7015 4.85973 13.8305C4.98866 13.9594 5.16353 14.0318 5.34586 14.0318C5.5282 14.0318 5.70307 13.9594 5.832 13.8305C5.96093 13.7015 6.03336 13.5267 6.03336 13.3443V13.3416ZM9.34299 13.3416V7.48751C9.34299 7.30517 9.27055 7.1303 9.14162 7.00137C9.01269 6.87244 8.83782 6.80001 8.65549 6.80001C8.47315 6.80001 8.29828 6.87244 8.16935 7.00137C8.04042 7.1303 7.96799 7.30517 7.96799 7.48751V13.3443C7.96799 13.5267 8.04042 13.7015 8.16935 13.8305C8.29828 13.9594 8.47315 14.0318 8.65549 14.0318C8.83782 14.0318 9.01269 13.9594 9.14162 13.8305C9.27055 13.7015 9.34299 13.5267 9.34299 13.3443V13.3416Z"
                          fill="#e11d48"
                        />
                      </svg>
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white-50 hover:shadow-sm duration-200 ease-linear"
                      onClick={() => handleRecoveryNote(item._id)}
                    >
                      <svg
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.0417 0.500001C5.80002 0.383334 2.32502 3.78333 2.32502 8H0.833351C0.458351 8 0.275017 8.45 0.541684 8.70833L2.86668 11.0417C3.03335 11.2083 3.29168 11.2083 3.45835 11.0417L5.78335 8.70833C6.05002 8.45 5.85835 8 5.49168 8H3.99168C3.99168 4.75 6.64168 2.125 9.90835 2.16667C13.0084 2.20833 15.6167 4.81667 15.6584 7.91667C15.7 11.175 13.075 13.8333 9.82502 13.8333C8.48335 13.8333 7.24168 13.375 6.25835 12.6C5.92502 12.3417 5.45835 12.3667 5.15835 12.6667C4.80835 13.025 4.83335 13.6083 5.22502 13.9167C6.49168 14.9083 8.09168 15.5 9.82502 15.5C14.0334 15.5 17.4417 12.025 17.325 7.78333C17.2167 3.875 13.95 0.608334 10.0417 0.500001ZM9.61668 4.66667C9.27502 4.66667 8.99168 4.95 8.99168 5.29167V8.35833C8.99168 8.65 9.15002 8.925 9.40002 9.075L12 10.6167C12.3 10.7917 12.6834 10.6917 12.8584 10.4C13.0334 10.1 12.9334 9.71667 12.6417 9.54167L10.2417 8.11667V5.28333C10.2417 4.95 9.96668 4.66667 9.61668 4.66667Z"
                          fill="#1E293B"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
