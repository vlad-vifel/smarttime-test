import classNames from "classnames";
import global_styles from "../../../../assets/styles/global.module.css"
import 'react-big-calendar/lib/sass/styles.scss';
import './Planner.css'
import styles from "./Planner.module.css"

import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment);


const Planner = () => {

  return (
    <div className={classNames(global_styles.white_rounded_box, styles.calendar_big, "planner")}>
      {/* <Calendar
        localizer={localizer}
        events={[]}
        defaultView={"week"}
        views={["week"]}
        toolbar={false}
      /> */}
    </div>
  )
}

export default Planner;
