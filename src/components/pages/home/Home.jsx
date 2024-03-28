import Footer from "../../footer/Footer";
import Card from "./Card/Card";
import styles from "./Home.module.css";
import Miem from "../../../assets/icons/miem";

const Home = () => {
  const cards = [
    {
      title: "Расписание сессии",
      to: "/schedule",
      description:
        "Генерация и управление расписания, а также просмотр для предстоящего периода и архивных периодов сессий.",
    },
    {
      title: "Анкетирование",
      to: "/polling",
      description:
        "Управление, а также заполнение и просмотр анкет для предстоящего и архивных периодов сессий.",
    },
    {
      title: "Пользователи",
      to: "/users",
      description: "Управление данными в учетной записи каждого пользователя.",
    },
    {
      title: "Справочники",
      to: "/guides",
      description:
        "Информация, представленная в виде справочников по нагрузкам и аудиториям.",
    },
    {
      title: "Помощь",
      to: "/help",
      description:
        "Информация, необходимая для решения возникающих проблем при работе с системой.",
    },
    {
      title: "Инструкция",
      to: "/instruction",
      description:
        "Информация о последовательных действиях по использованию функционала системы.",
    },
  ];

  return (
    <div className={styles.mid}>
      <div className={styles.left}>
        <div className={styles.decoration_top} />
        <Miem />
        <div>
          Система является частью информационного и сервисного пространства НИУ
          ВШЭ.
          <br /> <br />
          Подробную информацию можно получить на сайте <a href="https://it.hse.ru/lk">https://it.hse.ru/lk</a>.
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.page}>
          <div className={styles.wrapper}>
            <div className={styles.title}>Выберите раздел</div>
            <div className={styles.grid}>
              {cards.map((card, i) => (
                <Card info={card} ind={i} key={i} />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
