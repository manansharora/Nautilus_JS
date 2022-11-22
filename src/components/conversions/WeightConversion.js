import React, { useState } from "react";
import "./style.css";

const Weight = () => {
  const [inputValue, SetInputValue] = useState("");
  const [outputValue, SetOutputValue] = useState("");
  const [baseUnit, SetBaseUnit] = useState("gms");
  const [resultUnit, SetResultUnit] = useState("kg");
  const weights = ["gms", "kg", "oz", "lbs"];

  let calcWeight = (event) => {
    // function to calculate area conversions
    event.preventDefault(); //prevent submitting

    if (inputValue.isNaN) {
      alert("Please enter a value");
    } else if (baseUnit === resultUnit) {
      SetOutputValue(inputValue);
    } else {
      if (baseUnit === "gms" && resultUnit === "kg") {
        let results = inputValue * 0.001;
        SetOutputValue(results);
      } else if (baseUnit === "gms" && resultUnit === "oz") {
        let results = inputValue / 28.35;
        SetOutputValue(results);
      } else if (baseUnit === "gms" && resultUnit === "lbs") {
        let results = inputValue / 453.6;
        SetOutputValue(results);
      } else if (baseUnit === "kg" && resultUnit === "gms") {
        let results = inputValue * 1000;
        SetOutputValue(results);
      } else if (baseUnit === "kg" && resultUnit === "oz") {
        let results = inputValue * 35.274;
        SetOutputValue(results);
      } else if (baseUnit === "kg" && resultUnit === "lbs") {
        let results = inputValue * 2.20462;
        SetOutputValue(results);
      } else if (baseUnit === "oz" && resultUnit === "gms") {
        let results = inputValue * 28.35;
        SetOutputValue(results);
      } else if (baseUnit === "oz" && resultUnit === "kg") {
        let results = inputValue / 35.274;
        SetOutputValue(results);
      } else if (baseUnit === "oz" && resultUnit === "lbs") {
        let results = inputValue / 16;
        SetOutputValue(results);
      } else if (baseUnit === "lbs" && resultUnit === "gms") {
        let results = inputValue * 453.6;
        SetOutputValue(results);
      } else if (baseUnit === "lbs" && resultUnit === "kg") {
        let results = inputValue * 0.453592;
        SetOutputValue(results);
      } else if (baseUnit === "lbs" && resultUnit === "oz") {
        let results = inputValue * 16;
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
        <h4>WEIGHT CONVERSION</h4>

        <form onSubmit={calcWeight}>
          <div>
            <input
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
              {weights.map((tmp) => (
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
              disabled={true}
              onChange={(e) => SetOutputValue(e.target.value)}
            />

            <select
              name="resultUnit"
              value={resultUnit}
              onChange={(e) => SetResultUnit(e.target.value)}
            >
              {weights.map((tmp) => (
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

export default Weight;
