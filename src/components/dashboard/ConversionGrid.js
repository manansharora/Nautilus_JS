import React from "react";
import Breadcrumb from "../common/breadcrumb";
import "../../assets/custom-stylesheet/app2_style.css";
import "../../assets/custom-stylesheet/samplepage_style.css";
import "../App.css";
import "../../assets/custom-stylesheet/grid_stylecss.css";
import Conversions from "../conversions/Conversions";


const ConversionGrid = () => {
    return (
        <>
            <div>
                <Breadcrumb title="Conversions" parent="Dashboard" />
            </div>
            <div>
                <Conversions />
            </div>
        </>
    );
};

export default ConversionGrid;

