import React from 'react'
import Table from 'react-bootstrap/Table'
import '../App.css';
import '../../assets/custom-stylesheet/grid_stylecss.css';

import {
    Prompt
} from "react-router-dom";

const CosmeticGrid = ({ Melting, Hydraulic, CosmeticGridData, setId, handleEditFormChange, handleEditFormSubmit, Alert }) => {

    return (
        <div className='cosmetic-grid'>
            <Prompt
                when={Alert}
                message={location =>
                    `Changes you made may not be saved.`
                }
            />
            <div>
                <Table striped bordered hover responsive variant="light">
                    <thead>
                        <tr>
                            <th> <span> {Melting} </span> </th>

                            <th> <span> Low {Hydraulic} Pressure </span> </th>

                            <th> <span> High {Hydraulic} Pressure </span> </th>
                        </tr>
                    </thead>
                    <tbody className="grid_style">
                        {CosmeticGridData.map((NewRow, rowId) => (
                            <tr key={CosmeticGridData[rowId].id} onClick={(event) => setId(event, NewRow)}>

                                <td> <input type='text' className="form-control" name="Melt_Temp" defaultValue={NewRow.Melt_Temp || ''} onChange={handleEditFormChange} onKeyPress={(event) => {
                                    if (!/[0.0-9.0]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} onBlur={handleEditFormSubmit} onFocus={(event) => setId(event, NewRow)} /> </td>

                                <td> <input type='text' className="form-control" name="Low" defaultValue={NewRow.Low || ''} onChange={handleEditFormChange} onKeyPress={(event) => {
                                    if (!/[0.0-9.0]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} onBlur={handleEditFormSubmit} onFocus={(event) => setId(event, NewRow)} /> </td>

                                <td> <input type='text' className="form-control" name="High" defaultValue={NewRow.High || ''} onChange={handleEditFormChange} onKeyPress={(event) => {
                                    if (!/[0.0-9.0]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} onBlur={handleEditFormSubmit} onFocus={(event) => setId(event, NewRow)} /> </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>

    )
}

export default CosmeticGrid
