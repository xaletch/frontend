import React from "react";
import { BgImageInterface } from "../../app/types";
import { useDispatch } from "react-redux";
import { setImage } from "../../redux/slice/editImage.slice";

export const BgImage: React.FC<BgImageInterface> = ({
  imageUrl,
  handleOpenFile,
  handleRemoveImg,
  isRead
}) => {
  const dispatch = useDispatch();

  const handleEditImage = (url: string) => {
    dispatch(setImage(url));
  };

  return (
    <div className="img relative w-full h-[300px] group top-0 z-0">
      <img
        className="absolute h-full w-full inset-0 object-cover"
        src={`http://localhost:8080/${imageUrl}`}
        alt={"background"}
      />
      {!isRead && <div className="button-img absolute z-10 bottom-3 right-6 flex gap-2">
        <button
          className="m-[1px] flex cursor-pointer text-xs font-normal text-secondary-500 items-center gap-2  bg-secondary-50 rounded-md p-2 px-3 h-[28px] duration-200 ease-in"
          onClick={() => handleEditImage(`http://localhost:8080/${imageUrl}`)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"
              stroke="rgba(55, 53, 47, 0.35)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z"
              stroke="rgba(55, 53, 47, 0.35)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 5L19 8"
              stroke="rgba(55, 53, 47, 0.35)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Редактировать
        </button>
        <button
          className="m-[1px] flex cursor-pointer text-xs font-normal text-secondary-500 items-center gap-2  bg-secondary-50 rounded-md p-2 px-3 h-[28px] duration-200 ease-in"
          onClick={handleOpenFile}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.88686 7.2744C5.21267 7.00349 5.54132 7.00349 5.87496 7.28224L5.95196 7.35211L9.50655 10.9067L9.57356 10.9659C9.71073 11.0722 9.88199 11.1248 10.0552 11.1139C10.2284 11.103 10.3917 11.0292 10.5144 10.9065C10.6371 10.7838 10.7109 10.6205 10.7218 10.4473C10.7327 10.2741 10.6801 10.1028 10.5738 9.96565L10.5146 9.89863L9.59352 8.97684L9.80169 8.76795L9.87726 8.70023C10.2031 8.42932 10.5317 8.42932 10.8654 8.70807L10.9424 8.77793L14.2745 12.1108C14.207 12.7897 13.8984 13.4219 13.4046 13.8927C12.9108 14.3634 12.2646 14.6416 11.5833 14.6766L11.4364 14.6801H2.88144C2.17416 14.6801 1.49214 14.4172 0.967807 13.9426C0.443471 13.4679 0.11424 12.8153 0.0440434 12.1115L4.8113 7.34213L4.88686 7.2744ZM11.4364 0.421875C12.168 0.421874 12.8717 0.703073 13.4018 1.20731C13.9319 1.71154 14.2479 2.40024 14.2845 3.13095L14.2881 3.27353V10.1068L11.9404 7.75989L11.8335 7.66222C10.9381 6.88158 9.80169 6.88016 8.9134 7.6501L8.80361 7.74991L8.58475 7.96806L6.95004 6.33407L6.8431 6.2364C5.94768 5.45576 4.8113 5.45433 3.92301 6.22428L3.81322 6.32409L0.0297852 10.1068V3.27353C0.0297846 2.54191 0.310983 1.83827 0.815219 1.30816C1.31945 0.77805 2.00815 0.462021 2.73886 0.42544L2.88144 0.421875H11.4364ZM9.30479 3.98644L9.21425 3.99143C9.04098 4.01204 8.88128 4.09549 8.76541 4.22596C8.64954 4.35643 8.58554 4.52486 8.58554 4.69936C8.58554 4.87385 8.64954 5.04229 8.76541 5.17276C8.88128 5.30323 9.04098 5.38667 9.21425 5.40728L9.29766 5.41227L9.3882 5.40728C9.56147 5.38667 9.72117 5.30323 9.83704 5.17276C9.95291 5.04229 10.0169 4.87385 10.0169 4.69936C10.0169 4.52486 9.95291 4.35643 9.83704 4.22596C9.72117 4.09549 9.56147 4.01204 9.3882 3.99143L9.30479 3.98644Z"
              fill="rgba(55, 53, 47, 0.35)"
            />
          </svg>
          Изменить
        </button>
        <button
          className="m-[1px] flex cursor-pointer text-xs font-normal text-secondary-500 items-center bg-secondary-50 rounded-md p-2 px-3 h-[28px] duration-200 ease-in"
          onClick={handleRemoveImg}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 mr-2"
            fill="rgba(55, 53, 47, 0.35)"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
          Удалить
        </button>
      </div>
      }
    </div>
  );
};
