import Icon from "@mdi/react";
import { mdiClose, mdiCheck } from "@mdi/js";
import "./Checkbox.css";

const Checkbox = (props) => {
  return (
    <div className="checkbox_container">
      <div className="checkbox pretty p-icon p-curve p-smooth">
        {props.onChange ? (
          <input
            type="checkbox"
            disabled={props.disabled}
            value={props.value}
            checked={props.checked}
            onChange={props.onChange}
          />
        ) : (
          <input
            type="checkbox"
            defaultChecked={props.checked}
            disabled={props.disabled}
            value={props.value}
          />
        )}
        <div className="state">
          <Icon className="icon mdi mdi-close" path={props.isClose ? mdiClose : mdiCheck}></Icon>
          <label>{props.name || props.value}</label>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
