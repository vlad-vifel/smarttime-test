import classNames from "classnames";
import styles from "./MyEventWrapperComponent.module.css"


const MyEventWrapperComponent = (props) => {
  console.log('!!!!', props);
  return (
    <div
      role="button"
      className={classNames(styles.wrapper)} 
      style={{
        height: `${props.style.height}%`,
        width: `${props.style.width}%`,
        top: `${props.style.top}%`,
      }}

      onClick={(e) => props.onClick && props.onClick(e)}
      // onClick={(e) => console.log(props.onClick)}
      // onDoubleClick={(e) => props.onDoubleClick && props.onDoubleClick(e)}
      // onKeyPress={(e) => props.onKeyPress && props.onKeyPress(event, e)}
    >
      <props.components.event {...props} />
    </div>
  );
}

export default MyEventWrapperComponent;