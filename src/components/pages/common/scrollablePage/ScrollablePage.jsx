import styles from "./ScrollablePage.module.css";
import Footer from './../../../footer/Footer';

const ScrollablePage = ({children}) => {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default ScrollablePage;
