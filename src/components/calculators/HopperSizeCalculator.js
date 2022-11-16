import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HopperSizeCalculator = ({calculateResult}) => {

    const [hopperSizeData, setHopperSizeData] = useState({
        minDryingTime: 0,
        maxDryingTime: 0,
        shotWeight: 0,
        cycleTime: 0,
    });

    useEffect(() => {  
        //if(Object.values(hopperSizeData).every(x => x > 0)) {
        if(hopperSizeData.minDryingTime > 0 && hopperSizeData.maxDryingTime > 0 && hopperSizeData.shotWeight > 0 && hopperSizeData.cycleTime > 0) {
            console.log(Object.values(hopperSizeData));
            console.log("yes")
            calculateResult(hopperSizeData);
        }
    }, [ hopperSizeData ]);
    
    const handleChange = (event) => {
        setHopperSizeData(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
    };

    return (
        <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Drying Time Min (Hours)</Form.Label>
                <Col sm={10}>
                    <Form.Control name="minDryingTime" type="number" value={hopperSizeData.minDryingTime} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Drying Time Max (Hours)</Form.Label>
                <Col sm={10}>
                    <Form.Control name="maxDryingTime" type="number" value={hopperSizeData.maxDryingTime} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Shot Weight</Form.Label>
                <Col sm={10}>
                    <Form.Control name="shotWeight" type="number" value={hopperSizeData.shotWeight} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Cycle Time (sec)</Form.Label>
                <Col sm={10}>
                    <Form.Control name="cycleTime" type="number" value={hopperSizeData.cycleTime} onChange={handleChange}/>
                </Col>
            </Form.Group>
        </Form>
        </div>
    )
}

export default HopperSizeCalculator