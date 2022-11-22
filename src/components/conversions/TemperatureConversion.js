import React, { useState } from "react";
import "./style.css";

const Temperature = () => {
  const [inputValue, SetInputValue] = useState("");
  const [outputValue, SetOutputValue] = useState("");
  const [baseUnit, SetBaseUnit] = useState("degree celcius");
  const [resultUnit, SetResultUnit] = useState("degree fahrenheit");
  const temperature = ["degree celcius", "degree fahrenheit"];

  let calcTemperature = (event) => {
    // function to calculate area conversions
    event.preventDefault(); //prevent submitting

    if (inputValue.isNaN) {
      alert("Please enter a value");
    } else if (baseUnit === resultUnit) {
      SetOutputValue(inputValue);
    } else {
      if (baseUnit === "degree celcius" && resultUnit === "degree fahrenheit") {
        let results = (inputValue * 1.8000)+32;
        SetOutputValue(results);
      } else if (baseUnit === "degree fahrenheit" && resultUnit === "degree celcius") {
        let results = ((inputValue-32)*5)/9;
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
        <h4>TEMPERATURE CONVERSION</h4>

        <form onSubmit={calcTemperature}>
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
                {temperature.map((tmp) => (
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
                {temperature.map((tmp) => (
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

export default Temperature;


// import React, { Component } from "react";
// import "./style.css";

// class Temperature extends Component {
//   state = {
//     temperature: ["Celcius", "Fahrenheit", "Kelvin"],
//     base: "Celcius",
//     temp: "",
//     convertTo: "",
//     result: "",
//   };

//   handleSelect = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     }
//     );
//   };

//   handleInput = (e) => {
//     this.setState({
//       temp: e.target.value,
//     },
//     this.calculate
//     );
//   };

//   calculate = () => {
//     const temp=this.state.temp;
//     const base=this.state.base;
//     const convertTo=this.state.convertTo;
//     const result=this.state.result;
    
    
//       result=10*temp;
//       this.setState({
//         temp,
//           result
//             })
        
    
//   };

  
//   render() {
//     const { temperature, base, temp, convertTo, result } = this.state;
//     return (
//       <div>
//         <div className="conversion">
//           <form className="form-inline mb-4 ">
//             <input
//             type="number"
//               value={temp}
//               onChange={this.handleInput}
//               classname="form-control form-control-lg mx-3"
//             ></input>
//             <select
//               name="base"
//               value={base}
//               onChange={this.handleSelect}
//               classname="form-control form-control-lg"
//             >
//               {temperature.map((tmp) => (
//                 <option key={tmp} value={tmp}>
//                   {tmp}
//                 </option>
//               ))}
//             </select>
//           </form>

//           <form className="form-inline mb-4">
//             <input
//             value={result}
//               disable={true}
//               classname="form-control form-control-lg mx-3"
//             ></input>
//             <select
//               name="convertTo"
//               value={convertTo}
//               onChange={this.handleSelect}
//               classname="form-control form-control-lg"
//             >
//               {temperature.map((tmp) => (
//                 <option key={tmp} value={tmp}>
//                   {tmp}
//                 </option>
//               ))}
//             </select>
//           </form>
//           {/* <h5>
//             {temp}
//             {base} is equivalent to {result}
//             {convertTo}
//           </h5> */}
//         </div>
//       </div>
//     );
//   }
// }

// export default Temperature;
