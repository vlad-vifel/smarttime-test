import { useEffect, useRef, useState } from "react";
import styles from "./DownloadTable.module.css";
import global_styles from "../../../styles/global.module.css";
import useOutsideClick from "../../../hooks/UseOutsideClick.jsx";

import classNames from "classnames";
import Download from "../../../assets/icons/download.jsx";
import RadioButtons from "../radiobuttons/RadioButtons.jsx";

const DownloadTable = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState(null);

  const dropdownRef = useRef(null);

  const getCoords = () => {
    const box = dropdownRef.current?.getBoundingClientRect();

    if (box) {
      return {
        left: box.left,
        top: box.top + box.height,
        width: box.width,
      };
    }

    return null;
  };

  const close = () => {
    window.removeEventListener("click", close);
    setIsVisible(false);
  };

  const toggle = () => {
    if (isVisible) window.addEventListener("click", close);
    setCoords(coords);
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (!isVisible) return;

    const coords = getCoords();
    setCoords(coords);
  }, [isVisible]);

  useOutsideClick(dropdownRef, close, isVisible);

  return (
    <div ref={dropdownRef} className={classNames(styles.dropdown_container)}>
      <div className={styles.dropdown_trigger}>
        <button
          className={classNames(global_styles.btn_orange)}
          onClick={toggle}
        >
          <Download />
          Скачать таблицу
        </button>
      </div>
      {isVisible && (
        <div
          className={classNames(
            global_styles.white_rounded_box,
            styles.dropdown_body
          )}
          style={
            coords
              ? {
                  width: `${coords.width}px`,
                }
              : {}
          }
        >
          Выберите формат
          <div className={styles.divider} />
          <div className={styles.dropdown_options}>
            <RadioButtons options={[".PDF", ".XLSX"]} vertical={true} />
          </div>
          <button
            className={classNames(global_styles.btn_orange)}
            onClick={close}
          >
            Сохранить
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadTable;
