import classNames from "classnames";
import styles from "./Schedule.module.css"

import global_styles from "../../../styles/global.module.css"
import Tools from "./tools/Tools";
import Features from "./features/Features";
import Planner from "./planner/Planner";
import StaticPage from "../common/staticPage/StaticPage"
import Topbar from "./topbar/Topbar";

const Schedule = () => {
  return (
    <StaticPage>
      <div className={styles.content}>
        <Tools />
        <div className={styles.main}>
          <div className={classNames(global_styles.white_rounded_box, styles.left)}>
            <Topbar/>
            <div className={styles.divider}/>
            <Planner />
          </div>
          <div className={styles.right}>
            <Features />
            <div className={classNames(global_styles.white_rounded_box, styles.btn_container)}>
              <button className={classNames(global_styles.btn_orange, styles.btn)}>Сохранить изменения</button>
            </div>
          </div>
        </div>
      </div>
    </StaticPage>
  )
}

export default Schedule;
