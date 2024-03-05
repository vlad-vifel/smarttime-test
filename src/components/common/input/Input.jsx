import styles from './Input.module.css'

const Input = ({ hint }) => {
  return (
    <div className={styles.input_container}>
      <input placeholder={hint}/>
    </div>
  );
}

export default Input;