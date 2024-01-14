import styles from "./Root.module.css"

import { Outlet } from "react-router-dom";
import Header from "../header/Header"
import Sidebar from "../sidebar/Sidebar"
import Footer from "../footer/Footer";

const Root = () => {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.mid}>
        <Sidebar />
        <div className={styles.right}>
          <div className={styles.outlet_container}>
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Root;