import React, { useState } from "react";
import "./style.css";

const Volume = () => {
  const [inputValue, SetInputValue] = useState("");
  const [outputValue, SetOutputValue] = useState("");
  const [baseUnit, SetBaseUnit] = useState("cubic mm");
  const [resultUnit, SetResultUnit] = useState("cubic cm");
  const volumes = ["cubic mm", "cubic cm", "cubic m", "cubic in", "cubic feet"];

  let calcVolume= (event) => {
    // function to calculate area conversions
    event.preventDefault(); //prevent submitting

    if (inputValue.isNaN) {
      alert("Please enter a value");
    } else if (baseUnit === resultUnit) {
      SetOutputValue(inputValue);
    } else {
      if (baseUnit === "cubic mm" && resultUnit === "cubic cm") {
        let results = inputValue * 0.001;
        SetOutputValue(results);
      } else if (baseUnit === "cubic mm" && resultUnit === "cubic m") {
        let results = inputValue * 0.000000001;
        SetOutputValue(results);
      } else if (baseUnit === "cubic mm" && resultUnit === "cubic in") {
        let results = inputValue /16390;
        SetOutputValue(results);
      } else if (baseUnit === "cubic mm" && resultUnit === "cubic feet") {
        let results = inputValue * 0.000000035315;
        SetOutputValue(results);
      } else if (baseUnit === "cubic cm" && resultUnit === "cubic mm") {
        let results = inputValue * 1000;
        SetOutputValue(results);
      } else if (baseUnit === "cubic cm" && resultUnit === "cubic m") {
        let results = inputValue * 0.000001;
        SetOutputValue(results);
      } else if (baseUnit === "cubic cm" && resultUnit === "cubic in") {
        let results = inputValue /16.387;
        SetOutputValue(results);
      } else if (baseUnit === "cubic cm" && resultUnit === "cubic feet") {
        let results = inputValue /28320;
        SetOutputValue(results);
      } else if (baseUnit === "cubic m" && resultUnit === "cubic mm") {
        let results = inputValue * 1000000000;
        SetOutputValue(results);
      } else if (baseUnit === "cubic m" && resultUnit === "cubic cm") {
        let results = inputValue * 1000000;
        SetOutputValue(results);
      } else if (baseUnit === "cubic m" && resultUnit === "cubic in") {
        let results = inputValue * 61023.7;
        SetOutputValue(results);
      } else if (baseUnit === "cubic m" && resultUnit === "cubic feet") {
        let results = inputValue * 35.315;
        SetOutputValue(results);
      } else if (baseUnit === "cubic in" && resultUnit === "cubic mm") {
        let results = inputValue * 16387.1;
        SetOutputValue(results);
      } else if (baseUnit === "cubic in" && resultUnit === "cubic cm") {
        let results = inputValue * 16.387;
        SetOutputValue(results);
      } else if (baseUnit === "cubic in" && resultUnit === "cubic m") {
        let results = inputValue /61020;
        SetOutputValue(results);
      } else if (baseUnit === "cubic in" && resultUnit === "cubic feet") {
        let results = inputValue / 1728;
        SetOutputValue(results);
      } else if (baseUnit === "cubic feet" && resultUnit === "cubic mm") {
        let results = inputValue * 28320000;
        SetOutputValue(results);
      } else if (baseUnit === "cubic feet" && resultUnit === "cubic cm") {
        let results = inputValue * 28320;
        SetOutputValue(results);
      } else if (baseUnit === "cubic feet" && resultUnit === "cubic m") {
        let results = inputValue /35.315;
        SetOutputValue(results);
      } else if (baseUnit === "cubic feet" && resultUnit === "cubic in") {
        let results = inputValue * 1728;
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
        <h4>VOLUME CONVERSION</h4>

        <form onSubmit={calcVolume}>
          <div>
            
              <input
                name="inputValue"
                type="number"
                value={inputValue}
                className="input_style"
                onChange={(e) => SetInputValue(e.target.value)}
              />
              
              <select
                name="baseUnit"
                value={baseUnit}
                onChange={(e) => SetBaseUnit(e.target.value)}
              >
                {volumes.map((tmp) => (
                  <option key={tmp} value={tmp}>
                    {tmp}
                  </option>
                ))}
              </select>
              
          </div>

          <div>
            
              <input
                name="outputValue"
                type="number"
                value={outputValue}
                className="input_style"
                disabled={true}
                onChange={(e) => SetOutputValue(e.target.value)}
              />
              
            
              <select
                name="resultUnit"
                value={resultUnit}
                onChange={(e) => SetResultUnit(e.target.value)}
              >
                {volumes.map((tmp) => (
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

export default Volume;
