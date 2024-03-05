import './RadioButtons.css'

const RadioButtons = ({ options, row }) => {
  return (
    <div className="radiobuttons_container">
      {
        options.map((option, i) => (
          <div className="radiobutton pretty p-default p-round p-smooth" key={options + row + i} >
              <input type="radio" name={options + row} />
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