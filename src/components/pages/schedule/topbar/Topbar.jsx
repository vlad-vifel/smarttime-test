import styles from "./Topbar.module.css"
import Settings from "../../../../assets/icons/settings.jsx"
import Filter from "../../../../assets/icons/filter.jsx"
import SmallArrowOrange from "../../../../assets/icons/small-arrow-orange.jsx"
import classNames from "classnames"

const Topbar = () => {
  return (
    <div className={styles.main}>
      <button className={classNames(styles.button, styles.button_small)}>
        <Settings/>
      </button>
      <button className={styles.button}>
        <Filter/>
        Календарь
        <SmallArrowOrange/>
      </button>
      <button className={styles.button}>
        Аудиторный фонд
      </button>
    </div>
  );
};

export default Topbar;