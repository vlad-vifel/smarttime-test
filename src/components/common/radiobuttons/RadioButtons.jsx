import classNames from 'classnames'
import './RadioButtons.css'

const RadioButtons = ({ options, col, vertical }) => {
  return (
    <div className={classNames("radiobuttons_container", {"vertical": vertical})}>
      {
        options.map((option, i) => (
          <div className="radiobutton pretty p-default p-round p-smooth" key={options + col + i} >
              <input type="radio" name={options + col} />
              <div className="state">
                  <label>{option}</label>
              </div>
          </div>
        ))
      }
    </div>
  );
}

export default RadioButtons;