import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const ProcessTransfer = ({calculateResult, result}) => {
    const [processInput, setProcessInput] = useState({
        intensificationRatio: 0,
        screwDiameter: 0,
        intensificationRatioTarget: 0,
        screwDiameterTarget: 0,
        shotSize: 0,
        transferPosition: 0,
        injectionPressure1: 0,
        injectionPressure2: 0,
        injectionPressure3: 0,
        fillTime: 0,
        holdingPressure1: 0,
        holdingPressure2: 0,
        holdingPressure3: 0,
        backPressure: 0,
        screwRPM: 0,
    });

    useEffect(() => {  
        let flag = true;
        for(let key in processInput) {
            if(processInput[key] <= 0)
                flag = false;
        }
        if(flag) {
            console.log("hello");
            calculateResult(processInput);
        }
    }, [ processInput ]);
    
    const handleChange = (event) => {
        setProcessInput(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
    };

    return (
        <Tabs
                defaultActiveKey="English Units"
                className="mb-3"
            >
        <Tab eventKey="English Units" title="English Units">
        <Form>
        <Table className="thistable" striped bordered hover variant="light" size="sm">
            <thead>
                <tr>
                    <td>Parameters</td>
                    <td>Value of Current Machine</td>
                    <td>Values for Machine under Consideration (English Units)</td>
                    <td>Values for Machine under Consideration (Metric Units 1)</td>
                    <td>Values for Machine under Consideration (Metric Units 2)</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Intensification Ratio (IR)</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                            <Form.Control name="intensificationRatio" type="number" value={processInput.intensificationRatio} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                            <Form.Control name="intensificationRatioTarget" type="number" value={processInput.intensificationRatioTarget} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td>-----</td>
                    <td>-----</td>
                </tr>
                <tr>
                    <td>Screw Diameter in mm</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                            <Form.Control name="screwDiameter" type="number" value={processInput.screwDiameter} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                            <Form.Control name="screwDiameterTarget" type="number" value={processInput.screwDiameterTarget} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td>-----</td>
                    <td>-----</td>
                </tr>
                <tr>
                    <td>Shot Size in inches</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                            <Form.Control name="shotSize" type="number" value={processInput.shotSize} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td>{result.shotSize}</td>
                    <td>{(result.shotSize * 25.4).toFixed(2)} (mm)</td>
                    <td>{(result.shotSize * 25.4).toFixed(2)} (mm)</td>
                </tr>
                <tr>
                    <td>Transfer position</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                            <Form.Control name="transferPosition" type="number" value={processInput.transferPosition} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td>-----</td>
                    <td>-----</td>
                    <td>-----</td>
                </tr>
                <tr>
                    <td>Shot Size Transfer</td>
                    <td>{result.shotSizeTransfer}</td>
                    <td></td>
                    <td>-----</td>
                    <td>-----</td>
                </tr>
                <tr>
                    <td>Injection Pressure 1 (psi)</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                            <Form.Control name="injectionPressure1" type="number" value={processInput.injectionPressure1} onChange={handleChange} size='sm' />
                        </Form.Group>
                    </td>
                    <td>{result.injectionPressure1}</td>
                    <td>{(result.injectionPressure1 * 0.0690).toFixed(2)} (bar)</td>
                    <td>{(result.injectionPressure1 * 0.00690).toFixed(2)} (mPa)</td>
                </tr>
                <tr>
                    <td>Injection Pressure 2 (psi)</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                        <Form.Control name="injectionPressure2" type="number" value={processInput.injectionPressure2} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td>{result.injectionPressure2}</td>
                    <td>{(result.injectionPressure2 * 0.0690).toFixed(2)} (bar)</td>
                    <td>{(result.injectionPressure2 * 0.00690).toFixed(2)} (mPa)</td>
                </tr>
                <tr>
                    <td>Injection Pressure 3 (psi)</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                        <Form.Control name="injectionPressure3" type="number" value={processInput.injectionPressure3} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td>{result.injectionPressure3}</td>
                    <td>{(result.injectionPressure3 * 0.0690).toFixed(2)} (bar)</td>
                    <td>{(result.injectionPressure3 * 0.00690).toFixed(2)} (mPa)</td>
                </tr>
                <tr>
                    <td>Fill Time (Sec) :</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                            <Form.Control name="fillTime" type="number" value={processInput.fillTime} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td>-----</td>
                    <td>-----</td>
                    <td>-----</td>
                </tr>
                <tr>
                    <td>Calo Inj Speed On Mach 1 :</td>
                    <td>{result.caloInjSpeed}</td>
                    <td></td>
                    <td>-----</td>
                    <td>-----</td>
                </tr>
                <tr>
                    <td>Holding Pressure 1 (psi)</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                            <Form.Control name="holdingPressure1" type="number" value={processInput.holdingPressure1} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td>{result.holdingPressure1}</td>
                    <td>{(result.holdingPressure1 * 0.0690).toFixed(2)} (bar)</td>
                    <td>{(result.holdingPressure1 * 0.00690).toFixed(2)} (mPa)</td>
                </tr>
                <tr>
                    <td>Holding Pressure 2 (psi)</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                            <Form.Control name="holdingPressure2" type="number" value={processInput.holdingPressure2} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td>{result.holdingPressure2}</td>
                    <td>{(result.holdingPressure1 * 0.0690).toFixed(2)} (bar)</td>
                    <td>{(result.holdingPressure2 * 0.00690).toFixed(2)} (mPa)</td>
                </tr>
                <tr>
                    <td>Holding Pressure 3 (psi)</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                            <Form.Control name="holdingPressure3" type="number" value={processInput.holdingPressure3} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td>{result.holdingPressure3}</td>
                    <td>{(result.holdingPressure1 * 0.0690).toFixed(2)} (bar)</td>
                    <td>{(result.holdingPressure3 * 0.00690).toFixed(2)} (mPa)</td>
                </tr>
                <tr>
                    <td>Back Pressure 1 (psi)</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                            <Form.Control name="backPressure" type="number" value={processInput.backPressure} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Screw rpm</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                            <Form.Control name="screwRPM" type="number" value={processInput.screwRPM} onChange={handleChange} size='sm' min="0" />
                        </Form.Group>
                    </td>
                    <td>{result.screwRPM}</td>
                    <td>{result.screwRPM}</td>
                    <td>{result.screwRPM}</td>
                </tr>
            </tbody>
        </Table>
        </Form>
        </Tab>
        <Tab eventKey="Metric Units - I" title="Metric Units - I">

        </Tab>
        <Tab eventKey="Metric Units - II" title="Metric Units - II">

        </Tab>
        </Tabs>
    )
}

export default ProcessTransfer