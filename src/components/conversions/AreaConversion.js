import React, { useState } from "react";
import "./style.css";

const Areas = () => {
  const [inputValue, SetInputValue] = useState("");
  const [outputValue, SetOutputValue] = useState("");
  const [baseUnit, SetBaseUnit] = useState("sqmm");
  const [resultUnit, SetResultUnit] = useState("sqmm");
  const areas = ["sqmm", "sqcm", "sqm", "sqin", "sqfeet"];

  let calcArea = (event) => {
    // function to calculate area conversions
    event.preventDefault(); //prevent submitting

    if (inputValue.isNaN) {
      alert("Please enter a value");
    } else if (baseUnit === resultUnit) {
      SetOutputValue(inputValue);
    } else {
      if (baseUnit === "sqmm" && resultUnit === "sqcm") {
        let results = inputValue * 0.01;
        SetOutputValue(results);
      } else if (baseUnit === "sqmm" && resultUnit === "sqm") {
        let results = inputValue * 0.000001;
        SetOutputValue(results);
      } else if (baseUnit === "sqmm" && resultUnit === "sqin") {
        let results = inputValue * 0.00155;
        SetOutputValue(results);
      } else if (baseUnit === "sqmm" && resultUnit === "sqfeet") {
        let results = inputValue * 0.000010764;
        SetOutputValue(results);
      } else if (baseUnit === "sqcm" && resultUnit === "sqmm") {
        let results = inputValue * 100;
        SetOutputValue(results);
      } else if (baseUnit === "sqcm" && resultUnit === "sqm") {
        let results = inputValue * 0.0001;
        SetOutputValue(results);
      } else if (baseUnit === "sqcm" && resultUnit === "sqin") {
        let results = inputValue * 0.155;
        SetOutputValue(results);
      } else if (baseUnit === "sqcm" && resultUnit === "sqfeet") {
        let results = inputValue * 0.00107639;
        SetOutputValue(results);
      } else if (baseUnit === "sqm" && resultUnit === "sqmm") {
        let results = inputValue * 1000000;
        SetOutputValue(results);
      } else if (baseUnit === "sqm" && resultUnit === "sqcm") {
        let results = inputValue * 10000;
        SetOutputValue(results);
      } else if (baseUnit === "sqm" && resultUnit === "sqin") {
        let results = inputValue * 1550;
        SetOutputValue(results);
      } else if (baseUnit === "sqm" && resultUnit === "sqfeet") {
        let results = inputValue * 10.764;
        SetOutputValue(results);
      } else if (baseUnit === "sqin" && resultUnit === "sqmm") {
        let results = inputValue * 645.16;
        SetOutputValue(results);
      } else if (baseUnit === "sqin" && resultUnit === "sqcm") {
        let results = inputValue * 6.4516;
        SetOutputValue(results);
      } else if (baseUnit === "sqin" && resultUnit === "sqm") {
        let results = inputValue * 0.00064516;
        SetOutputValue(results);
      } else if (baseUnit === "sqin" && resultUnit === "sqfeet") {
        let results = inputValue / 144;
        SetOutputValue(results);
      } else if (baseUnit === "sqfeet" && resultUnit === "sqmm") {
        let results = inputValue * 92900;
        SetOutputValue(results);
      } else if (baseUnit === "sqfeet" && resultUnit === "sqcm") {
        let results = inputValue * 929;
        SetOutputValue(results);
      } else if (baseUnit === "sqfeet" && resultUnit === "sqm") {
        let results = inputValue * 0.092903;
        SetOutputValue(results);
      } else if (baseUnit === "sqfeet" && resultUnit === "sqin") {
        let results = inputValue * 144;
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
        <h4>AREA CONVERSION</h4>

        <form onSubmit={calcArea}>
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
                {areas.map((tmp) => (
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
                {areas.map((tmp) => (
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

export default Areas;
