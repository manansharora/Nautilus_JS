import React from 'react';
import Table from 'react-bootstrap/Table';
import '../App.css';
import '../../assets/custom-stylesheet/grid_stylecss.css';

import { Prompt } from 'react-router-dom';

const PressureGrid = ({ PressureGridRow, deleteRow2, handleEditFormSubmit, handleEditFormChange, setId, Max_Press_Available, Alert }) => {

  return (
    <div className="pressure-grid">

      <Prompt
        when={Alert}
        message={location =>
          `Changes you made may not be saved.`
        }
      />

      <form autoComplete="off">
        <div className="viscosity_table">
          <Table striped bordered hover responsive variant="light">
            <thead>
              <tr>
                <th>
                  <span> Flow Area </span>
                </th>
                <th>
                  <span> Peak Pressure </span>
                </th>
                <th>
                  <span> % Maximum </span>
                </th>
                <th>
                  <span> Delta P </span>
                </th>
                <th>
                  <span> % Delta P </span>
                </th>
                <th >
                  <span> Action </span>
                </th>
              </tr>
            </thead>
            <tbody className="grid_style">
              {PressureGridRow.map((PressureRow, rowId) => (

                <tr key={PressureGridRow[rowId].id} onClick={(event) => setId(event, PressureRow)} onMouseOut={handleEditFormSubmit}>

                  <td> <input type='text' className="form-control" name="Flow_Area"

                    onKeyPress={(event) => {

                      if (!Max_Press_Available) {
                        event.preventDefault();
                        alert("Please Enter Max Pressure")
                      }

                    }}

                    defaultValue={PressureRow.Flow_Area} onChange={handleEditFormChange} onBlur={handleEditFormSubmit} onFocus={(event) => setId(event, PressureRow)} tabIndex={1} /> </td>

                  <td> <input type='text' className="form-control" name="Peak_Pressure" defaultValue={PressureRow.Peak_Pressure} onChange={handleEditFormChange}

                    onKeyPress={(event) => {

                      if (!/[0.0-9.0]/.test(event.key)) {
                        event.preventDefault();
                      }

                    }}

                    onBlur={handleEditFormSubmit} onFocus={(event) => setId(event, PressureRow)} tabIndex={1} /> </td>

                  <td> <input type='text' className="form-control" name="Percent_Maximum" value={Number(PressureGridRow[rowId].Percent_Maximum).toFixed(1) === 0 ? ('-') : (Number(PressureGridRow[rowId].Percent_Maximum).toFixed(3))} readOnly /> </td>

                  <td> <input type='text' className="form-control" name="Delta_P" value={rowId === 0 ? (PressureGridRow[rowId].Peak_Pressure) : (PressureGridRow[rowId].Peak_Pressure === "" ? '-' : (Math.round(PressureGridRow[rowId].Peak_Pressure - PressureGridRow[rowId - 1].Peak_Pressure)))} readOnly /> </td>

                  <td> <input type='text' className="form-control" name="Percent_Delta_P" value={rowId === 0 ? (PressureGridRow[rowId].Percent_Maximum === "" ? '-' : Number(PressureGridRow[rowId].Percent_Maximum).toFixed(3)) : (PressureGridRow[rowId].Peak_Pressure === "" ? '-' : (Number((PressureGridRow[rowId].Peak_Pressure - PressureGridRow[rowId - 1].Peak_Pressure) * 100 / (Max_Press_Available)).toFixed(3)))} readOnly /> </td>

                  <td className='icon-position'> <i className="fas fa-trash viscocity_icons" onClick={() => deleteRow2(PressureRow.id)}></i> </td>

                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </form>
    </div>
  )
}

export default PressureGrid
