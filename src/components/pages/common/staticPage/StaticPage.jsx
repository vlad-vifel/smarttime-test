import styles from "./StaticPage.module.css";
import Footer from './../../../footer/Footer';
import Sidebar from "../../../sidebar/Sidebar";

const StaticPage = ({children}) => {
  return (
    <div className={styles.mid}>
      <Sidebar />
      <div className={styles.right}>
        <div className={styles.page}>
          <div className={styles.wrapper}>{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default StaticPage;
