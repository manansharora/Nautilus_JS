import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'

const ShotSizeTable = () => {
    return (
        <>
        <Table striped bordered='true' size="sm">
            <thead>
                <tr>
                    <th>Material</th>
                    <th>Melt Density</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>PE --Any</td>
                    <td>0.71</td>
            
                </tr>
                
                <tr>
                    <td>PP</td>
                    <td>0.73</td>
            
                </tr>

                <tr>
                    <td>PVC--</td>
                    <td>1.02</td>
            
                </tr>

                <tr>
                    <td>PVC--</td>
                    <td>1.12</td>
                </tr>
                <tr>
                    <td>PS</td>
                    <td>0.91</td>
                </tr>
                <tr>
                    <td>ABS</td>
                    <td>0.88</td>
                </tr>
                <tr>
                    <td>SAN</td>
                    <td>0.88</td>
                </tr>
                <tr>
                    <td>PA</td>
                    <td>0.91</td>
                </tr>
                <tr>
                    <td>PC</td>
                    <td>0.97</td>
                </tr>
                <tr>
                    <td>PMMA</td>
                    <td>0.94</td>
                </tr>
                <tr>
                    <td>POM</td>
                    <td>1.15</td>
                </tr>
            </tbody>
        </Table>    
            <div>
            <h5>Note:</h5>
            <p>
                <ol type='number'>
                    <li>This calculation is only an estimation</li>
                    <li>Knowledge about melt desnity is very important fo this calculation.</li>
                    <li>When using filters with the above materials melt density will change.</li>
                    <li>Extreme caution should be used.</li>
                </ol>
            </p>
            </div>
        </>
    )
}

export default ShotSizeTable