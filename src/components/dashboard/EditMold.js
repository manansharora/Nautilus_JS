import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Table from 'react-bootstrap/Table';
import '../App.css';
import { column_data, row_data } from './Mold_Data';

const EditMold = ({ setEdit, editMold, handleEditFormSubmit, handleEditPartSubmit, handleEditPartChange, NewRow2, setPartId, setPartNumber, setPart, partColumn, setpartColumn, setNewRow2, handleEditFormChange, editMoldData, setIsRowId, setEditMoldData }) => {

    // State variables to show drop down 
    const [DropDown, setDropDown] = useState(false);
    const [DropDown2, setDropDown2] = useState(false);

    // State variables to set the Platen Orientation and Number of parts to "1"
    const [Platen, setPlaten] = useState(false);
    const [FamilyMold, setFamilyMold] = useState(false);

    const handlePartNumber = (e) => {

        // Setting the part number got from the part number input
        setPartNumber(e.target.value)

        // Calling the edit event
        handleEditFormChange(e)

    }

    const handleFamilyMold = (e) => {

        // Calling the edit event to get the value
        handleEditFormChange(e)

        // setting the state varibale to false again after the modal is closed
        setFamilyMold(!FamilyMold)

        // setting the part column and row data empty again
        setpartColumn(column_data);
        setNewRow2(row_data)

    }

    const handlePlatenOrientation = (e) => {

        // Calling the edit event to get the value
        handleEditFormChange(e)

        // setting the state varibale to false again after the modal is closed
        setPlaten(!Platen)

        // setting the part column and row data empty again
        setpartColumn(column_data);
        setNewRow2(row_data)

    }

    const handleSubmit = (e) => {

        handleEditFormSubmit(e);
        setEdit();
        setIsRowId(null)
        setpartColumn(column_data);
        setNewRow2(row_data)
        setEditMoldData([])

        if (Platen === true) {
            setPlaten(false)
        }

        if (FamilyMold === true) {
            setFamilyMold(false)
        }
    }

    const handleClose = (e) => {

        setEdit();
        setIsRowId(null)
        setpartColumn(column_data);
        setNewRow2(row_data)
        setEditMoldData([])

        if (Platen === true) {
            setPlaten(false)
        }

        if (FamilyMold === true) {
            setFamilyMold(false)
        }
    }

    return (
        <Modal isOpen={editMold} size="lg" style={{ maxWidth: '1000px', width: '100%' }}>
            <ModalHeader> Edit Mold Detail's </ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="lbl_style"> Enter New Mold Id: </label>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <input className="form-control" name="Mold_Id" type="text" defaultValue={editMoldData.Mold_Id} placeholder="Mold ID" onChange={handleEditFormChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="lbl_style">Platen Orientation :</label>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="form-group">
                            {
                                DropDown ?
                                    <select className="form-control digits" name="Platen_Orientation" defaultValue={editMoldData.Platen_Orientation} onChange={handlePlatenOrientation}>
                                        <option> Horizontal </option>
                                        <option> Vertical </option>
                                    </select>
                                    :

                                    <input className="form-control" name="Platen_Orientation" type="text" placeholder="Number of Bases" defaultValue={editMoldData.Platen_Orientation} onChange={handlePlatenOrientation} onMouseOver={() => setDropDown(true)} />
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="lbl_style"> Number of Bases : </label>
                        </div>
                    </div>
                    <div className="col-md-8">

                        {
                            editMoldData.Platen_Orientation === 'Horizontal' ?
                                <input className="form-control" name="Number_Of_Bases" type="text" placeholder="Number of Bases" value={1} readOnly />

                                :

                                <input className="form-control" name="Number_Of_Bases" type="text" placeholder="Number of Bases" defaultValue={editMoldData.Number_Of_Bases} onChange={handleEditFormChange} />
                        }

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="lbl_style"> Is this a Family Mold : </label>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="form-group">
                            {
                                DropDown2 ?
                                    <select className="form-control" name="Is_This_A_New_Mold" defaultValue={editMoldData.Is_This_A_New_Mold} onChange={handleFamilyMold}>
                                        <option>No</option>
                                        <option>Yes</option>
                                    </select>

                                    :

                                    <input className="form-control" name="Is_This_A_New_Mold" type="text" defaultValue={editMoldData.Is_This_A_New_Mold} onChange={handleEditFormChange} onMouseOver={() => setDropDown2(true)} />
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="lbl_style"> No. of Parts: (Atleast one part is needed) </label>
                        </div>
                    </div>
                    <div className="col-md-6">

                        {
                            editMoldData.Is_This_A_New_Mold === 'No' ?
                                <input className="form-control" name="Number_Of_Parts" type="text" placeholder="Number of Parts" defaultValue={1} readOnly />

                                :

                                <input className="form-control" name="Number_Of_Parts" type="text" placeholder="Number of Parts" defaultValue={editMoldData.Number_Of_Parts} onChange={handlePartNumber} />
                        }

                    </div>
                    <div className="col-md-2">
                        <Button color="primary" type='submit' onClick={setPart}> Set </Button>
                    </div>
                </div>
                <div>
                    <div className="mold" style={{ maxWidth: '1000px', width: '100%' }}>
                        {/* This table is coming from Bootstrap */}
                        <Table striped bordered hover responsive variant="light">
                            <thead>
                                <tr>
                                    {partColumn.map((value, key1) => (
                                        <React.Fragment key={value.id}>

                                            {value.delete === false ?
                                                (<th key={value.id}>
                                                    <div className="table-heading-content">
                                                        <div className="table-heading">
                                                            {key1 === 0 ? <span> {value.Part} </span> : <span> {value.Part_No} </span>}
                                                        </div>
                                                    </div>
                                                </th>
                                                )
                                                :
                                                (<th key={value.id}>
                                                    <div className="table-heading-content">
                                                        <div className="table-heading">
                                                            {key1 === 0 ? <span> {value.Part} </span> : <span> {value.Part_No} </span>}
                                                        </div>
                                                    </div>
                                                </th>
                                                )
                                            }
                                        </React.Fragment>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="grid_style">
                                {/* Here the row's are generated with the help of NewRow2 array and the <td>'s  should be equal to the number of columns e.g 3 td's for 3 columns */}

                                {/* After that 1st column will be containing static row's, names will be based on the mold, so that's what we are checking over here */}

                                {/* If the edit property of the column array's object is false then it will be the static row i.e 1st row but if not then editable row which switches as clicked on it to editable and then readOnly */}

                                {NewRow2.map((value, key1) => (
                                    <tr key={value.id} onMouseOut={handleEditPartSubmit}>
                                        {partColumn.map((value2, key2) => (
                                            <React.Fragment key={value2.id}>
                                                {value2.edit === false ?
                                                    (
                                                        <td>

                                                            <input type='text' className="form-control" value={value.Cavity_Data} readOnly />

                                                        </td>)
                                                    :
                                                    <>
                                                        <td onMouseOut={handleEditPartSubmit}>

                                                            <input type='text' className="form-control"

                                                                onKeyPress={key1 === 2 ? (event) => {
                                                                    if (!/[0.0-9.0]/.test(event.key)) {
                                                                        event.preventDefault();
                                                                    }
                                                                } : (event) => {

                                                                }}
                                                                name={`Part${key2}`} onChange={handleEditPartChange} defaultValue={NewRow2[key1][`Part${key2}`] || ''} onBlur={handleEditPartSubmit} onFocus={(event) => setPartId(event, value)} />

                                                        </td>

                                                    </>
                                                }
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" type='submit' onClick={handleSubmit}> Update </Button>
                <Button color="primary" type='submit' onClick={handleClose}> Close </Button>
            </ModalFooter>
        </Modal>
    )
}

export default EditMold