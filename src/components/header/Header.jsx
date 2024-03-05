import styles from './Header.module.css'
import Logo from "../../assets/logo.jsx"
import UserDropdown from './userDropdown/UserDropdown.jsx'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

const Header = ({className}) => {
  return (
    <div className={classNames(className, styles.header)}>
      <div className={styles.logo_area}>
        <Logo className={styles.logo} /> 
      </div>
      <div className={styles.title}>
        <div className={styles.title__website}>{useSelector(state => state.global.selectedLink.title)}</div>
        {/* <div className={styles.title__page}>&gt; 1 модуль 2023/2024 уч. г.</div> */}
      </div>
      <UserDropdown options={useSelector(state => state.global.userOptions)}/>
    </div>
  )
}

export default Header;
