import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import "./Checkbox.css";

const Checkbox = (props) => {
  return (
    <div className="checkbox_container">
      <div className="checkbox pretty p-icon p-curve p-smooth">
        <input
          type="checkbox"
          defaultChecked={props.checked}
          disabled={props.disabled}
        />
        <div className="state">
          <Icon className="icon mdi mdi-close" path={mdiClose}></Icon>
          <label>{props.title}</label>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
