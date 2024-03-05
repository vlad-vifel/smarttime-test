import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";

import Hide from "../../assets/icons/sidebar/hide.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLink, toggleSidebar } from "../../store/globalSlice.js";
import Show from "../../assets/icons/sidebar/show.jsx";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const links = useSelector((state) => state.global.links);

  const isOpen = useSelector((state) => state.global.sidebarIsOpen);

  // console.log(useSelector((state) => state.global.selectedLink))

  const shortPathname = (pathname) => {
    return '/' + pathname.split("/")[1];
  }

  console.log(shortPathname(location.pathname))

  useEffect(() => {
    const id = links.find((item) => item.to === shortPathname(location.pathname))?.id;
    dispatch(setSelectedLink({ id }));
  }, [location.pathname]);

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
                <Link
                  className={classNames(styles.link, {
                    [styles.selected]:
                      link.id ===
                      useSelector((state) => state.global.selectedLink.id),
                  })}
                  to={link.to}
                >
                  <link.icon />
                  {isOpen && (
                    <>
                      <div>{link.title}</div>
                      {link.notifications && (
                        <div className={styles.notifications}>
                          {link.notifications}
                        </div>
                      )}
                    </>
                  )}
                </Link>
              </li>
              {ind === 4 && <div className={styles.divider}></div>}
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
