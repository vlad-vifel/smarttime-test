import styles from "./ScrollablePage.module.css";
import Footer from './../../../footer/Footer';
import classNames from "classnames";

const ScrollablePage = ({children}) => {
  return (
    <div className={classNames(styles.page, "scrollable")}>
      <div className={styles.wrapper}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default ScrollablePage;
