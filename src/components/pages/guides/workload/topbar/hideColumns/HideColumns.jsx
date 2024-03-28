import { useState } from "react";
import DownArrowSmall from "../../../../../../assets/icons/down-arrow-small";
import UpArrowSmall from "../../../../../../assets/icons/up-arrow-small";
import styles from "./HideColumns.module.css";
import { useRef } from "react";
import useOutsideClick from "../../../../../../hooks/UseOutsideClick";
import Checkbox from "../../../../../common/checkbox/Checkbox";
import { useDispatch } from "react-redux";
import { setHiddenColumns } from "../../../../../../store/workloadSlice";

const columns = [
  {
    Header: "ID дисциплины",
    accessor: "id",
    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: "Дисциплина",
    accessor: "discipline",
    sortType: "string",
  },
  {
    Header: "Кафедра нагрузки",
    accessor: "workload_department",
    sortType: "string",
  },
  {
    Header: "Преподаватель",
    accessor: "teacher",
    sortType: "string",
  },
  {
    Header: "Кафедра преподавателя",
    accessor: "teacher_department",
    sortType: "string",
  },
  {
    Header: "Должность",
    accessor: "position",
    sortType: "string",
  },
  {
    Header: "Роль",
    accessor: "role",
    sortType: "string",
  },
  {
    Header: "Предметная единица",
    accessor: "subject_unit",
    sortType: "string",
  },
  {
    Header: "Курс",
    accessor: "course",
    sortType: "string",
  },
  {
    Header: "Группа",
    accessor: "group",
    sortType: "string",
  },
  {
    Header: "Модуль экзамена",
    accessor: "module",
    sortType: "string",
  },
  {
    Header: "Образовательная программа",
    accessor: "educational_program",
    sortType: "string",
  },
  {
    Header: "Количество студентов",
    accessor: "student_number",
    sortType: "string",
  },
  {
    Header: "Формат проведения",
    accessor: "format",
    sortType: "string",
  },
];

const options_name = [];
const options = [];
columns.map((column) => {
  options_name.push(column["Header"]);
  options.push(column["accessor"]);
});

const HideColumns = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const dispatcher = useDispatch();
  const dropdownRef = useRef(null);

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

  const close = () => {
    window.removeEventListener("click", close);
    setIsVisible(false);
  };

  const ready = () => {
    dispatcher(setHiddenColumns(selectedValues.length > 0 ? selectedValues : []))
    close();
  };

  const toggle = () => {
    if (isVisible) window.addEventListener("click", close);
    setIsVisible(!isVisible);
  };

  useOutsideClick(dropdownRef, close, isVisible);

  return (
    <div ref={dropdownRef} className={styles.dropdown_container}>
      <div className={styles.dropdown_trigger}>
        <button onClick={toggle}>
          Скрыть столбцы
          {!isVisible && <DownArrowSmall />}
          {isVisible && <UpArrowSmall />}
        </button>
      </div>
      {isVisible && (
        <div className={styles.dropdown_body}>
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
                  name={options_name[i]}
                  checked={selectedValues.includes(option)}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.value, e.target.checked)
                  }
                />
              </div>
            ))}
          </div>
          <button className={styles.dropdown_btn} onClick={ready}>
            Скрыть
          </button>
        </div>
      )}
    </div>
  );
};

export default HideColumns;
