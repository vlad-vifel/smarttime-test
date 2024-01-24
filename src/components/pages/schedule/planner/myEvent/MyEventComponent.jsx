import classNames from "classnames"
import styles from  "./MyEventComponent.module.css"

const MyEventComponent = (props) => {
  return (
    <div className={classNames('rbc-addons-dnd-resizable', styles.content)}>
      <div className={styles.header}>
        {props.event.title}
      </div>

      <div className={styles.main}>
        <div className={styles.time}>
          {props.label}
        </div>

        <div className={styles.divider}></div>

        <div className={styles.teacher}>
          {props.event.teacher}
        </div>

        <div className={styles.info}>
          Аудитория - <span>{props.event.auditorium}</span><br/>
          Тип - <span>{props.event.type}</span>
        </div>

        <div className={styles.info}>
          Курс - <span>{props.event.courseNo}</span><br/>
          Группа - <span>{props.event.groupNo}</span>
        </div>
      </div>
    </div>
  );
};

export default MyEventComponent;