import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const RegrindOutputTables = ({ result, calculateRegrindAmount }) => {

  return (
    <>
      <hr></hr>
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
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 0).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 0).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 0).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 0).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 0).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>1-Gen</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 1).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 1).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 1).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 1).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 1).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>2-Gen</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 2).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 2).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 2).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 2).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 2).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>3-Gen</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 3).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 3).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 3).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 3).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 3).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>4-Gen</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 4).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 4).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 4).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 4).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 4).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td>100</td>
                  <td>100</td>
                  <td>100</td>
                  <td>100</td>
                  <td>100</td>
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
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 0).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 0).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 0).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 0).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 0).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>1-Gen</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 1).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 1).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 1).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 1).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 1).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>2-Gen</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 2).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 2).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 2).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 2).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 2).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>3-Gen</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 3).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 3).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 3).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 3).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 3).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>4-Gen</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 1, 4).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 2, 4).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 3, 4).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 4, 4).toFixed(2)}</td>
                  <td>{calculateRegrindAmount(result.runnerWeightPercent, 5, 4).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td>100</td>
                  <td>100</td>
                  <td>100</td>
                  <td>100</td>
                  <td>100</td>
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
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 1, 0).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 2, 0).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 3, 0).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 4, 0).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 5, 0).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>1-Gen</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 1, 1).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 2, 1).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 3, 1).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 4, 1).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 5, 1).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>2-Gen</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 1, 2).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 2, 2).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 3, 2).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 4, 2).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 5, 2).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>3-Gen</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 1, 3).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 2, 3).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 3, 3).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 4, 3).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 5, 3).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>4-Gen</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 1, 4).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 2, 4).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 3, 4).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 4, 4).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 5, 4).toFixed(2) * result.singlePartWeight / 100).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td>100</td>
                  <td>100</td>
                  <td>100</td>
                  <td>100</td>
                  <td>100</td>
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
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 1, 0).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 2, 0).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 3, 0).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 4, 0).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 5, 0).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>1-Gen</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 1, 1).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 2, 1).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 3, 1).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 4, 1).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 5, 1).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>2-Gen</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 1, 2).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 2, 2).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 3, 2).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 4, 2).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 5, 2).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>3-Gen</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 1, 3).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 2, 3).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 3, 3).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 4, 3).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 5, 3).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>4-Gen</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 1, 4).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 2, 4).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 3, 4).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 4, 4).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                  <td>{(calculateRegrindAmount(result.runnerWeightPercent, 5, 4).toFixed(2) * result.singleRunnerWeight / 100).toFixed(2)}</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td>100</td>
                  <td>100</td>
                  <td>100</td>
                  <td>100</td>
                  <td>100</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <br />
    </>
  );
};

export default RegrindOutputTables;
