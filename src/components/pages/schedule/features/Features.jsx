import classNames from "classnames";
import global_styles from "../../../../assets/styles/global.module.css"
import styles from "./Features.module.css"
import { useState } from "react";

const features = [
  {
    title: "День проведения",
    info: "24.12.2023",
  },
  {
    title: "Время начала",
    info: "09:00",
  },
  {
    title: "Время окончания",
    info: "14:00",
  },
  {
    title: "Название дисциплины",
    info: "Информатика",
  },
  {
    title: "Формат экзамена",
    info: "Очный",
  },
  {
    title: "Преподаватели",
    info: "Иванов И.И.",
    // info: ["Востриков А.В.", "Иванов И.И."],
  },
  {
    title: "Аудитория",
    info: "504",
  },
  {
    title: "Тип аудитории",
    info: "Лекционная",
  },
  {
    title: "Образовательная программа",
    info: "Информационная безопасность",
  },
  {
    title: "Курс",
    info: "1",
  },
  {
    title: "Группа",
    info: "БИБ223",
  },
  {
    title: "Предметная единица",
    info: "6",
  },
]

const Features = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className={classNames(global_styles.white_rounded_box, styles.features)}>
      <div className={styles.header_area}>Свойства</div>
      {!isSelected && 
        <div className={styles.tip}>Для просмотра свойств выберите слот с экзаменом</div>
      }

      {isSelected && 
        <div className={styles.scroll_area}>
          {features.map((feature, i) => (
            <div key={i} className={styles.scroll_item}>
              <div className={styles.scroll_title}>{feature.title}:</div>
              <div className={styles.scroll_info}>{feature.info}</div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Features;