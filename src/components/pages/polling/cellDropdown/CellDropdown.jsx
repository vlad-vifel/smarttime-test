import { useEffect, useRef, useState } from "react";
import styles from "./CellDropdown.module.css";
import useOutsideClick from "../../../../hooks/UseOutsideClick.jsx";

import DownArrowSmall from "../../../../assets/icons/down-arrow-small.jsx";
import UpArrowSmall from "../../../../assets/icons/up-arrow-small.jsx";
import classNames from "classnames";
import { createPortal } from "react-dom";

// type Coords = {
//   left: number;
//   top: number;
//   width: number;
// };

const CellDropdown = ({ options }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(null);
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

  const changeValue = (e) => {
    setValue(e.target.value);
    close();
  };

  const close = () => {
    window.removeEventListener("click", close);
    setIsVisible(false);
  };

  const toggle = () => {
    if (isVisible) {
      window.addEventListener("click", close);
    } else {
      setCoords(coords);
    }
    setIsVisible(!isVisible);
  };

  useOutsideClick(dropdownRef, close, isVisible);

  const scrollable = document.getElementsByClassName("scrollable")[0];
  const table_container = document.getElementsByClassName("table_container")[1];

  useEffect(() => {
    if (!isVisible) return;

    const coords = getCoords();
    setCoords(coords);

    table_container.addEventListener("scroll", close);
    scrollable.addEventListener("scroll", close);
    window.addEventListener("resize", close);

    return () => {
      table_container.removeEventListener("scroll", close);
      scrollable.removeEventListener("scroll", close);
      window.removeEventListener("resize", close);
    };
  }, [isVisible]);

  return (
    <div ref={dropdownRef} className={styles.dropdown_container}>
      <div className={styles.dropdown_trigger}>
        <button onClick={toggle}>
          {!value ? "Выберите опцию" : value}
          {!isVisible && <DownArrowSmall />}
          {isVisible && <UpArrowSmall />}
        </button>
      </div>
      {isVisible &&
        coords &&
        createPortal(
          <div
            className={styles.dropdown_body}
            style={{
              left: `${coords.left - 12}px`,
              top: `${coords.top + 10}px`,
              width: `${coords.width + 24}px`,
            }}
          >
            <div className={styles.dropdown_options}>
              {options.map((option, i) => (
                <button
                  key={i}
                  className={classNames(styles.dropdown_option)}
                  onClick={changeValue}
                  value={option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CellDropdown;
