import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const MoldingCalculatorFormOutput = ({output}) => {
    return (
        <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Part Weight</Form.Label>
                <Col sm={10}>
                    <Form.Control name="screwDiameter" type="number" value={0} disabled />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Runner Weight</Form.Label>
                <Col sm={10}>
                    <Form.Control name="shotWeight" type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Shot Weight</Form.Label>
                <Col sm={10}>
                    <Form.Control name="materialDensity" type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Approximate Residence Time</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>% Usage of Barrel</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Required Tonnage</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Parts per hour</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Parts per 8 hours</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Parts per 24 hours</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Time to mold 100 parts</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Material required per hour</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Material required per 8 hours</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Material required per 24 hours</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" value={0} />
                </Col>
            </Form.Group>
        </Form>
        </div>
    )
}

export default MoldingCalculatorFormOutput
