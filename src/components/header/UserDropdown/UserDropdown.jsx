import { useRef, useState } from 'react';
import styles from'./UserDropdown.module.css';
import useOutsideClick from '../../../hooks/UseOutsideClick.jsx';

import User from "../../../assets/icons/user.jsx"
import DownArrow from "../../../assets/icons/down-arrow.jsx"
import UpArrow from '../../../assets/icons/up-arrow.jsx';
import Logout from "../../../assets/icons/logout.jsx"
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUserOption } from '../../../store/globalSlice.js';

const UserDropdown = () => {
  const [isVisible, setIsVisible] = useState(false);

  const dropdownRef = useRef(null);

  const dispatcher = useDispatch();

  const options = useSelector(state => state.global.userOptions);

  const value = useSelector(state => state.global.selectedUserOption);

  const changeValue = (e) => {
    dispatcher(setSelectedUserOption(e.target.value));
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
          {!isVisible && <DownArrow />}
          {isVisible && <UpArrow />}
        </button>
      </div>
      {
        isVisible &&
        <div className={styles.dropdown_body}>
          <div className={styles.dropdown_options}>
            {options.map((option, i) => (
              <button 
                key={i} 
                className={classNames(styles.dropdown_option, {[styles.chosen]: value === option})} 
                onClick={changeValue} 
                value={option}>
                  {option}
              </button>
            ))}
          </div>
          <div className={styles.divider}/>
          <button className={styles.dropdown_btn} onClick={close}>
            <Logout />
            Выйти
          </button>
        </div>
      }
    </div>
  );

}

export default UserDropdown;