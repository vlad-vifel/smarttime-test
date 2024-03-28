import StaticPage from "../common/staticPage/StaticPage";
import styles from "./404.module.css";

const Page404 = () => {
  return (
    <StaticPage>
      <div className={styles.title}>404</div>
    </StaticPage>
  );
};

export default Page404;
