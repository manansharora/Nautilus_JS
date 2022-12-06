import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const RegrindCalculator = ({ calculateResult , RegrindResult }) => {
  const [RegrindData, setRegrindData] = useState({
    singlePartWeight: 0,
    cavities: 0,
    singleRunnerWeight: 0,
    runner: 0,
    pass: 0,
    gen: 0,
  });

  useEffect(() => {  
    let flag = true;
    for(let key in RegrindData) {
        if(RegrindData[key] <= 0)
            flag = false;
    }
    if(flag) {
        calculateResult(RegrindData);
    }
}, [ RegrindData ]);

  const handleChange = (event) => {
    setRegrindData(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
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
                    name="totalShotWeight"
                    type="number"
                    value={RegrindResult.totalShotWeight}
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
                    name="gen"
                    type="number"
                    value={RegrindData.gen}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>

      <p>
        In the part,Amount of {RegrindData.gen} generation regrind in {RegrindData.pass} number pass is {RegrindResult.regrindAmount}
      </p>
    </div>
  );
};

export default RegrindCalculator;
