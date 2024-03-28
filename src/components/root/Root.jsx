import styles from "./Root.module.css"

import { Outlet } from "react-router-dom";
import Header from "../header/Header"

const Root = () => {
  return (
    <div className={styles.root}>
      <Header className={styles.header} />
      <Outlet />
    </div>
  )
}

export default Root;