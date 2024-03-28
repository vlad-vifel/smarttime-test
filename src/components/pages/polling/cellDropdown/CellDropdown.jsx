import { useEffect, useRef, useState } from "react";
import styles from "./CellDropdown.module.css";
import useOutsideClick from "../../../../hooks/UseOutsideClick.jsx";

import DownArrowSmall from "../../../../assets/icons/down-arrow-small.jsx";
import UpArrowSmall from "../../../../assets/icons/up-arrow-small.jsx";
import classNames from "classnames";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

const CellDropdown = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [coords, setCoords] = useState(null);

  const id = `r_${props.r}_c_${props.c}`;

  const dropdownRef = useRef(null);

  const getCoords = () => {
    const box = document.getElementsByClassName(id)[0].getBoundingClientRect();

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
  const table_container =
    document.getElementsByClassName("table_container")[props.tableNo];

  useEffect(() => {
    if (!isVisible) return;

    console.log(id);
    const coords = getCoords();
    setCoords(coords);

    table_container.addEventListener("scroll", close);
    props.isScrollPage ? scrollable.addEventListener("scroll", close) : null;
    window.addEventListener("resize", close);

    return () => {
      table_container.removeEventListener("scroll", close);
      props.isScrollPage
        ? scrollable.removeEventListener("scroll", close)
        : null;
      window.removeEventListener("resize", close);
    };
  }, [isVisible]);

  useEffect(() => {
    console.log("!!!!!");
    const coords = getCoords();
    setCoords(coords);
  }, [useSelector((state) => state.global.isFiltered)]);

  return (
    <div
      ref={dropdownRef}
      className={classNames(styles.dropdown_container, id)}
    >
      <div className={styles.dropdown_trigger}>
        <button
          onClick={toggle}
          className={classNames({
            [styles.center]: props.center,
          })}
        >
          {!value ? props.defaultOption || "Выберите опцию" : value}
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
              left: `${coords.left - 2 - 16}px`,
              top: `${coords.top + 12}px`,
              width: `${coords.width + 16 + 16 + 4}px`,
            }}
          >
            <div className={styles.dropdown_options}>
              {props.options.map((option, i) => (
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
