import classNames from "classnames";
import PropTypes from "prop-types";
import styles from  "./MyEventComponent.module.css";

const MyEventComponent = (props) => {
  const { event, label } = props;

  return (
    <div className={classNames('rbc-addons-dnd-resizable', styles.content)}>
      <div className={styles.header}>
        {event.title}
      </div>

      <div className={styles.main}>
        <div className={styles.time}>
          {label}
        </div>

        <div className={styles.divider}></div>

        <div className={styles.teacher}>
          {event.teacher}
        </div>

        <div className={styles.info}>
          Аудитория - <span>{event.auditorium}</span>
        </div>

        <div className={styles.info}>
          Курс - <span>{event.courseNo}</span><br/>
          Группа - <span>{event.groupNo}</span>
        </div>
      </div>
    </div>
  );
};

MyEventComponent.propTypes = {
  event: PropTypes.object.isRequired,
  label: PropTypes.string,
}

export default MyEventComponent;