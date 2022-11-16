import React, { useState } from 'react';
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
        addInput(moldingCalculationsInput);
        console.log(moldingCalculationsInput);
        alert('submitted');
    };

    return (
        <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Part Volume</Form.Label>
                <Col sm={10}>
                    <Form.Control name="screwDiameter" type="number" value={0} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Runner Volume</Form.Label>
                <Col sm={10}>
                    <Form.Control name="shotWeight" type="number" value={0} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <hr />
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Specific Gravity</Form.Label>
                <Col sm={10}>
                    <Form.Control name="materialDensity" type="number" value={0} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Projected Area</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Runner Projected Area</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Number of Runners</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Number of Cavities</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Average Cycle Time</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Shot Capacity</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Tons/Inch</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Screw Diameter</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
        </Form>
        </div>
    )
}

export default MoldingCalculatorForm