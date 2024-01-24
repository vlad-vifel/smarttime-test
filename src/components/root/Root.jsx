import styles from "./Root.module.css"

import { Outlet } from "react-router-dom";
import Header from "../header/Header"
import Sidebar from "../sidebar/Sidebar"

const Root = () => {
  return (
    <div className={styles.root}>
      <Header className={styles.header} />
      <div className={styles.mid}>
        <Sidebar />
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Root;