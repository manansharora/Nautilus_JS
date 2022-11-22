import React, { useState } from "react";
import "../App.css";
import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Areas from './AreaConversion';
import Distance from './DistanceConversion';
import Temperature from './TemperatureConversion';
import Volume from './VolumeConversion';
import Weight from './WeightConversion';
import Pressure from './PressureConversion';
import Tonnage from './TonnageConversion';

const Conversions = () => {
  

  return (
    
    <>
      
      <Tabs defaultActiveKey="Area" className="mb-3" fill>
        <Tab eventKey="Area" title="Area">
          <Container>
            <Row>
              <Col>
                <Areas />
              </Col>
              
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="Distance" title="Distance">
          <Container>
            <Row>
              <Col>
                <Distance />
              </Col>
              
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="Temperature" title="Temperature">
          <Container>
            <Row>
              <Col>
                <Temperature />
              </Col>
              
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="Volume" title="Volume">
          <Container>
            <Row>
              <Col>
                <Volume />
              </Col>
              
            </Row>
          </Container>
        </Tab>

        <Tab eventKey="Weight" title="Weight">
          <Container>
            <Row>
              <Col>
                <Weight />
              </Col>
              
            </Row>
          </Container>
        </Tab>

        <Tab eventKey="Pressure" title="Pressure">
          <Container>
            <Row>
              <Col>
                <Pressure />
              </Col>
              
            </Row>
          </Container>
        </Tab>

        <Tab eventKey="Tonnage" title="Tonnage">
          <Container>
            <Row>
              <Col>
                <Tonnage />
              </Col>
              
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </>
  );
};

export default Conversions;
