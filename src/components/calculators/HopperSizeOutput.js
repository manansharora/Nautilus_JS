import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HopperSizeOutput = ({result}) => {

    return (
        <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Min Dryer Size</Form.Label>
                <Col sm={10}>
                    <Form.Control name="screwDiameter" type="number" value={result.minSize} readOnly/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Max Dryer Size</Form.Label>
                <Col sm={10}>
                    <Form.Control name="shotWeight" type="number" value={result.maxSize} readOnly/>
                </Col>
            </Form.Group>
        </Form>
        </div>
    )
}

export default HopperSizeOutput