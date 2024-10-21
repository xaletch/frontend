import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import styles from "./edit.module.css";

export const EditImage = () => {
  const { image } = useSelector((state: RootState) => state.editImage);

  const editRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<number>(50);
  // const [region, setRegion] = useState<{ top: number; height: number }>({
  //   top: 0,
  //   height: 0,
  // });

  const handleMouseDown = (e: { clientY: any }) => {
    const y = e.clientY;
    const start = editRef.current ? editRef.current.offsetTop : 0;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const deltaY = e.clientY - y;
      const parentElement = editRef.current?.parentElement as HTMLDivElement;
      if (parentElement) {
        const newTop = start + deltaY;
        const newTopPercent = (newTop / parentElement.offsetHeight) * 100;

        // Ограничиваем движение границами родительского блока
        if (newTopPercent >= 0 && newTopPercent <= 100) {
          setPosition(newTopPercent);
        }
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_block}>
        <div className={styles.modal_inner}>
          <div className={styles.edit_block}>
            <div className={styles.modal_image}>
              <img src={image} alt="edit_image" />
            </div>
            <div
              className={styles.image_edit}
              ref={editRef}
              onMouseDown={handleMouseDown}
              style={{ top: `${position}%` }}
            ></div>

            <div className={styles.preview_block}>
              <p>Position: {position}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
