import React from "react";
import { Link } from "react-router-dom";
import { SearchInterface, SearchItemsInterface } from "../../app/types";

export const Items: React.FC<SearchItemsInterface> = ({
  searchData,
  setOpenSearch,
  searchDataLoading,
  value,
  note,
}) => {
  return (
    <div className="h-[73%] flex flex-col gap-2 mt-4 overflow-y-scroll scroll-smooth">
      {searchData?.map((item: SearchInterface, index: any) => (
        <Link
          to={`/documents/${item._id}`}
          className="px-3 py-5 min-h-[40px] max-h-[40px] flex items-center justify-between rounded-lg bg-white-50 cursor-pointer relative shadow-sm overflow-hidden cart_menu-item"
          key={index}
          onClick={() => setOpenSearch(false)}
        >
          <>
            <div className="flex items-center relative z-50">
              {item?.smile && <div className="mr-1 text-sm">{item.smile}</div>}
              <div>
                <span className="text-sm text-secondary-900 font-medium">
                  {item.name && item.name.length > 20
                    ? `${item.name.slice(0, 20)}...`
                    : item.name}
                </span>
              </div>
            </div>
          </>
        </Link>
      ))}
      {searchDataLoading && (
        <div className="w-full flex items-center justify-center py-2">
          <p className="text-sm text-secondary-900 font-normal">
            Идет поиск...
          </p>
        </div>
      )}
      {value.length > 0 && searchData.length === 0 && (
        <div className="w-full flex items-center justify-center py-2">
          <p className="text-sm text-secondary-900 font-normal">
            Ничего не найдено
          </p>
        </div>
      )}
      {value.length === 0 &&
        note?.map((item: SearchInterface, index: any) => (
          <Link
            to={`/documents/${item._id}`}
            className="px-3 py-5 min-h-[40px] max-h-[40px] flex items-center justify-between rounded-lg bg-white-50 cursor-pointer relative shadow-sm overflow-hidden cart_menu-item"
            key={index}
            onClick={() => setOpenSearch(false)}
          >
            <>
              <div className="flex items-center relative z-50">
                {item?.smile && (
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
          </Link>
        ))}
    </div>
  );
};
