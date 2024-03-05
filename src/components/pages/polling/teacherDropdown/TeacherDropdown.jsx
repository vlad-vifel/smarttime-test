import { useRef, useState } from 'react';
import styles from'./TeacherDropdown.module.css';
import useOutsideClick from '../../../../hooks/UseOutsideClick.jsx';;

import DownArrowSmall from '../../../../assets/icons/down-arrow-small.jsx';
import UpArrowSmall from '../../../../assets/icons/up-arrow-small.jsx';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTeacherOption } from '../../../../store/globalSlice.js';

const TeacherDropdown = () => {
  const [isVisible, setIsVisible] = useState(false);

  const dropdownRef = useRef(null);

  const dispatcher = useDispatch();

  const options = useSelector(state => state.global.teacherOptions);

  const value = useSelector(state => state.global.selectedTeacherOption);

  const changeValue = (e) => {
    dispatcher(setSelectedTeacherOption(e.target.value));
    close();
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
          {useSelector(state => state.global.selectedTeacherOption)}
          {!isVisible && <DownArrowSmall />}
          {isVisible && <UpArrowSmall />}
        </button>
      </div>
      {
        isVisible &&
        <div className={styles.dropdown_body}>
          <div className={styles.dropdown_options}>
            {options.map((option, i) => (
              <button 
                key={i} 
                className={classNames(styles.dropdown_option)} 
                onClick={changeValue} 
                value={option}>
                  {option}
              </button>
            ))}
          </div>
          {/* <div className={styles.divider}/>
          <button className={styles.dropdown_btn} onClick={close}>
            <Logout />
            Выйти
          </button> */}
        </div>
      }
    </div>
  );

}

export default TeacherDropdown;