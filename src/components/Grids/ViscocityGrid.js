import React from "react";
import Table from 'react-bootstrap/Table'
import '../App.css';
import '../../assets/custom-stylesheet/grid_stylecss.css';

import {
  Prompt
} from "react-router-dom";

const ViscocityGrid = ({ ViscosityGridData, deleteRow2, handleEditFormSubmit, handleEditFormChange, setId, IntensificationRatio, Alert }) => {

  return (

    <div className="viscosity-grid">

      <Prompt
        when={Alert}
        message={location =>
          `Changes you made may not be saved.`
        }
      />

      <form autoComplete="off">
        <div className="viscosity_table">
          <Table striped bordered hover responsive variant="light" id="viscosity-grid">
            <thead>
              <tr>
                <th>
                  <span> Injection Speed </span>
                </th>
                <th>
                  <span> Fill Time </span>
                </th>
                <th>
                  <span> Peak Inj Press </span>
                </th>
                <th>
                  <span> Viscosity </span>
                </th>
                <th>
                  <span> Shear Rate </span>
                </th>
                <th>
                  <span> Absolute </span>
                  <span> Drop </span>
                  <span> Viscosity </span>
                </th>
                <th>
                  <span> % </span>
                  <span> Drop </span>
                  <span> Viscosity </span>
                </th>
                <th>
                  <span> Action </span>
                </th>
              </tr>
            </thead>
            <tbody className="grid_style">
              {ViscosityGridData.map((NewRow, rowId) => (

                <tr key={ViscosityGridData[rowId].id} onClick={(event) => setId(event, NewRow)} onMouseOut={handleEditFormSubmit} >

                  <td> <input type='text' className="form-control" 
                  onKeyPress={(event) => {

                    if (!/[-0.0-9.0]/.test(event.key)) {
                      event.preventDefault();
                    }
                    else if(!IntensificationRatio){
                      event.preventDefault();
                      alert("Please enter Intensification Ratio")
                    }

                  }} 
                  name="Injection_Speed" defaultValue={NewRow.Injection_Speed} onChange={handleEditFormChange} onBlur={handleEditFormSubmit} onFocus={(event) => setId(event, NewRow)} tabIndex={1} /> </td>

                  <td> <input type='text' className="form-control" onKeyPress={(event) => {
                    if (!/[-0.0-9.0]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }} name="Fill_Time" defaultValue={NewRow.Fill_Time} onChange={handleEditFormChange} onBlur={handleEditFormSubmit} onFocus={(event) => setId(event, NewRow)} tabIndex={1} /> </td>

                  <td> <input type='text' className="form-control" onKeyPress={(event) => {
                    if (!/[-0.0-9.0]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }} name="Peak_Inj_Press" defaultValue={NewRow.Peak_Inj_Press} onChange={handleEditFormChange} onBlur={handleEditFormSubmit} onFocus={(event) => setId(event, NewRow)} tabIndex={1} /> </td>

                  <td> <input type='text' className="form-control" name="Viscosity" value={ ViscosityGridData[rowId].Viscosity === "" ? ('-') : isNaN(ViscosityGridData[rowId].Viscosity) ? 0 : Math.round(ViscosityGridData[rowId].Fill_Time * ViscosityGridData[rowId].Peak_Inj_Press * IntensificationRatio) } readOnly /> </td>

                  <td> <input type='text' className="form-control" name="Shear_Rate"

                    value={isFinite(NewRow.Shear_Rate) ? Number(NewRow.Shear_Rate).toFixed(3) : '-'}

                    readOnly /> </td>

                  <td> <input type='text' className="form-control" name="Absolute_Viscosity"

                    value={rowId === 0 ? ('-') : (ViscosityGridData[rowId].Viscosity === "" || ViscosityGridData[rowId - 1].Viscosity === "" || ViscosityGridData[rowId - 1].Viscosity === 0 ? '-' : ViscosityGridData[rowId].Fill_Time === "" ? '-' : (Math.round(ViscosityGridData[rowId - 1].Viscosity - ViscosityGridData[rowId].Viscosity)))}

                    readOnly /> </td>

                  <td> <input type='text' className="form-control" name="Drop_Viscosity"

                    value={rowId === 0 ? ('-') : (ViscosityGridData[rowId].Viscosity === "" || ViscosityGridData[rowId - 1].Viscosity === "" || ViscosityGridData[rowId - 1].Viscosity === 0 ? '-' : ViscosityGridData[rowId].Fill_Time === "" ? '-' : Number((Math.round(ViscosityGridData[rowId - 1].Viscosity - ViscosityGridData[rowId].Viscosity) * 100) / (ViscosityGridData[rowId - 1].Viscosity)).toFixed(1))}

                    readOnly /> </td>

                  <td className='icon-position'> <i className="fas fa-trash viscocity_icons" onClick={() => deleteRow2(NewRow.id)}></i> </td>

                </tr>

              ))}
            </tbody>
          </Table>
        </div>
      </form>
    </div>
  )
}

export default ViscocityGrid;
