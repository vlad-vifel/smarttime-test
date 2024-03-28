import React, { useState } from "react";
import global_styles from "../../../../styles/global.module.css";
import styles from "./Collapsible.module.css";
import classNames from "classnames";
import DownArrowSmall from "../../../../assets/icons/down-arrow-small";
import UpArrowSmall from "../../../../assets/icons/up-arrow-small";

const Collapsible = (props) => {
  const [open, setOPen] = useState(true);

  const toggle = () => {
    setOPen(!open);
  };

  return (
    <div className={classNames(global_styles.white_rounded_box, styles.main)}>
      <button className={styles.btn} onClick={toggle}>
        {props.label}
        {open && <UpArrowSmall />}
        {!open && <DownArrowSmall />}
      </button>
      {open && <div className={classNames(styles.content)}> {props.children} </div>}
    </div>
  );
};
export default Collapsible;
