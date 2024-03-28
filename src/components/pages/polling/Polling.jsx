import classNames from "classnames";
import styles from "./Polling.module.css";

import global_styles from "../../../styles/global.module.css";
import ScrollablePage from "../common/scrollablePage/ScrollablePage";
import TeacherDropdown from "./teacherDropdown/teacherDropdown";
import { useSelector } from "react-redux";
import Collapsible from "./collapsible/Collapsible";
import Checkbox from "../../common/checkbox/Checkbox";
import Restrictions from "./restrictions/Resctrictions";
import Parametres from "./parametres/Parametres";


const Polling = () => {
  return (
    <ScrollablePage>
      <div className={styles.content}>
        <div
          className={classNames(global_styles.white_rounded_box, styles.intro)}
        >
          <div className={styles.intro_header}>
            <div>Здравствуйте,</div>
            <TeacherDropdown />
          </div>
          <div className={styles.intro_text}>
            <p>
              В данной форме просим Вас сообщить о своих ограничениях, которые
              необходимо учесть при составлении расписания сессии 3 модуля
              2023/2024 учебного года. Экзамены пройдут с 25 по 31 марта 2024
              года. В форму будут включены все экзамены в соответствии с Вашей
              учебной нагрузкой.
            </p>
            <p>
              Обращаем Ваше внимание, что направленные заявки в данной форме
              являются приоритетными по составлению расписания в сравнении с
              другими видами обращений.
            </p>
            <p>
              Сбор пожеланий осуществляется{" "}
              <span>до 10 марта 2024 года до 23:59</span>.
            </p>
          </div>
        </div>

        <Collapsible label="Инструкция">
          <div className={styles.instruction}>
            <p>
              В самом начале анкетирования расположена таблица с днями сессии по
              горизонтали и временами пар по вертикали. Она заполняется{" "}
              <span>для всех дисциплин сразу</span>. Вам необходимо выбрать
              время, когда Вам <span>не удобно</span> принимать экзамены. Также
              можно выбрать целый день, когда нет возможности принимать
              экзамены. Просьба делать выбор обдуманно без использования
              максимального количества ограничений.
            </p>
            <br />
            <p>
              Следующая анкета включает в себя{" "}
              <span>
                опросную форму отдельно по каждой дисциплине для каждой
                образовательной программы
              </span>
              . Необходимо выбрать только один вариант ответа для каждого пункта
              вопросов:
            </p>
            <ol>
              <li>
                Формат проведения экзамена:
                <ul>
                  <li>Письменный,</li>
                  <li>Устный,</li>
                  <li>Экзамена нет — выставление оценки по накопленной,</li>
                  <li>
                    {" "}
                    Онлайн (для онлайн-программ, безопасности жизнедеятельности
                    и дисциплин общего цикла).
                  </li>
                </ul>
              </li>
              <li>
                Показ работ (при выборе письменного экзамена):
                <ul>
                  <li>Сразу,</li>
                  <li>Через Х дней.</li>
                </ul>
              </li>
              <li>
                Контингент (выбор формат экзамена по численности студентов):
                <ul>
                  <li>Поток,</li>
                  <li>Группа.</li>
                </ul>
              </li>
              <li>
                Максимальное количество групп в день: от 2 до 5 – выбор
                предпочтительного количества групп в день, у которых будет
                приниматься экзамен.
              </li>
              <li>
                Продолжительность экзамена (у группы/потока в зависимости от
                контингента): от 1 до 6 пар – выбор необходимой длительности для
                приема экзамена.
              </li>
              <li>Тип аудитории:</li>
              <ul>
                <li>Лекционная,</li>
                <li>Семинарская,</li>
                <li>Компьютерный класс,</li>
                <li>Учебная лаборатория,</li>
                <li>
                  Онлайн (для онлайн-программ, безопасности жизнедеятельности и
                  дисциплин общего цикла).
                </li>
              </ul>
              <li>При необходимости можно оставить комментарий к анкете.</li>
            </ol>
            <br />
            <p>Кнопка «Сохранить» сохранит Вашу анкету.</p>
            <br />
            <p>
              При необходимости <span>редактирования</span> анкеты появляется
              заполненная ранее форма. Если Вы хотите изменить свой выбор, то
              необходимо внести данные, а затем нажать кнопку «Сохранить». Новый
              ответ будет записан. Редактировать анкету можно{" "}
              <span>до окончания срока заполнения</span> (до 10.03.2024
              включительно).
            </p>
            <br />
            <p>Благодарим за сотрудничество!</p>
          </div>
        </Collapsible>
        <Collapsible label="Ограничения для расписания сессии">
          <div className={styles.restrictions}>
            <p>
              Отметьте в таблице время/дни, в которые Вы <span>не можете </span>
              принимать экзамены.
            </p>
            <div className={styles.checkboxes}>
              <div>
                <Checkbox checked={false} disabled={true} isClose={true}/> - могу
              </div>
              <div>
                <Checkbox checked={true} disabled={true} isClose={true}/> - не могу
              </div>
            </div>
            <Restrictions start={new Date(2024, 0, 21)} duration={14} />
          </div>
        </Collapsible>
        <Collapsible label="Настройка параметров для групп">
          <Parametres
            groups={[
              "Физика, 2 курс ИБ, Гр. 1 (ПЕ 1)",
              "Физика, 2 курс ИБ, Гр. 1 (ПЕ 1)",
              "Физика, 2 курс ИБ, Гр. 1 (ПЕ 1)",
              "Физика, 2 курс ИБ, Гр. 1 (ПЕ 1)",
              "Физика, 2 курс ИБ, Гр. 1 (ПЕ 1)",
              "Физика, 2 курс ИБ, Гр. 1 (ПЕ 1)",
            ]}
          />
        </Collapsible>
        <div
          className={classNames(
            styles.save_container,
            global_styles.white_rounded_box
          )}
        >
          <button disabled className={global_styles.btn_orange}>Сохранить</button>
        </div>
      </div>
    </ScrollablePage>
  );
};

export default Polling;
