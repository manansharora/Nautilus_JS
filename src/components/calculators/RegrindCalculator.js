import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const RegrindCalculator = () => {
  const [RegrindData, setRegrindData] = useState({
    singlePartWeight: 0,
    cavities: 0,
    singleRunnerWeight: 0,
    runner: 0,
    pass: 0,
    generation: 0,
  });

  const [RegrindResult, setRegrindResult] = useState({
    cavityWeight: 0,
    runnerWeight: 0,
    totalShotWeight: 0,
    partWeight: 0,
    totalRunnerWeight: 0,
    gen: 0,
    res: 0,
    npass: 0,
  });

  useEffect(() => {
    calculateResult();
  });

  const handleChange = (event) => {
    //calculateResult();
    setRegrindData({ ...RegrindData, [event.target.name]: event.target.value });
  };

  const calculateResult = () => {
    // let sd = shotSizeData.screwDiameter
    // let sw = shotSizeData.shotWeight
    // let md = shotSizeData.materialDensity
    // if(sd != 0 && sw != 0 && md != 0) {
    //     console.log("exec");
    //     let res = (sw * 1000) / (0.785 * md * sd * sw);
    //     setShotSizeResult(res.toFixed(4));
    // }
  };

  return (
    <div>
      <Form>
        <Container>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Enter Single Part Weight:</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="singlePartWeight"
                    type="number"
                    value={RegrindData.singlePartWeight}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Number of Cavities</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="cavities"
                    type="number"
                    value={RegrindData.cavities}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Total weight of all cavities</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    value={RegrindResult.cavityWeight}
                    readOnly
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Enter Single Runner Weight:</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="singleRunnerWeight"
                    type="number"
                    value={RegrindData.singleRunnerWeight}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Number of Runner:</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="runner"
                    type="number"
                    value={RegrindData.runner}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Total weight of all Runners</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    value={RegrindResult.runnerWeight}
                    readOnly
                  />
                </Col>
              </Form.Group>
            </Col>

            
          </Row>
          </Container>

          <Container>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Total Shot Weight:</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    value={RegrindResult.totalRunnerWeight}
                    readOnly
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Part Weight:</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    value={RegrindResult.partWeight}
                    readOnly
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Runner Weight:</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    value={RegrindResult.totalRunnerWeight}
                    readOnly
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Enter Pass# (p):</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="pass"
                    type="number"
                    value={RegrindData.pass}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="formBasicnumber">
                <Form.Label>Enter Generation# (g):</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="generation"
                    type="number"
                    value={RegrindData.generation}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>

      <p>
        In the part,Amount of {RegrindResult.gen} generation regrind in{" "}
        {RegrindResult.npass} number pass is {RegrindResult.res}
      </p>
    </div>
  );
};

export default RegrindCalculator;
