import styles from './Header.module.css'
import Logo from "../../assets/logo.jsx"
import UserDropdown from './UserDropdown/UserDropdown'

const Header = () => {
  const userInfo = {
    options: 
    [
      "Преподаватель",
      "Учебный офис",
      "Менеджер департамента",
    ],
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo_area}>
        <Logo className={styles.logo} /> 
      </div>
      <div className={styles.title}>
        <div className={styles.title__website}>Просмотр расписания сессии /</div>
        <div className={styles.title__page}>Редактор расписания сессии</div>
      </div>
      <UserDropdown info={userInfo}/>
    </div>
  )
}

export default Header;
