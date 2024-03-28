import styles from "./ScrollablePage.module.css";
import Footer from "./../../../footer/Footer";
import classNames from "classnames";
import Sidebar from "../../../sidebar/Sidebar";

const ScrollablePage = ({ children }) => {
  return (
    <div className={styles.mid}>
      <Sidebar />
      <div className={styles.right}>
        <div className={classNames(styles.page, "scrollable")}>
          <div className={styles.wrapper}>{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ScrollablePage;
