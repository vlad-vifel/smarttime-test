import classNames from "classnames";
import global_styles from "../../../../styles/global.module.css"
import styles from "./Features.module.css"
import { useSelector } from "react-redux";


const Features = () => {
  const featuresInfo = useSelector(state => state.global.selectedEvent);
  const isSelected = Object.keys(featuresInfo).length !== 0;

  const features = [
    {
      title: "День проведения",
      info: new Date(featuresInfo.start).toLocaleDateString(),
    },
    {
      title: "Время начала",
      info: new Date(featuresInfo.start).toLocaleTimeString().slice(0, 5),
    },
    {
      title: "Время окончания",
      info: new Date(featuresInfo.end).toLocaleTimeString().slice(0, 5),
    },
    {
      title: "Название дисциплины",
      info: featuresInfo.title,
    },
    {
      title: "Формат экзамена",
      info: featuresInfo.format,
    },
    {
      title: "Преподаватели",
      info: featuresInfo.teacher,
    },
    {
      title: "Аудитория",
      info: featuresInfo.auditorium,
    },
    {
      title: "Образовательная программа",
      info: featuresInfo.op,
    },
    {
      title: "Курс",
      info: featuresInfo.courseNo,
    },
    {
      title: "Группа",
      info: featuresInfo.groupNo,
    },
    {
      title: "Предметная единица",
      info: "6",
    },
    {
      title: "Примечание",
      info: featuresInfo.note,
    },
  ]

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