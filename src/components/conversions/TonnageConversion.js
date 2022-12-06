import React, { useState } from "react";
import "./style.css";

const Tonnage = () => {
  const [inputValue, SetInputValue] = useState("");
  const [outputValue, SetOutputValue] = useState("");
  const [baseUnit, SetBaseUnit] = useState("kN");
  const [resultUnit, SetResultUnit] = useState("US Tons");
  const tonnage = ["kN", "US Tons", "Metric Ton"];

  let calcTonnage = (event) => {
    // function to calculate area conversions
    event.preventDefault(); //prevent submitting

    if (inputValue.isNaN) {
      alert("Please enter a value");
    } else if (baseUnit === resultUnit) {
      SetOutputValue(inputValue);
    } else {
      if (baseUnit === "kN" && resultUnit === "US Tons") {
        let results = inputValue * 0.11;
        SetOutputValue(results);
      } else if (baseUnit === "kN" && resultUnit === "Metric Ton") {
        let results = inputValue * 0.10197;
        SetOutputValue(results);
      } else if (baseUnit === "US Tons" && resultUnit === "kN") {
        let results = inputValue * 8.90;
        SetOutputValue(results);
      } else if (baseUnit === "US Tons" && resultUnit === "Metric Ton") {
        let results = inputValue * 0.907;
        SetOutputValue(results);
      } else if (baseUnit === "Metric Ton" && resultUnit === "kN") {
        let results = inputValue * 14.504;
        SetOutputValue(results);
      } else if (baseUnit === "Metric Ton" && resultUnit === "US Tons") {
        let results = inputValue * 9.80665;
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
        <h4>TONNAGE CONVERSION</h4>

        <form onSubmit={calcTonnage}>
          <div>
            <input
              name="inputValue"
              type="number"
              className="input_style"
              value={inputValue}
              onChange={(e) => SetInputValue(e.target.value)}
            />

            <select
              name="baseUnit"
              value={baseUnit}
              onChange={(e) => SetBaseUnit(e.target.value)}
            >
              {tonnage.map((tmp) => (
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
              className="input_style"
              value={outputValue}
              disabled={true}
              onChange={(e) => SetOutputValue(e.target.value)}
            />

            <select
              name="resultUnit"
              value={resultUnit}
              onChange={(e) => SetResultUnit(e.target.value)}
            >
              {tonnage.map((tmp) => (
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

export default Tonnage;
