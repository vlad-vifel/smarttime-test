import { Link } from "react-router-dom";
import StaticPage from "../common/staticPage/StaticPage";
import styles from "./Guides.module.css";
import global_styles from "../../../styles/global.module.css";
import classNames from "classnames";

const Guides = () => {
  return (
    <StaticPage>
      <div className={classNames(styles.body, global_styles.white_rounded_box)}>
        Выберите раздел
        <div className={classNames(styles.link_wrapper, global_styles.white_rounded_box)}>
          <Link
            className={classNames(styles.link)}
            to={"/guides/workload"}
          >
            Нагрузки
          </Link>
        </div>
        <div className={classNames(styles.link_wrapper, global_styles.white_rounded_box)}>
          <Link
            className={classNames(styles.link)}
            to={"/guides/auditorium"}
          >
            Аудитории
          </Link>
        </div>
      </div>
    </StaticPage>
  );
};

export default Guides;
