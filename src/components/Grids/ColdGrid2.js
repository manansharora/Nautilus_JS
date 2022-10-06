import React from 'react';
import Table from 'react-bootstrap/Table';
import '../App.css';

const ColdGrid2 = ({ NewRow2, ColdGridHeader, grid2}) => {
    return (
        <>
            <div>
                <div className="cold_table2">
                    <Table striped bordered hover responsive variant="light">
                        <thead>
                            <tr>
                                <th className='cold-heading'> <span> WeightIncrease </span> </th>
                                <th className='cold-heading'> <span> %WeightIncrease </span> </th>
                            </tr>
                        </thead>
                        <tbody className="grid_style">
                            {NewRow2.map((value, key1) => (
                                <tr key={key1}>

                                    {/* Using map method here we are displaying the data from the main array  */}
                                    <td className='cold-heading'> <input type="text" 
                                    value={ key1 === 0 ? ('-') : ( isNaN(NewRow2[key1][`${grid2}`]) ? '-' : ( Number(NewRow2[key1][`${grid2}`] -  NewRow2[key1 - 1][`${grid2}`]).toFixed(1)))}
                                    className="form-control" readOnly /> </td>

                                    <td className='cold-heading'> <input type="text" 
                                    value={ key1 === 0 ? ('-') : ( isNaN(NewRow2[key1][`${grid2}`]) ? '-' : ( Number((NewRow2[key1][`${grid2}`] -  NewRow2[key1 - 1][`${grid2}`]) / (NewRow2[key1 - 1][`${grid2}`]) * 100).toFixed(3) ))} 
                                    className="form-control" readOnly /> </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default ColdGrid2;