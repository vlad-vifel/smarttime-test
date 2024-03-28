import Footer from "../../footer/Footer";
import styles from "./Login.module.css";
import global_styles from "../../../styles/global.module.css";
import hse from "../../../assets/pics/hse.png";
import teacher from  "../../../assets/pics/login/teacher.png";
import things from  "../../../assets/pics/login/things.png";
import classNames from "classnames";

const Login = () => {
  return (
    <div className={styles.page}>
      <img className={styles.teacher} src={teacher} />
      <img className={styles.things} src={things} />
      <div className={styles.wrapper}>
        <div className={styles.center}>
          <div
            className={classNames(styles.card, global_styles.white_rounded_box)}
          >
            <div className={styles.title}>SmartTIME</div>
            <div className={styles.hello}>Добро пожаловать</div>
            <div className={styles.divider} />
            <button className={styles.login}>
              <img className={styles.hse} src={hse} />
              Войти через ЕЛК
            </button>
          </div>
          <div
            className={classNames(styles.info, global_styles.white_rounded_box)}
          >
            Авторизовавшись в системе, вы сможете работать с расписанием сессий,
            анкетами пожеланий к экзаменам и справочниками по учебному процессу.
            <br /> <br />
            Для входа используйте свои корпоративные e-mail и пароль.
          </div>
        </div>
        {/* <img className={styles.teacher} src={teacher} />
        <img className={styles.things} src={things} /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
