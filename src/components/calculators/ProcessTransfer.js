import React from 'react'
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const ProcessTransfer = () => {
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
                            <Form.Control name="screwDiameter" type="number" value="0" size='sm' />
                        </Form.Group>
                    </td>
                    <td></td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Screw Diameter in mm</td>
                    <td>
                        <Form.Group className="thisform" controlId="formBasicnumber">
                        <Col>
                            <Form.Control name="screwDiameter" type="number" value="0" size='sm' />
                        </Col>
                        </Form.Group>
                    </td>
                    <td></td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Shot Size in inches</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Transfer position</td>
                    <td></td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Shot Size Transfer :</td>
                    <td></td>
                    <td></td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Injection Pressure 1 (psi)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Injection Pressure 2 (psi)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Injection Pressure 3 (psi)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Fill Time (Sec) :</td>
                    <td></td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Calo Inj Speed On Mach 1 :</td>
                    <td></td>
                    <td></td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Holding Pressure 1 (psi)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Holding Pressure 2 (psi)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Holding Pressure 3 (psi)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Back Pressure 1 (psi)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Screw rpm</td>
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