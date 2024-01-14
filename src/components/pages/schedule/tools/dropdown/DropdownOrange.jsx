import { useRef, useState } from 'react';
import styles from'./Dropdown.module.css';
import classNames from "classnames";

import SmallArrowOrange from "../../../../../assets/icons/small-arrow-orange.jsx"
import Filter from "../../../../../assets/icons/filter.jsx"
import useOutsideClick from '../../../../../hooks/UseOutsideClick';


const DropdownOrange = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const dropdownRef = useRef(null);

  const close = () => {
    window.removeEventListener('click', close);
    setIsVisible(false);
  }

  const ready = () => {
    close();
  }

  const toggle = () => {
    if (isVisible) window.addEventListener('click', close);
    setIsVisible(!isVisible);
  }

  useOutsideClick(dropdownRef, close, isVisible);  
  
  return (
    <div ref={dropdownRef} className={styles.dropdown_container}>
      <div className={classNames(styles.dropdown_trigger, styles.dropdown_trigger_orange)}>
        <button onClick={toggle}>
          <Filter />
          <SmallArrowOrange />
        </button>
      </div>
      {
        isVisible &&
        <div className={classNames(styles.dropdown_body ,styles.dropdown_body_orange)}>
          <div className={styles.dropdown_title_orange}>Отображать:</div>
          <div className={classNames(styles.dropdown_scroll, styles.dropdown_scroll_orange)}>
            {props.info.options.map((option, i) => 
              <div key={i}>
                <input type='checkbox'/>{option}
              </div>
            )}
          </div>
          <button className={classNames(styles.dropdown_btn ,styles.dropdown_btn_orange)} onClick={ready}>
            Готово
          </button>
        </div>
      }
    </div>
  )

}

export default DropdownOrange