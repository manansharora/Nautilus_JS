import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const MoldingCalculatorFormOutput = ({result}) => {
    return (
        <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Part Weight</Form.Label>
                <Col sm={10}>
                    <Form.Control name="partWeight" type="number" value={result.partWeight} readOnly />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Runner Weight</Form.Label>
                <Col sm={10}>
                    <Form.Control name="runnerWeight" type="number" value={result.runnerWeight} readOnly />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Shot Weight</Form.Label>
                <Col sm={10}>
                    <Form.Control name="shotWeight" type="number" value={result.shotWeight} readOnly />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Approximate Residence Time</Form.Label>
                <Col sm={10}>
                    <Form.Control name="approximateResidenceTime" type="number" value={result.approximateResidenceTime} readOnly />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>% Usage of Barrel</Form.Label>
                <Col sm={10}>
                    <Form.Control name="percentUsageOfBarrel" type="number" value={result.percentUsageOfBarrel} readOnly />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Required Tonnage</Form.Label>
                <Col sm={10}>
                    <Form.Control name="requiredTonnage" type="number" value={result.requiredTonnage} readOnly />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Parts per hour</Form.Label>
                <Col sm={10}>
                    <Form.Control name="partsPerHour" type="number" value={result.partsPerHour} readOnly />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Parts per 8 hours</Form.Label>
                <Col sm={10}>
                    <Form.Control name="partsPerEightHour" type="number" value={result.partsPerEightHour} readOnly />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Parts per 24 hours</Form.Label>
                <Col sm={10}>
                    <Form.Control name="partsPerTwentyFourHour" type="number" value={result.partsPerTwentyFourHour} readOnly />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Time to mold 100 parts</Form.Label>
                <Col sm={10}>
                    <Form.Control name="moldTime" type="number" value={result.moldTime} readOnly />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Material required per hour</Form.Label>
                <Col sm={10}>
                    <Form.Control name="materialPerHour" type="number" value={result.materialPerHour} readOnly />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Material required per 8 hours</Form.Label>
                <Col sm={10}>
                    <Form.Control name="materialPerEightHour" type="number" value={result.materialPerEightHour} readOnly />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Material required per 24 hours</Form.Label>
                <Col sm={10}>
                    <Form.Control name="materialPerTwentyFourHour" type="number" value={result.materialPerTwentyFourHour} readOnly />
                </Col>
            </Form.Group>
        </Form>
        </div>
    )
}

export default MoldingCalculatorFormOutput
