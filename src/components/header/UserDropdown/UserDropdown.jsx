import { useRef, useState } from 'react';
import styles from'./UserDropdown.module.css';
import useOutsideClick from '../../../hooks/UseOutsideClick';

import User from "../../../assets/icons/user.jsx"
import Arrow from "../../../assets/icons/arrow.jsx"
import Check from "../../../assets/icons/check.jsx"
import Logout from "../../../assets/icons/logout.jsx"
import classNames from 'classnames';

const UserDropdown = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const dropdownRef = useRef(null);

  const [value, setValue] = useState(props.info.options[0]);

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  const close = () => {
    window.removeEventListener('click', close);
    setIsVisible(false);
  };

  const toggle = () => {
    if (isVisible) window.addEventListener('click', close);
    setIsVisible(!isVisible);
  };

  useOutsideClick(dropdownRef, close, isVisible);  
  
  return (
    <div ref={dropdownRef} className={styles.dropdown_container}>
      <div className={styles.dropdown_trigger}>
        <button onClick={toggle}>
          <User />
          Иванов Иван Иванович
          <Arrow />
        </button>
      </div>
      {
        isVisible &&
        <div className={styles.dropdown_body}>
          <div className={styles.dropdown_options}>
            {props.info.options.map((option, i) => (
              <button key={i} className={styles.dropdown_option} onClick={changeValue} value={option}>
                {option}
                <span className={classNames({[styles.hidden]: value !== option})}> 
                  <Check />
                </span>
              </button>
            ))}
          </div>
          <button className={styles.dropdown_btn} onClick={close}>
            Выйти
            <Logout />
          </button>
        </div>
      }
    </div>
  );

}

export default UserDropdown;