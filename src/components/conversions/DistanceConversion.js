import React, { useState } from "react";
import "./style.css";

const Distance = () => {
  const [inputValue, SetInputValue] = useState("");
  const [outputValue, SetOutputValue] = useState("");
  const [baseUnit, SetBaseUnit] = useState("mm");
  const [resultUnit, SetResultUnit] = useState("mm");
  const distances = ["mm", "cm", "m", "in", "feet"];

  let calcDistance = (event) => {
    // function to calculate area conversions
    event.preventDefault(); //prevent submitting

    if (inputValue.isNaN) {
      alert("Please enter a value");
    } else if (baseUnit === resultUnit) {
      SetOutputValue(inputValue);
    } else {
      if (baseUnit === "mm" && resultUnit === "cm") {
        let results = inputValue * 0.1;
        SetOutputValue(results);
      } else if (baseUnit === "mm" && resultUnit === "m") {
        let results = inputValue * 0.001;
        SetOutputValue(results);
      } else if (baseUnit === "mm" && resultUnit === "in") {
        let results = inputValue/25.4;
        SetOutputValue(results);
      } else if (baseUnit === "mm" && resultUnit === "feet") {
        let results = inputValue/304.8;
        SetOutputValue(results);
      } else if (baseUnit === "cm" && resultUnit === "mm") {
        let results = inputValue * 10;
        SetOutputValue(results);
      } else if (baseUnit === "cm" && resultUnit === "m") {
        let results = inputValue * 0.01;
        SetOutputValue(results);
      } else if (baseUnit === "cm" && resultUnit === "in") {
        let results = inputValue /2.54;
        SetOutputValue(results);
      } else if (baseUnit === "cm" && resultUnit === "feet") {
        let results = inputValue /30.48;
        SetOutputValue(results);
      } else if (baseUnit === "m" && resultUnit === "mm") {
        let results = inputValue * 1000;
        SetOutputValue(results);
      } else if (baseUnit === "m" && resultUnit === "cm") {
        let results = inputValue * 100;
        SetOutputValue(results);
      } else if (baseUnit === "m" && resultUnit === "in") {
        let results = inputValue * 39.37;
        SetOutputValue(results);
      } else if (baseUnit === "m" && resultUnit === "feet") {
        let results = inputValue * 3.281;
        SetOutputValue(results);
      } else if (baseUnit === "in" && resultUnit === "mm") {
        let results = inputValue * 25.4;
        SetOutputValue(results);
      } else if (baseUnit === "in" && resultUnit === "cm") {
        let results = inputValue * 2.54;
        SetOutputValue(results);
      } else if (baseUnit === "in" && resultUnit === "m") {
        let results = inputValue * 0.0254;
        SetOutputValue(results);
      } else if (baseUnit === "in" && resultUnit === "feet") {
        let results = inputValue / 12;
        SetOutputValue(results);
      } else if (baseUnit === "feet" && resultUnit === "mm") {
        let results = inputValue * 304.8;
        SetOutputValue(results);
      } else if (baseUnit === "feet" && resultUnit === "cm") {
        let results = inputValue * 30.48;
        SetOutputValue(results);
      } else if (baseUnit === "feet" && resultUnit === "m") {
        let results = inputValue * 0.3048;
        SetOutputValue(results);
      } else if (baseUnit === "feet" && resultUnit === "in") {
        let results = inputValue * 12;
        SetOutputValue(results);
      }
    }
  };

  let reload = () => {
    window.location.reload();
  };

  return (
    <div className="conv-div">
      <div className="conv-form">
        <h4>DISTANCE CONVERSION</h4>

        <form onSubmit={calcDistance}>
          <div>
            
              <input
                className="input_style"
                name="inputValue"
                type="number"
                value={inputValue}
                onChange={(e) => SetInputValue(e.target.value)}
              />
              
              <select
                name="baseUnit"
                value={baseUnit}
                onChange={(e) => SetBaseUnit(e.target.value)}
              >
                {distances.map((tmp) => (
                  <option key={tmp} value={tmp}>
                    {tmp}
                  </option>
                ))}
              </select>
              
          </div>

          <div>
            
              <input
                className="input_style"
                name="outputValue"
                type="number"
                value={outputValue}
                disabled={true}
                onChange={(e) => SetOutputValue(e.target.value)}
              />
              
            
              <select
                name="resultUnit"
                value={resultUnit}
                onChange={(e) => SetResultUnit(e.target.value)}
              >
                {distances.map((tmp) => (
                  <option key={tmp} value={tmp}>
                    {tmp}
                  </option>
                ))}
              </select>
              
          </div>

          <button type="submit" className='btn button-convert'>Convert</button>
          <button className='btn btn-outline' onClick={reload}>Reset</button>
        </form>

        <div>
          <p>
            The Equivalent value of {inputValue} {baseUnit} is {outputValue}{" "}
            {resultUnit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Distance;
