import styles from "./Header.module.css";
import Logo from "../../assets/logo.jsx";
import UserDropdown from "./userDropdown/UserDropdown.jsx";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { setPageTitle } from "../../store/globalSlice.js";

const Header = ({ className }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle(location.pathname));
  }, [location.pathname]);

  const pageTitle = useSelector((state) => state.global.pageTitle);

  return (
    <div className={classNames(className, styles.header)}>
      <div className={styles.logo_area}>
        <Link to="/">
          <Logo className={styles.logo} />
        </Link>
      </div>
      {location.pathname != "/login" && (
        <>
          <div className={styles.title}>
            <Link to={pageTitle[0].to}>{pageTitle[0].title}</Link>
            {pageTitle.length > 1 && (
              <>
                <div>{">"}</div>
                <Link to={pageTitle[1].to}>{pageTitle[1].title}</Link>
              </>
            )}
          </div>
          <UserDropdown
            options={useSelector((state) => state.global.userOptions)}
          />
        </>
      )}
    </div>
  );
};

export default Header;
