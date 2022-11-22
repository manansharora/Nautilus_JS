import React from "react";
import {Link} from 'react-router-dom';
import './style.css';


export const conversionButton = () =>{
    return(
        <div>
        <Link to="dashboard/conversions">
            <button className="convButton"></button>
        </Link>
        </div>
    )
}