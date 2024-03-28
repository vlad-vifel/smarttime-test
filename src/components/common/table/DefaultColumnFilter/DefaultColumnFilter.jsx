// const DefaultColumnFilter = ({
//   column: { filterValue, preFilteredRows, setFilter }
// }) => {
//   // const count = preFilteredRows.length
//   return (
//     <input
//       type='text'
//       value={filterValue || ''}
//       onChange={(e) => {
//         // установка фильтра в значение `undefined` приводит к удалению фильтра
//         setFilter(e.target.value || undefined)
//       }}
//       placeholder={`Поиск`}
//     />
//   )
// }

// export default DefaultColumnFilter;

import { useMemo, useState, useRef } from "react";
import useOutsideClick from "../../../../hooks/UseOutsideClick";
import styles from "./DefaultColumnFilter.module.css";
import UpArrowSmall from "../../../../assets/icons/up-arrow-small";
import DownArrowSmall from "../../../../assets/icons/down-arrow-small";
import Checkbox from "../../checkbox/Checkbox";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { setOpenFilter } from "../../../../store/workloadSlice";
import global_styles from "../../../../styles/global.module.css";

const DefaultColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  // Get unique values for the column
  const options = useMemo(() => {
    const optionsSet = new Set();
    preFilteredRows.forEach((row) => {
      optionsSet.add(row.values[id]);
    });
    return Array.from(optionsSet).sort();
  }, [id, preFilteredRows]);

  const [selectedValues, setSelectedValues] = useState(filterValue || []);
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const openFilter = useSelector((state) => state.workload.openFilter);
  const removeAllFilters = useSelector(
    (state) => state.global.removeAllFilters
  );
  const sidebarIsOpen = useSelector(
    (state) => state.global.sidebarIsOpen
  );

  const dropdownRef = useRef(null);
  const dispatcher = useDispatch();

  const table_container = document.getElementsByClassName("table_container")[0];

  const getCoords = () => {
    // const box = dropdownRef.current?.getBoundingClientRect();
    const box = table_container
      .getElementsByClassName(id)[0]
      .getBoundingClientRect();

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

  const setOptionsFilter = (filter) => {
    const newOptions = [];
    if (filter == "") {
      setFilteredOptions(options);
      return;
    }
    options.map((option) => {
      option.split(" ").map((optionWord) => {
        if (optionWord.toLowerCase().startsWith(filter.toLowerCase())) {
          newOptions.push(option);
        }
      });
    });
    setFilteredOptions(newOptions.sort());
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

  const submit = () => {
    setFilter(selectedValues.length > 0 ? selectedValues : undefined);
    close();
  };

  const toggle = () => {
    if (isVisible) {
      window.addEventListener("click", close);
    } else {
      setCoords(coords);
      dispatcher(setOpenFilter(id));
      setFilteredOptions(options);
    }
    setIsVisible(!isVisible);
  };

  // useOutsideClick(dropdownRef, close, isVisible);

  useEffect(() => {
    if (openFilter != id && isVisible) {
      toggle();
    }
  }, [openFilter, id]);



  useEffect(() => {
    if (!isVisible) return;

    const coords = getCoords();
    setCoords(coords);

    table_container.addEventListener("scroll", close);
    window.addEventListener("resize", close);

    return () => {
      table_container.removeEventListener("scroll", close);
      window.removeEventListener("resize", close);
    };
  }, [isVisible]);

  useEffect(() => {
    close();
  }, [sidebarIsOpen])

  useEffect(() => {
    setFilter(undefined);
  }, [removeAllFilters]);

  return (
    <div ref={dropdownRef} className={styles.dropdown_container}>
      <div className={styles.dropdown_trigger}>
        <button onClick={toggle}>
          {!isVisible && <DownArrowSmall />}
          {isVisible && <UpArrowSmall />}
        </button>
      </div>
      {isVisible &&
        coords &&
        createPortal(
          <div
            className={classNames(styles.dropdown_body, "dropdown_body")}
            style={{
              left: `${coords.left - 1}px`,
              top: `${coords.top}px`,
              width: `${coords.width + 2}px`,
            }}
          >
            <input
              className={styles.dropdown_search}
              type="text"
              onChange={(e) => {
                setOptionsFilter(e.target.value);
              }}
              placeholder={`Поиск`}
            />
            <div className={styles.dropdown_scroll}>
              {filteredOptions.map((option, i) => (
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

export default DefaultColumnFilter;
