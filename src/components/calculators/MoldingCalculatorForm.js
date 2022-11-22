import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const MoldingCalculatorForm = ({calculateResult}) => {

    const [moldingCalculationsInput, setMoldingCalculationsInput] = useState({
        partVolume: 0,
        runnerVolume: 0,
        // partWeight: 0,
        // runnerWeight: 0,
        specificGravity: 0,
        projectedArea: 0,
        runnerProjectedArea: 0,
        numberOfRunners: 0,
        numberOfCavities: 0,
        averageCycleTime: 0,
        shotCapacity: 0,
        tonsPerInch: 0,
        screwDiameter: 0,
      });

    useEffect(() => {
        let flag = true;
        for(let key in moldingCalculationsInput) {
            if(moldingCalculationsInput[key] <= 0)
                flag = false;
        }

        if(flag)
            calculateResult(moldingCalculationsInput);
    }, [moldingCalculationsInput]);

    const handleChange = (event) => {
        setMoldingCalculationsInput(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
    };

    return (
        <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Part Volume</Form.Label>
                <Col sm={10}>
                    <Form.Control name="partVolume" type="number" value={moldingCalculationsInput.partVolume} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Runner Volume</Form.Label>
                <Col sm={10}>
                    <Form.Control name="runnerVolume" type="number" value={moldingCalculationsInput.runnerVolume} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <p>OR</p>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Part Weight</Form.Label>
                <Col sm={10}>
                    <Form.Control name="partWeight" type="number" disabled/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Runner Weight</Form.Label>
                <Col sm={10}>
                    <Form.Control name="runnerWeight" type="number" disabled/>
                </Col>
            </Form.Group>
            <hr />
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Specific Gravity</Form.Label>
                <Col sm={10}>
                    <Form.Control name="specificGravity" type="number" value={moldingCalculationsInput.specificGravity} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Projected Area</Form.Label>
                <Col sm={10}>
                    <Form.Control name="projectedArea" type="number" value={moldingCalculationsInput.projectedArea} onChange={handleChange} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Runner Projected Area</Form.Label>
                <Col sm={10}>
                    <Form.Control name="runnerProjectedArea" type="number" value={moldingCalculationsInput.runnerProjectedArea} onChange={handleChange} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Number of Runners</Form.Label>
                <Col sm={10}>
                    <Form.Control name="numberOfRunners" type="number" value={moldingCalculationsInput.numberOfRunners} onChange={handleChange} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Number of Cavities</Form.Label>
                <Col sm={10}>
                    <Form.Control name="numberOfCavities" type="number" value={moldingCalculationsInput.numberOfCavities} onChange={handleChange} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Average Cycle Time</Form.Label>
                <Col sm={10}>
                    <Form.Control name="averageCycleTime" type="number" value={moldingCalculationsInput.averageCycleTime} onChange={handleChange} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Shot Capacity</Form.Label>
                <Col sm={10}>
                    <Form.Control name="shotCapacity" type="number" value={moldingCalculationsInput.shotCapacity} onChange={handleChange} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Tons/Inch</Form.Label>
                <Col sm={10}>
                    <Form.Control name="tonsPerInch" type="number" value={moldingCalculationsInput.tonsPerInch} onChange={handleChange} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Screw Diameter</Form.Label>
                <Col sm={10}>
                    <Form.Control name="screwDiameter" type="number" value={moldingCalculationsInput.screwDiameter} onChange={handleChange} />
                </Col>
            </Form.Group>
        </Form>
        </div>
    )
}

export default MoldingCalculatorForm