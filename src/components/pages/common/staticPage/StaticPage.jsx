import styles from "./StaticPage.module.css";
import Footer from './../../../footer/Footer';

const StaticPage = ({children}) => {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default StaticPage;
