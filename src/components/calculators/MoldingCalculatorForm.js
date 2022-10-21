import React, { useState } from 'react'

const MoldingCalculatorForm = () => {

    const [moldingCalculationsInput, setMoldingCalculationsInput] = useState({
        partVolume: "",
        runnerVolume: "",
        specificGravity: "",
        projectedArea: "",
        runnerProjectedArea: "",
        numberOfRunners: "",
        numberOfCavities: "",
        averageCycleTime: "",
        shotCapacity: "",
        tonsPerInch: "",
        screwDiameter: "",
      });

    const handleChange = (event) => {
        setMoldingCalculationsInput({ ...moldingCalculationsInput, [event.target.name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("moldingCalculationsInput");
      };

    return (
        <div className="d-flex flex-column mb-3">
        <form onSubmit={onSubmit}>
            <div>
                <h3>Molding Calculations</h3>
            </div> 
            <div className="p-2">
                Part Volume: <input type="number" name="partVolume" value={moldingCalculationsInput.partVolume} onChange={handleChange} />
            </div>
            <div className="p-2">
                Runner Volume: <input type="number" name="runnerVolume" value={moldingCalculationsInput.runnerVolume} onChange={handleChange} />
            </div>
            <div className="p-2">
                Specific Gravity: <input type="number" name="specificGravity" value={moldingCalculationsInput.specificGravity} onChange={handleChange} />
            </div>
            <div className="p-2">
                Projected Area: <input type="number" name="projectedArea" value={moldingCalculationsInput.projectedArea} onChange={handleChange} />
            </div>
            <div className="p-2">
                Runner Projected Area: <input type="number" name="runnerProjectedArea" value={moldingCalculationsInput.runnerProjectedArea} onChange={handleChange} />
            </div>
            <div className="p-2">
                Number of Runners: <input type="number" name="numberOfRunners" value={moldingCalculationsInput.numberOfRunners} onChange={handleChange} />
            </div>
            <div className="p-2">
                Number of Cavities: <input type="number" name="numberOfCavities" value={moldingCalculationsInput.numberOfCavities} onChange={handleChange} />
            </div>
            <div className="p-2">
                Average Cycle Time: <input type="number" name="averageCycleTime" value={moldingCalculationsInput.averageCycleTime} onChange={handleChange} />
            </div>
            <div className="p-2">
                Shot Capacity: <input type="number" name="shotCapacity" value={moldingCalculationsInput.shotCapacity} onChange={handleChange} />
            </div>
            <div className="p-2">
                Tons/Inch: <input type="number" name="tonsPerInch" value={moldingCalculationsInput.tonsPerInch} onChange={handleChange} />
            </div>
            <div className="p-2">
                Screw Diameter: <input type="number" name="screwDiameter" value={moldingCalculationsInput.screwDiameter} onChange={handleChange} />
            </div>
            <div>
                <button type="submit">Calculate</button>
            </div>
        </form>
        </div>
    )
}

export default MoldingCalculatorForm