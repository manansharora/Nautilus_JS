import React, { useState } from "react";
import "./style.css";

const Pressure = () => {
  const [inputValue, SetInputValue] = useState("");
  const [outputValue, SetOutputValue] = useState("");
  const [baseUnit, SetBaseUnit] = useState("psi");
  const [resultUnit, SetResultUnit] = useState("bar");
  const pressure = ["psi", "MPa", "bar"];

  let calcPressure = (event) => {
    // function to calculate area conversions
    event.preventDefault(); //prevent submitting

    if (inputValue.isNaN) {
      alert("Please enter a value");
    } else if (baseUnit === resultUnit) {
      SetOutputValue(inputValue);
    } else {
      if (baseUnit === "psi" && resultUnit === "MPa") {
        let results = inputValue / 145;
        SetOutputValue(results);
      } else if (baseUnit === "psi" && resultUnit === "bar") {
        let results = inputValue / 14.504;
        SetOutputValue(results);
      } else if (baseUnit === "MPa" && resultUnit === "psi") {
        let results = inputValue * 145;
        SetOutputValue(results);
      } else if (baseUnit === "MPa" && resultUnit === "bar") {
        let results = inputValue * 10;
        SetOutputValue(results);
      } else if (baseUnit === "bar" && resultUnit === "psi") {
        let results = inputValue * 14.504;
        SetOutputValue(results);
      } else if (baseUnit === "bar" && resultUnit === "MPa") {
        let results = inputValue / 10;
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
        <h4>PRESSURE CONVERSION</h4>

        <form onSubmit={calcPressure}>
          <div>
            <input
              name="inputValue"
              className="input_style"
              type="number"
              value={inputValue}
              onChange={(e) => SetInputValue(e.target.value)}
            />

            <select
              name="baseUnit"
              value={baseUnit}
              onChange={(e) => SetBaseUnit(e.target.value)}
            >
              {pressure.map((tmp) => (
                <option key={tmp} value={tmp}>
                  {tmp}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              name="outputValue"
              className="input_style"
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
              {pressure.map((tmp) => (
                <option key={tmp} value={tmp}>
                  {tmp}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn button-convert">
            Convert
          </button>
          <button className="btn btn-outline" onClick={reload}>
            Reset
          </button>
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

export default Pressure;
