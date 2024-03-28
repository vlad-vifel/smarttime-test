import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";

import Hide from "../../assets/icons/sidebar/hide.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/globalSlice.js";
import Show from "../../assets/icons/sidebar/show.jsx";

const Sidebar = () => {
  const dispatch = useDispatch();

  const links = useSelector((state) => state.global.links).slice(0, 7);

  const isOpen = useSelector((state) => state.global.sidebarIsOpen);

  return (
    <div
      className={classNames(styles.sidebar, {
        [styles.opened]: isOpen,
      })}
    >
      <div className={styles.decoration_top} />

      <nav className={styles.nav}>
        <ul>
          {links.map((link, ind) => (
            <div key={ind}>
              <li>
                {/* {console.log(link.title)} */}
                <Link
                  className={classNames(styles.link, {
                    [styles.selected]:
                      link.id ===
                      useSelector((state) => state.global.pageTitle[0].id),
                  })}
                  to={link.to}
                >
                  <link.icon />
                  {isOpen && <div>{link.title}</div>}
                </Link>
              </li>
              {ind === 3 && <div className={styles.divider}></div>}
            </div>
          ))}
          <div className={styles.divider}></div>
          <div key="btn">
            <li>
              <button
                className={classNames(styles.btn_hide, styles.link)}
                onClick={() => dispatch(toggleSidebar())}
              >
                {isOpen && (
                  <>
                    <Hide />
                    <div>Скрыть меню</div>
                  </>
                )}
                {!isOpen && <Show />}
              </button>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
