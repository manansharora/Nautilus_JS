import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const FlowTypeEnglish = () => {

    const [waterFlowData, setWaterFlowData] = useState({
        pipeDiameter: 0,
        waterTemperature: 0,
        flowRate: 0,
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
        let fr = waterFlowData.flowRate;

        if(pd > 0 && wt > 0 && fr > 0) {
            let ans = ((3160 * fr) / (pd * 25.4 * viscosity(wt)));
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
                <Form.Label>Pipe Diameter (mm)</Form.Label>
                <Col sm={10}>
                    <Form.Control name="pipeDiameter" type="number" value={waterFlowData.pipeDiameter} onChange={handleChange} min="0" />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Water Temperature</Form.Label>
                <Col sm={10}>
                    <Form.Control name="waterTemperature" type="number" value={waterFlowData.waterTemperature} onChange={handleChange} min="0" />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Flow Rate</Form.Label>
                <Col sm={10}>
                    <Form.Control name="flowRate" type="number" value={waterFlowData.flowRate} onChange={handleChange} min="0" />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Actual Reynold's Number</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={waterFlowResult} readOnly />
                </Col>
            </Form.Group>
        </Form>
        </div>
    )
}

export default FlowTypeEnglish