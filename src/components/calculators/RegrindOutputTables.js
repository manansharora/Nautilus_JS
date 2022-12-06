import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const RegrindOutputTables = ({ result }) => {
  const calculateRegrindAmount = (x, pass, generation) => {
    if(pass - generation < 1) 
      return 0;
    else if(pass - generation == 1) {
      return (Math.pow(x / 100, generation) * 100);
    }
    
    return Math.pow(x / 100, generation) * (1 - (x / 100)) * 100;
  };

  return (
    <>
      <hr></hr>
      <Container>
        <Row>
          <Col>
            <p>% of 'g' generation regrind in 'p' number pass</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered="true" size="sm">
              <thead>
                <tr>
                  <th rowSpan={2}>Part</th>
                  <th colSpan={5}>Pass</th>
                </tr>
                <tr>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Virgin</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 0)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 0)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 0)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 0)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 0)}</td>
                </tr>

                <tr>
                  <td>1-Gen</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 1)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 1)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 1)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 1)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 1)}</td>
                </tr>

                <tr>
                  <td>2-Gen</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 2)}</td>
                </tr>

                <tr>
                  <td>3-Gen</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 3)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 3)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 3)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 3)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 3)}</td>
                </tr>

                <tr>
                  <td>4-Gen</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 4)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 4)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 4)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 4)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 4)}</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
              </tbody>
            </Table>
          </Col>

          <Col>
          <Table striped bordered="true" size="sm">
              <thead>
                <tr>
                  <th rowSpan={2}>Part</th>
                  <th colSpan={5}>Pass</th>
                </tr>
                <tr>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Virgin</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>1-Gen</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>2-Gen</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>3-Gen</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>4-Gen</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col>
            <p>Weight of 'g' generation regrind in 'p' number pass</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered="true" size="sm">
              <thead>
                <tr>
                  <th rowSpan={2}>Part</th>
                  <th colSpan={4}>Pass</th>
                </tr>
                <tr>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Virgin</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>1-Gen</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>2-Gen</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>3-Gen</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>4-Gen</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
              </tbody>
            </Table>
          </Col>

          <Col>
            <Table striped bordered="true" size="sm">
              <thead>
                <tr>
                  <th rowSpan={2}>Part</th>
                  <th colSpan={5}>Pass</th>
                </tr>
                <tr>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Virgin</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>1-Gen</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>2-Gen</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>3-Gen</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>4-Gen</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegrindOutputTables;
