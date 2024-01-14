import classNames from "classnames";
import styles from "./Schedule.module.css"

import global_styles from "../../../assets/styles/global.module.css"
import Tools from "./tools/Tools";
import Features from "./features/Features";
import Planner from "./planner/Planner";

const Schedule = () => {
  return (
    <div className={styles.page}>
      <Tools />
      <div className={styles.main}>
        <Planner />
        
        <div className={styles.right}>
          <Features />
          <div className={classNames(global_styles.white_rounded_box, styles.btn_container)}>
            <button className={classNames(global_styles.btn_orange)}>Сохранить изменения</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule;
