import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HopperSizeOutput = () => {

    const [shotSizeData, setShotSizeData] = useState({
        screwDiameter: 0,
        shotWeight: 0,
        materialDensity: 0
    });
    const[shotSizeResult, setShotSizeResult] = useState(0);
    
    const handleChange = (event) => {
        setShotSizeData({ ...shotSizeData, [event.target.name]: event.target.value });
        calculateResult();
    };

    const calculateResult = () => {
        let sd = shotSizeData.screwDiameter
        let sw = shotSizeData.shotWeight
        let md = shotSizeData.materialDensity

        if(sd != 0 && sw != 0 && md != 0) {
            console.log("exec");
            let res = (sw * 1000) / (0.785 * md * sd * sw);
            setShotSizeResult(res.toFixed(4));
        }
    }

    return (
        <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Min Dryer Size</Form.Label>
                <Col sm={10}>
                    <Form.Control name="screwDiameter" type="number" value={shotSizeData.screwDiameter} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Max Dryer Size</Form.Label>
                <Col sm={10}>
                    <Form.Control name="shotWeight" type="number" value={shotSizeData.shotWeight} onChange={handleChange}/>
                </Col>
            </Form.Group>
        </Form>
        </div>
    )
}

export default HopperSizeOutput