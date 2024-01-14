import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css'
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import Home from "../../assets/icons/sidebar/home.jsx"
import Profile from "../../assets/icons/sidebar/profile.jsx"
import Notifications from "../../assets/icons/sidebar/notifications.jsx"
import Schedule from "../../assets/icons/sidebar/schedule.jsx"
import Polling from "../../assets/icons/sidebar/polling.jsx"
import Management from "../../assets/icons/sidebar/management.jsx"
import Units from "../../assets/icons/sidebar/units.jsx"
import Guides from "../../assets/icons/sidebar/guides.jsx"
import Help from "../../assets/icons/sidebar/help.jsx"
import Instruction from "../../assets/icons/sidebar/instruction.jsx"

import LeftArrow from "../../assets/icons/left-arrow.jsx"
import RightArrow from "../../assets/icons/right-arrow.jsx"

const links = [
  {
    id: 0,
    title: "Главная",
    to: "/",
    icon: Home,
  },
  {
    id: 1,
    title: "Профиль",
    to: "/profile",
    icon: Profile,
  },
  {
    id: 2,
    title: "Уведомления",
    to: "/notifications",
    icon: Notifications,
    notifications: 2,
  },
  {
    id: 3,
    title: "Расписание Cессий",
    to: "/schedule",
    icon: Schedule,
  },
  {
    id: 4,
    title: "Анкетирование",
    to: "/polling",
    icon: Polling,
  },
  {
    id: 5,
    title: "Управление пользователями",
    to: "/management",
    icon: Management,
  },
  {
    id: 6,
    title: "Предметные единицы",
    to: "/units",
    icon: Units,
  },
  {
    id: 7,
    title: "Справочники",
    to: "/guides",
    icon: Guides,
  },
  {
    id: 8,
    title: "Помощь",
    to: "/help",
    icon: Help,
  },
  {
    id: 9,
    title: "Инструкция",
    to: "/instruction",
    icon: Instruction,
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(0);
  const location = useLocation();

  const toggle = () => {
    setIsOpen(!isOpen); 
  }

  useEffect(() => {
    setSelectedId(links.find((item) => item.to === location.pathname)?.id);
  }, [location.pathname]);

  return (
    <div className={classNames(styles.sidebar, {
      [styles.opened]: isOpen,
    })}>
      <div className={styles.decoration_top}/>

      <nav className={styles.nav}>
        <ul>
          {links.map((link, ind) => (
            <div key={ind}>
              <li>  
                  <Link 
                    className={classNames(styles.link, {
                      [styles.selected]: link.id === selectedId,
                    }
                    )} 
                    to={link.to}
                  >
                      <link.icon />
                      {isOpen && 
                        <>
                          <div>
                            {link.title}
                          </div>
                          {link.notifications && 
                            <div className={styles.notifications}>
                              {link.notifications}
                            </div>
                          }
                        </>
                      }
                  </Link>
              </li>
              {ind === 6 && <div className={styles.divider}></div>}
            </div>
          ))}
        </ul>
      </nav>
      
      <div className={styles.toggle_container}> 
        <div className={classNames(styles.toggle_switch, {
          [styles.hidden]: !isOpen,
        })}></div>
      </div>

      <button className={styles.btn_hide} onClick={toggle}>
        {isOpen && 
          <>
            Скрыть
            <LeftArrow />
          </>
        }
        {!isOpen && 
          <>
            Раскрыть
            <RightArrow />
          </>
        }
      </button> 

      <div className={styles.decoration_bottom}/>

    </div>
  )
}

export default Sidebar;
