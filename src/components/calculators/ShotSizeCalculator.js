import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ShotSizeCalculator = () => {

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
            <Form.Group as={Row} className="mb-3" controlId="formBasicnumber">
                <Form.Label>Screw Diameter (mm)</Form.Label>
                <Col sm={10}>
                    <Form.Control name="screwDiameter" type="number" value={shotSizeData.screwDiameter} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formBasicnumber">
                <Form.Label>Shot Weight (gms)</Form.Label>
                <Col sm={10}>
                    <Form.Control name="shotWeight" type="number" value={shotSizeData.shotWeight} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formBasicnumber">
                <Form.Label>Material Density (gms/cm^3)</Form.Label>
                <Col sm={10}>
                    <Form.Control name="materialDensity" type="number" value={shotSizeData.materialDensity} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formBasicnumber">
                <Form.Label>Estimated Shot Size (mm)</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={shotSizeResult} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formBasicnumber">
                <Form.Label>Estimated Shot Size (cm)</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={shotSizeResult / 100} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formBasicnumber">
                <Form.Label>Estimated Shot Size (inches)</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={shotSizeResult / 0.0393701} />
                </Col>
            </Form.Group>
        </Form>
        </div>
    )
}

export default ShotSizeCalculator
