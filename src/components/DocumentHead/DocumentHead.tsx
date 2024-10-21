import React from "react";
import { DocumentHeadInterface } from "../../app/types";
import { useCreatePublicMutation } from "../../redux/api";

export const DocumentHead: React.FC<DocumentHeadInterface> = ({
  id,
  smile,
  noteName,
  closeMenu,
  resetWidth,
  noteNateRef,
  handleInput,
  isRead,
  isPublic
}) => {
  const [publish] = useCreatePublicMutation();

  const handlePublish = async () => {
    if (id) {
      await publish(id);
    }
  }

  const copyText = (text: string) => {
    navigator.clipboard.writeText(`http://localhost:3000/document/read/${text}`).then(() => {
      console.log('Текст скопирован');
    }).catch(err => {
      console.error('Не удалось скопировать текст: ', err);
    });
  }

  return (
    <div className="px-3 py-[10px]">
      <div className="flex items-center justify-between gap-3">
        <div>
        {closeMenu && (
          <div className="">
            <div
              className="w-6 h-6 rounded p-1 cursor-pointer flex items-center hover:bg-secondary-200 duration-200 ease-in"
              onClick={resetWidth}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                className="fill-secondary-400 rotate-180"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0,1.25 L14,1.25 L14,2.75 L0,2.75 L0,1.25 Z M0,6.25 L14,6.25 L14,7.75 L0,7.75 L0,6.25 Z M0,11.25 L14,11.25 L14,12.75 L0,12.75 L0,11.25 Z"></path>
              </svg>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {smile && <span className="cursor-default">{smile}</span>}
            <p
              className={`text-sm text-secondary-900 ${isRead ? 'cursor-default' : 'hover:bg-secondary-10'}0 px-2 py-1 rounded-md border-none outline-none`}
              ref={!isRead ? noteNateRef : null}
              contentEditable={!isRead ? true : false}
              onInput={() => {!isRead ? handleInput() : console.log('че за костыль 🙃')}}
            >
              {noteName}
            </p>
          </div>
        </div>
        </div>
        {!isRead && (
          <div>
            <div>
              {!isPublic ? (
                <button className="flex cursor-pointer text-sm font-normal text-secondary-550 items-center gap-2 hover:bg-secondary-100 rounded-md p-2 px-3 h-[36px] duration-200 ease-in"
                onClick={handlePublish}
              >Открыть доступ для чтения</button>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-sm font-normal text-secondary-550">Ссылка для просмотра:</p>
                  <div className="flex cursor-default items-center gap-2 bg-secondary-100 rounded-md p-2 px-3 h-[36px]">
                    <p className="text-sm font-normal text-secondary-550">http://localhost:3000/document/read/{id && id.slice(0,8)}...</p>
                    <button className="" onClick={() => copyText(id)}>
                      <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.9375 5H2.8125C2.66332 5 2.52024 5.05926 2.41475 5.16475C2.30926 5.27024 2.25 5.41332 2.25 5.5625V15.6875C2.25 15.8367 2.30926 15.9798 2.41475 16.0852C2.52024 16.1907 2.66332 16.25 2.8125 16.25H12.9375C13.0867 16.25 13.2298 16.1907 13.3352 16.0852C13.4407 15.9798 13.5 15.8367 13.5 15.6875V5.5625C13.5 5.41332 13.4407 5.27024 13.3352 5.16475C13.2298 5.05926 13.0867 5 12.9375 5ZM12.375 15.125H3.375V6.125H12.375V15.125ZM15.75 3.3125V13.4375C15.75 13.5867 15.6907 13.7298 15.5852 13.8352C15.4798 13.9407 15.3367 14 15.1875 14C15.0383 14 14.8952 13.9407 14.7898 13.8352C14.6843 13.7298 14.625 13.5867 14.625 13.4375V3.875H5.0625C4.91332 3.875 4.77024 3.81574 4.66475 3.71025C4.55926 3.60476 4.5 3.46168 4.5 3.3125C4.5 3.16332 4.55926 3.02024 4.66475 2.91475C4.77024 2.80926 4.91332 2.75 5.0625 2.75H15.1875C15.3367 2.75 15.4798 2.80926 15.5852 2.91475C15.6907 3.02024 15.75 3.16332 15.75 3.3125Z" fill="#37352F" fill-opacity="0.45" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
