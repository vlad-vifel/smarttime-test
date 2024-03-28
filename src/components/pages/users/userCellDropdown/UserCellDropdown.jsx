import { useEffect, useRef, useState } from "react";
import styles from "./UserCellDropdown.module.css";
import useOutsideClick from "../../../../hooks/UseOutsideClick.jsx";

import DownArrowSmall from "../../../../assets/icons/down-arrow-small.jsx";
import UpArrowSmall from "../../../../assets/icons/up-arrow-small.jsx";
import classNames from "classnames";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import Checkbox from "../../../common/checkbox/Checkbox.jsx";

const UserCellDropdown = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState(null);
  const [selectedValues, setSelectedValues] = useState(props.defaultOptions);
  const [selectedOptions, setSelectedOptions] = useState(props.defaultOptions);

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

  const handleCheckboxChange = (value, isChecked) => {
    let newSelectedValues = [...selectedValues];
    if (isChecked) {
      newSelectedValues = [...selectedValues, value];
    } else {
      newSelectedValues = selectedValues.filter((item) => item !== value);
    }
    setSelectedValues(newSelectedValues);
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

  const submit = () => {
    setSelectedOptions(selectedValues);
    close();
  };

  // useOutsideClick(dropdownRef, close, isVisible);

  const scrollable = document.getElementsByClassName("scrollable")[0];
  const table_container =
    document.getElementsByClassName("table_container")[props.tableNo];

  useEffect(() => {
    if (!isVisible) return;

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
          <div>
            {selectedOptions.length == 0 ? "Выберите опцию" : selectedOptions.join(", ")}
          </div>
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
                <div key={i}>
                  <Checkbox
                    value={option}
                    checked={selectedValues.includes(option)}
                    onChange={(e) =>
                      handleCheckboxChange(e.target.value, e.target.checked)
                    }
                  />
                </div>
              ))}
            </div>
            <button className={styles.dropdown_btn} onClick={submit}>
              Применить
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

export default UserCellDropdown;
