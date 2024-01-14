import { useRef, useState } from 'react';
import styles from'./Dropdown.module.css';

import SmallArrow from "../../../../../assets/icons/small-arrow.jsx"
import useOutsideClick from '../../../../../hooks/UseOutsideClick';

const Dropdown = (props) => {
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
      <div className={styles.dropdown_trigger}>
        <button onClick={toggle}>
          {props.info.title}
          <SmallArrow />
        </button>
      </div>
      {
        isVisible &&
        <div className={styles.dropdown_body}>
          <div className={styles.dropdown_scroll}>
            {props.info.options.map((option, i) => 
              <div key={i}>
                <input type='checkbox'/>{option}
              </div>
            )}
          </div>
          <button className={styles.dropdown_btn} onClick={ready}>
            Готово
          </button>
        </div>
      }
    </div>
  )

}

export default Dropdown