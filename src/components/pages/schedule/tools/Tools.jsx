import classNames from "classnames";
import global_styles from "../../../../styles/global.module.css"
import styles from "./Tools.module.css"

import Download from "../../../../assets/icons/download.jsx"
import DropdownOrange from "./dropdown/DropdownOrange";
import Dropdown from "./dropdown/Dropdown";

const Tools = () => {
  const dropdown_orange = {
    options: 
    [
      "Пустые слоты",
      "Преподавателей",
      "Аудиторию",
      "Дисциплину",
      "Единицу контингента",
      "Формат экзамена",
    ],
  }
  const dropdowns = [
    {
      title: "Курс",
      options: 
      [
        "1", 
        "2", 
        "3", 
        "4", 
        "5",
      ]
    },
    {
      title: "Группа",
      options: 
      [
        "БИБ231", 
        "БИБ232", 
        "БИБ233", 
        "БИБ234", 
        "БИБ235", 
        "БИБ221", 
        "БИБ222", 
        "БИБ223", 
        "БИБ224",
      ]
    },
    {
      title: "Преподаватель",
      options: 
      [
        "Иванов Иван Иванович", 
        "Федоров Федо Федорович", 
        "Максимов Максим Максимович", 
        "Евгеньев Евгений Евгеньевич", 
        "Артемов Артем Артемович", 
        "Романов Роман Романович", 
        "Егоров Егор Егорович", 
        "Ильин Илья Ильич", 
        "Олегов Олег Олегович",
      ]
    },
    {
      title: "ОП",
      options: 
      [
        "ИБ", 
        "ИВТ", 
        "ПМ", 
        "ИТСС", 
        "КБ",
      ]
    },
    {
      title: "Дисциплина",
      options:
      [
        "1", 
        "2", 
        "3", 
        "4", 
        "5",
        "6", 
        "7", 
        "8", 
        "9", 
        "10",
      ]
    },
    {
      title: "Аудитория",
      options:
      [
        "101", 
        "102", 
        "103", 
        "104", 
        "105",
        "201", 
        "202", 
        "203", 
        "204", 
        "205",
        "301", 
        "302", 
        "303", 
        "304", 
        "305",
      ]
    },
  ]
  return (
    <div className={classNames(global_styles.white_rounded_box, styles.tools)}>
      <div className={styles.filters}>
        <DropdownOrange info={dropdown_orange}/>
        {dropdowns.map((info, i) => 
          <Dropdown key={i} info={info} />
        )}
      </div>
      <div className={styles.btns}>
        <button className={classNames(global_styles.btn_orange)}>
          <Download />
          Скачать расписание
        </button>
      </div>
    </div>
  ) 
}

export default Tools;