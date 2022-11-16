import React, { useState } from 'react'
import '../App.css';
import MoldingCalculatorForm from './MoldingCalculatorForm';
import MoldingCalculatorFormOutput from './MoldingCalculatorFormOutput';
import ShotSizeCalculator from './ShotSizeCalculator';
import ShotSizeTable from './ShotSizeTable';
import HopperSizeCalculator from './HopperSizeCalculator';
import HopperSizeOutput from './HopperSizeOutput';
import WaterTable from './waterFlowCalcs/WaterTable';
import FlowTypeMetric from './waterFlowCalcs/FlowTypeMetric';
import FlowTypeEnglish from './waterFlowCalcs/FlowTypeEnglish';
import MinFlowRateEnglish from './waterFlowCalcs/MinFlowRateEnglish';
import MinFlowRateMetric from './waterFlowCalcs/MinFlowRateMetric';
import './style.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const Calculators = () => {
    const [moldingResult, setMoldingResult] = useState({
        minSize: 0,
        maxSize: 0,
    });

    const [hopperSizeResult, setHopperSizeResult] = useState({
        minSize: 0,
        maxSize: 0,
    });

    const calculateHopperSizeResult = (hopperSizeData) => {
        let minSizeCalc = (hopperSizeData.minDryingTime * 3600 * hopperSizeData.shotWeight) / hopperSizeData.cycleTime;
        let maxSizeCalc = (hopperSizeData.maxDryingTime * 3600 * hopperSizeData.shotWeight) / hopperSizeData.cycleTime;
        setHopperSizeResult({ minSize: minSizeCalc.toFixed(4), maxSize: maxSizeCalc.toFixed(4) });
    }

    // const onSubmit = (event) => {
    //     event.preventDefault();
    //     //addInput(moldingCalculationsInput);
    //     console.log("kdjf");
    // };

    return (
        // <div className='rowC'>
        //     <MoldingCalculatorForm addInput={addMoldingCalculatorInput} />
        //     <MoldingCalculatorFormOutput output={moldingCalculationsInput} />
        // </div>
        // <div className='rowC'>
        //     <ShotSizeCalculator />
        // </div>
        <>
            {/* <Container>
                <Row>
                    <Col>1 of 2</Col>
                    <Col>2 of 2</Col>
                </Row>
                <Row>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container> */}
            <Tabs
                defaultActiveKey="Molding Calculator"
                className="mb-3"
                fill
            >
            <Tab eventKey="Molding Calculator" title="Molding Calculator">
            <Container>
                <Row>
                    <Col>
                        <MoldingCalculatorForm />
                    </Col>
                    <Col>
                        <MoldingCalculatorFormOutput />
                    </Col>
                </Row>
            </Container>
            </Tab>
            <Tab eventKey="Shot Size Estimation" title="Shot Size Estimation">
                <Container>
                    <Row>
                        <Col>
                            <ShotSizeCalculator />
                        </Col>
                        <Col>
                            <ShotSizeTable />
                        </Col>
                    </Row>
                </Container>
            </Tab>
            <Tab eventKey="Hopper Size Calculations" title="Hopper Size Calculations">
                <Container>
                    <Row>
                        <Col>
                            <HopperSizeCalculator calculateResult={calculateHopperSizeResult} />
                        </Col>
                        <Col>
                            <HopperSizeOutput result={hopperSizeResult} />
                        </Col>
                    </Row>
                </Container>
            </Tab>
            <Tab eventKey="Regrind Calculations" title="Regrind Calculations">
                
            </Tab>
            <Tab eventKey="Water Flow Calculations" title="Water Flow Calculations">
                <Container>
                    <Row>
                        <Col>
                            <FlowTypeEnglish />
                        </Col>
                        <Col>
                            <MinFlowRateEnglish />
                        </Col>
                        <Col>
                            <FlowTypeMetric />
                        </Col>
                        <Col>
                            <MinFlowRateMetric />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <WaterTable toDisplay={1} />
                        </Col>
                        <Col>
                            <WaterTable toDisplay={2} />
                        </Col>
                    </Row>
                </Container>
            </Tab>
            <Tab eventKey="Process Transfer" title="Process Transfer">
                
            </Tab>
            </Tabs>
        </>
    )
}

export default Calculators
    