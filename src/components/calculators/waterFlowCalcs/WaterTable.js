import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'

const WaterTable = ({toDisplay}) => {
    if (toDisplay == 1)
        return (
            <>
            <Table striped bordered='true'>
                                <thead>
                                    <tr>
                                        <td>Water Temp</td>
                                        <td>Pipe Diameter in inches</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>1/4</td>
                                        <td>3/8</td>
                                        <td>1/5</td>
                                        <td>3/4</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>(0.25 in)</td>
                                        <td>(0.375 in)</td>
                                        <td>(0.5 in)</td>
                                        <td>(0.75 in)</td>
                                    </tr>
                                    <tr>
                                        <td>60</td>
                                        <td>0.35</td>
                                        <td>0.53</td>
                                        <td>0.71</td>
                                        <td>1.06</td>
                                    </tr>
                                    <tr>
                                        <td>80</td>
                                        <td>0.27</td>
                                        <td>0.41</td>
                                        <td>0.54</td>
                                        <td>0.81</td>
                                    </tr>
                                    <tr>
                                        <td>100</td>
                                        <td>0.22</td>
                                        <td>0.32</td>
                                        <td>0.43</td>
                                        <td>0.65</td>
                                    </tr>
                                    <tr>
                                        <td>125</td>
                                        <td>0.17</td>
                                        <td>0.25</td>
                                        <td>0.33</td>
                                        <td>0.50</td>
                                    </tr>
                                    <tr>
                                        <td>150</td>
                                        <td>0.13</td>
                                        <td>0.20</td>
                                        <td>0.27</td>
                                        <td>0.40</td>
                                    </tr>
                                    <tr>
                                        <td>175</td>
                                        <td>0.11</td>
                                        <td>0.17</td>
                                        <td>0.22</td>
                                        <td>0.34</td>
                                    </tr>
                                    <tr>
                                        <td>200</td>
                                        <td>0.09</td>
                                        <td>0.14</td>
                                        <td>0.19</td>
                                        <td>0.28</td>
                                    </tr>
                                </tbody>
                            </Table>
            </>
        )
    return (
        <Table striped bordered='true'>
                            <thead>
                                <tr>
                                    <td>Water Temp (deg C)</td>
                                    <td>Pipe Dia in mm</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>8</td>
                                    <td>10</td>
                                    <td>15</td>
                                    <td>20</td>
                                </tr>
                                <tr>
                                    <td>15</td>
                                    <td>1.71</td>
                                    <td>2.14</td>
                                    <td>3.21</td>
                                    <td>4.29</td>
                                </tr>
                                <tr>
                                    <td>25</td>
                                    <td>1.40</td>
                                    <td>1.68</td>
                                    <td>2.52</td>
                                    <td>3.36</td>
                                </tr>
                                <tr>
                                    <td>35</td>
                                    <td>1.13</td>
                                    <td>1.36</td>
                                    <td>2.03</td>
                                    <td>2.71</td>
                                </tr>
                                <tr>
                                    <td>55</td>
                                    <td>0.79</td>
                                    <td>0.94</td>
                                    <td>1.42</td>
                                    <td>1.89</td>
                                </tr>
                                <tr>
                                    <td>70</td>
                                    <td>0.63</td>
                                    <td>0.76</td>
                                    <td>1.13</td>
                                    <td>1.51</td>
                                </tr>
                                <tr>
                                    <td>80</td>
                                    <td>0.55</td>
                                    <td>0.66</td>
                                    <td>0.99</td>
                                    <td>1.32</td>
                                </tr>
                                <tr>
                                    <td>90</td>
                                    <td>0.49</td>
                                    <td>0.59</td>
                                    <td>0.88</td>
                                    <td>1.17</td>
                                </tr>
                            </tbody>
                        </Table>
    )
}

export default WaterTable