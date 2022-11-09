import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MoldingCalculatorForm = ({addInput}) => {

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
        //addInput(moldingCalculationsInput);
        console.log(moldingCalculationsInput);
    };

    return (
        <div className="d-flex flex-column mb-3">
        <Form onSubmit={onSubmit}>
            <div>
                <h3>Molding Calculations</h3>
            </div> 
            <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Col sm={10}>
                    <Form.Control type="email" placeholder="Enter email" />
                </Col>
            </Form.Group>
            <div className="p-2">
                Part Volume: <input type="text" name="partVolume" value={moldingCalculationsInput.partVolume} onChange={handleChange} />
            </div>
            <div className="p-2">
                Runner Volume: <input type="text" name="runnerVolume" value={moldingCalculationsInput.runnerVolume} onChange={handleChange} />
            </div>
            <div className="p-2">
                Specific Gravity: <input type="text" name="specificGravity" value={moldingCalculationsInput.specificGravity } onChange={handleChange} />
            </div>
            <div className="p-2">
                Projected Area: <input type="text" name="projectedArea" value={moldingCalculationsInput.projectedArea} onChange={handleChange} />
            </div>
            <div className="p-2">
                Runner Projected Area: <input type="text" name="runnerProjectedArea" value={moldingCalculationsInput.runnerProjectedArea} onChange={handleChange} />
            </div>
            <div className="p-2">
                text of Runners: <input type="text" name="numberOfRunners" value={moldingCalculationsInput.numberOfRunners} onChange={handleChange} />
            </div>
            <div className="p-2">
                Number of Cavities: <input type="text" name="numberOfCavities" value={moldingCalculationsInput.numberOfCavities} onChange={handleChange} />
            </div>
            <div className="p-2">
                Average Cycle Time: <input type="text" name="averageCycleTime" value={moldingCalculationsInput.averageCycleTime} onChange={handleChange} />
            </div>
            <div className="p-2">
                Shot Capacity: <input type="text" name="shotCapacity" value={moldingCalculationsInput.shotCapacity} onChange={handleChange} />
            </div>
            <div className="p-2">
                Tons/Inch: <input type="text" name="tonsPerInch" value={moldingCalculationsInput.tonsPerInch} onChange={handleChange} />
            </div>
            <div className="p-2">
                Screw Diameter: <input type="text" name="screwDiameter" value={moldingCalculationsInput.screwDiameter} onChange={handleChange} />
            </div>
            <div>
                <button type="submit">Calculate</button>
            </div>
        </Form>
        </div>
    )
}

export default MoldingCalculatorForm
