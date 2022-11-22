import React, { useState } from "react";
import "../App.css";
import MoldingCalculatorForm from "./MoldingCalculatorForm";
import MoldingCalculatorFormOutput from "./MoldingCalculatorFormOutput";
import ShotSizeCalculator from "./ShotSizeCalculator";
import ShotSizeTable from "./ShotSizeTable";
import RegrindCalculator from "./RegrindCalculator";
import RegrindOutputTables from "./RegrindOutputTables";
import HopperSizeCalculator from "./HopperSizeCalculator";
import HopperSizeOutput from "./HopperSizeOutput";
import WaterTable from "./waterFlowCalcs/WaterTable";
import FlowTypeMetric from "./waterFlowCalcs/FlowTypeMetric";
import FlowTypeEnglish from "./waterFlowCalcs/FlowTypeEnglish";
import MinFlowRateEnglish from "./waterFlowCalcs/MinFlowRateEnglish";
import MinFlowRateMetric from "./waterFlowCalcs/MinFlowRateMetric";
import ProcessTransfer from "./ProcessTransfer";
import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Calculators = () => {
  const [moldingResult, setMoldingResult] = useState({
    partWeight: 0,
    runnerWeight: 0,
    shotWeight: 0,
    approximateResidenceTime: 0,
    percentUsageOfBarrel: 0,
    requiredTonnage: 0,
    partsPerHour: 0,
    partsPerEightHour: 0,
    partsPerTwentyFourHour: 0,
    moldTime: 0,
    materialPerHour: 0,
    materialPerEightHour: 0,
    materialPerTwentyFourHour: 0,
  });

  const [hopperSizeResult, setHopperSizeResult] = useState({
    minSize: 0,
    maxSize: 0,
  });

  const [processResult, setProcessResult] = useState({
    shotSize: 0,
    transferPosition: 0,
    shotSizeTransfer: 0,
    injectionPressure1: 0,
    injectionPressure2: 0,
    injectionPressure3: 0,
    fillTime: 0,
    caloInjSpeed: 0,
    holdingPressure1: 0,
    holdingPressure2: 0,
    holdingPressure3: 0,
    backPressure: 0,
    screwRPM: 0,
});

  const calculateHopperSizeResult = (hopperSizeData) => {
    let minSizeCalc =
      (hopperSizeData.minDryingTime * 3600 * hopperSizeData.shotWeight) /
      hopperSizeData.cycleTime;
    let maxSizeCalc =
      (hopperSizeData.maxDryingTime * 3600 * hopperSizeData.shotWeight) /
      hopperSizeData.cycleTime;
    setHopperSizeResult({
      minSize: minSizeCalc.toFixed(4),
      maxSize: maxSizeCalc.toFixed(4),
    });
  };

  const calculateMoldingCalculations = (moldingCalculationsInput) => {
    let partWeightCalc = moldingCalculationsInput.partVolume * moldingCalculationsInput.specificGravity;
    let runnerWeightCalc = moldingCalculationsInput.runnerVolume * moldingCalculationsInput.specificGravity;
    let shotWeightCalc = ((partWeightCalc * moldingCalculationsInput.numberOfCavities) + (runnerWeightCalc * moldingCalculationsInput.numberOfRunners));
    let approximateResidenceTimeCalc = (moldingCalculationsInput.shotCapacity / (shotWeightCalc * (moldingCalculationsInput.specificGravity / 1.06)) * moldingCalculationsInput.averageCycleTime);
    let percentUsageOfBarrelCalc = (shotWeightCalc * ((moldingCalculationsInput.specificGravity / 1.06) / moldingCalculationsInput.shotCapacity) * 100);
    let requiredTonnageCalc = ((moldingCalculationsInput.projectedArea * moldingCalculationsInput.numberOfCavities) + (moldingCalculationsInput.runnerProjectedArea * moldingCalculationsInput.numberOfRunners * moldingCalculationsInput.tonsPerInch));
    let partsPerHourCalc = (3600 / moldingCalculationsInput.averageCycleTime);
    let partsPerEightHourCalc = (3600 / moldingCalculationsInput.averageCycleTime) * 8;
    let partsPerTwentyFourHourCalc = (3600 / moldingCalculationsInput.averageCycleTime) * 24;
    let moldTimeCalc = ((100 / moldingCalculationsInput.numberOfCavities) * moldingCalculationsInput.averageCycleTime) / 60;
    let materialPerHourCalc = ((3600 / moldingCalculationsInput.averageCycleTime) * shotWeightCalc);
    let materialPerEightHourCalc = ((3600 / moldingCalculationsInput.averageCycleTime) * shotWeightCalc) * 8;
    let materialPerTwentyFourHourCalc = ((3600 / moldingCalculationsInput.averageCycleTime) * shotWeightCalc) * 24;

    setMoldingResult({
      partWeight: partWeightCalc,
      runnerWeight: runnerWeightCalc,
      shotWeight: shotWeightCalc,
      approximateResidenceTime: approximateResidenceTimeCalc,
      percentUsageOfBarrel: percentUsageOfBarrelCalc,
      requiredTonnage: requiredTonnageCalc,
      partsPerHour: partsPerHourCalc,
      partsPerEightHour: partsPerEightHourCalc,
      partsPerTwentyFourHour: partsPerTwentyFourHourCalc,
      moldTime: moldTimeCalc,
      materialPerHour: materialPerHourCalc,
      materialPerEightHour: materialPerEightHourCalc,
      materialPerTwentyFourHour: materialPerTwentyFourHourCalc,
    })
  };

  const calculateProcessResult = (processInput) => {
    let shotSizeCalc = Math.pow((processInput.screwDiameter / processInput.screwDiameterTarget), 2) * processInput.shotSize;
    let shotSizeTransferCalc = processInput.shotSize - processInput.transferPosition;
    let intensificationRatioCalc = (processInput.intensificationRatio / processInput.intensificationRatioTarget); 
    let screwRPMCalc = (processInput.screwDiameter / processInput.screwDiameterTarget) * processInput.screwRPM;
    setProcessResult({
        shotSize: shotSizeCalc,
        shotSizeTransfer: shotSizeTransferCalc,
        injectionPressure1: intensificationRatioCalc * processInput.injectionPressure1,
        injectionPressure2: intensificationRatioCalc * processInput.injectionPressure2,
        injectionPressure3: intensificationRatioCalc * processInput.injectionPressure3,
        holdingPressure1: intensificationRatioCalc * processInput.holdingPressure1,
        holdingPressure2: intensificationRatioCalc * processInput.holdingPressure2,
        holdingPressure3: intensificationRatioCalc * processInput.holdingPressure3,
        caloInjSpeed: shotSizeTransferCalc,
        screwRPM: screwRPMCalc,
    });
  };

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
      <Tabs defaultActiveKey="Molding Calculator" className="mb-3" fill>
        <Tab eventKey="Molding Calculator" title="Molding Calculator">
          <Container>
            <Row>
              <Col>
                <MoldingCalculatorForm calculateResult={calculateMoldingCalculations} />
              </Col>
              <Col>
                <MoldingCalculatorFormOutput result={moldingResult} />
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
        <Tab
          eventKey="Hopper Size Calculations"
          title="Hopper Size Calculations"
        >
          <Container>
            <Row>
              <Col>
                <HopperSizeCalculator
                  calculateResult={calculateHopperSizeResult}
                />
              </Col>
              <Col>
                <HopperSizeOutput result={hopperSizeResult} />
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="Regrind Calculations" title="Regrind Calculations">
          <Container>
            <Row>
              <Col>
                <RegrindCalculator />
              </Col>
            </Row>
            <Row>
              <Col>
                <RegrindOutputTables />
              </Col>
            </Row>
          </Container>
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
            <ProcessTransfer calculateResult={calculateProcessResult} result={processResult} />
        </Tab>
      </Tabs>
    </>
  );
};

export default Calculators;