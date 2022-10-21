import React, { useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import "../../assets/custom-stylesheet/app2_style.css";
import "../../assets/custom-stylesheet/samplepage_style.css";
import "../App.css";
import "../../assets/custom-stylesheet/grid_stylecss.css";
import Calculators from "../calculators/Calculators";
import MoldingCalculatorForm from "../calculators/MoldingCalculatorForm";

const CalculatorGrid = () => {
    return (
        <>
            <div>
                <Breadcrumb title="Calculators" parent="Dashboard" />
            </div>
            <div id="Container" className="container-fluid">
                <div className="card mt-4">
                    <button className="btn btn-pill btn-primary btn-air-primary m-4" type="button">Molding Calculator</button>
                    <MoldingCalculatorForm />
                </div>
            </div>
        </>
    );
};

export default CalculatorGrid;

//divide into 2 cols: left is i/p component, ...
//onchange for ip, ip component has 3 col grid
