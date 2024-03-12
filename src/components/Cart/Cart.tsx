import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetCartNotesQuery } from "../../redux/api";
import { Note } from "../../interfaces/types";

export const Cart: React.FC = () => {
  const { data: cart } = useGetCartNotesQuery() as {
    data: Note[];
    success: boolean;
    message: string | null;
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-menu-bg z-[9999]">
      <div className="w-[400px] h-[300px] shadow-xl relative bg-white rounded-md">
        <div>
          <div className="mt-2 px-2">
            <input type="text" placeholder="Search..." />
          </div>
          <div>
            {/* {cart.map((item, index) => (
              <div className="" key={index}>
                <p>{item?.smile}</p>
                <p>{item?.name}</p>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};
