import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const MinFlowRateEnglish = () => {

    const [waterFlowData, setWaterFlowData] = useState({
        pipeDiameter: 0,
        waterTemperature: 0,
        minGPM: 0,
    });

    const [waterFlowResult, setWaterFlowResult] = useState(0);

    useEffect(() => {
        calculateResult();
    }, [waterFlowData]);
    
    const handleChange = (event) => {
        setWaterFlowData(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
    };

    const calculateResult = () => {
        let pd = waterFlowData.pipeDiameter;
        let wt = waterFlowData.waterTemperature;

        if(pd > 0 && wt > 0) {
            let ans = 1.27 * (pd * viscosity(wt));
            setWaterFlowResult(ans.toFixed(2));
        }
    }

    const viscosity = (temperature) => {
        const A = 2.414 * 10**-2;
        const B = 247.8;
        const C = 140;

        return ((A * 10 * B) / Math.abs(temperature - C));
    }

    return (
        <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Pipe Diameter (inches)</Form.Label>
                <Col sm={10}>
                    <Form.Control name="pipeDiameter" type="number" value={waterFlowData.pipeDiameter} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Water Temperature (deg F)</Form.Label>
                <Col sm={10}>
                    <Form.Control name="waterTemperature" type="number" value={waterFlowData.waterTemperature} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Min Required GPM for turbulent flow (Re greater than 4000)</Form.Label>
                <Col sm={10}>
                    <Form.Control name="minGPM" type="number" value={waterFlowResult} readOnly />
                </Col>
            </Form.Group>
        </Form>
        </div>
    )
}

export default MinFlowRateEnglish