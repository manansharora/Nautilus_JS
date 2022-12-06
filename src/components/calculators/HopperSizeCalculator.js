import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
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
        let flag = true;
        for(let key in hopperSizeData) {
            if(hopperSizeData[key] <= 0)
                flag = false;
        }
        if(flag) {
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
                    <Form.Control name="minDryingTime" type="number" value={hopperSizeData.minDryingTime} onChange={handleChange} min="0" />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Drying Time Max (Hours)</Form.Label>
                <Col sm={10}>
                    <Form.Control name="maxDryingTime" type="number" value={hopperSizeData.maxDryingTime} onChange={handleChange} min="0" />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Shot Weight</Form.Label>
                <Col sm={10}>
                    <Form.Control name="shotWeight" type="number" value={hopperSizeData.shotWeight} onChange={handleChange} min="0" />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Cycle Time (sec)</Form.Label>
                <Col sm={10}>
                    <Form.Control name="cycleTime" type="number" value={hopperSizeData.cycleTime} onChange={handleChange} min="0" />
                </Col>
            </Form.Group>
        </Form>
        </div>
    )
}

export default HopperSizeCalculator