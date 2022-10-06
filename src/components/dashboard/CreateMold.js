import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Table from 'react-bootstrap/Table';
import '../App.css';
import { column_data, row_data } from './Mold_Data';
import EditMold from './EditMold';

const CreateMold = ({ toggle3, modal3, handleAddFormChange, handleAddFormSubmit, handleEditPartSubmit, handleEditPartChange, NewRow2, setPartId, isPartId, setPartNumber, PartNumber, setPart, partColumn, setpartColumn, setNewRow2, editMold, setEdit, handleEditFormChange, handleEditFormSubmit, editMoldData, setIsRowId, setEditMoldData, addMoldData, Platen, setPlaten, FamilyMold, setFamilyMold }) => {

    // Set's the number of part and as per the number the part column get's generated.
    const handlePartNumber = (e) => {

        setPartNumber(e.target.value)
        handleAddFormChange(e)

    }

    const handleFamilyMold = (e) => {

        handleAddFormChange(e)
        setFamilyMold(!FamilyMold)

    }

    const handlePlatenOrientation = (e) => {

        handleAddFormChange(e)
        setPlaten(!Platen)

    }

    const handleSubmit = (e) => {

        handleAddFormSubmit(e);

    }

    const handleClose = () => {

        setpartColumn(column_data);
        setNewRow2(row_data)
        toggle3();
        addMoldData.Mold_Id = ""

        setPartNumber(1)

        if (Platen === true) {
            setPlaten(false)
        }

        if (FamilyMold === true) {
            setFamilyMold(false)
        }

    }

    return (
        <>
            <button className="btn btn-pill btn-primary btn-air-primary m-4" type="button" onClick={toggle3}>Create Mold</button>
            {editMold ?
                (<EditMold editMold={editMold} setEdit={setEdit} handleEditFormChange={handleEditFormChange} handleEditFormSubmit={handleEditFormSubmit} handleEditPartChange={handleEditPartChange} NewRow2={NewRow2} setPartId={setPartId} isPartId={isPartId} setPartNumber={setPartNumber} PartNumber={PartNumber} setPart={setPart} partColumn={partColumn} setpartColumn={setpartColumn} setNewRow2={setNewRow2} editMoldData={editMoldData} setIsRowId={setIsRowId} handleEditPartSubmit={handleEditPartSubmit} toggle3={toggle3} setEditMoldData={setEditMoldData} />)
                :
                (<Modal isOpen={modal3} size="lg" style={{ maxWidth: '1000px', width: '100%' }} backdrop="static" keyboard={false}>
                    <ModalHeader> Add Mold </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lbl_style">Enter New Mold Id: </label>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" name="Mold_Id" type="text" placeholder="Mold ID" onChange={handleAddFormChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="lbl_style"> Platen Orientation : </label>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="form-group">
                                    <select className="form-control digits" name="Platen_Orientation" onChange={handlePlatenOrientation}>
                                        <option> Horizontal </option>
                                        <option> Vertical </option>
                                    </select>
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
                                { Platen ?
                                    <input className="form-control" name="Number_Of_Bases" type="text" placeholder="Number of Bases" onChange={handleAddFormChange} /> : <input className="form-control" name="Number_Of_Bases" type="text" placeholder="Number of Bases" value={1} onChange={handleAddFormChange} readOnly /> }

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
                                    <select className="form-control" name="Is_This_A_New_Mold" onChange={handleFamilyMold} >
                                        <option> No </option>
                                        <option> Yes </option>
                                    </select>
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
                                { FamilyMold ?
                                    <input className="form-control" name="Number_Of_Parts" type="text" placeholder="Number of Parts" onChange={handlePartNumber} /> : <input className="form-control" name="Number_Of_Parts" type="text" placeholder="Number of Parts" value={1} readOnly /> }

                            </div>
                            <div className="col-md-2">
                                <Button color="primary" type='submit' onClick={setPart}> Set </Button>
                            </div>
                        </div>
                        <div>
                            <div className='row' style={{ overflowX: "scroll" }}>
                                <div>
                                    <div className="Cavity-Grid-Container">
                                        <form autoComplete="off">
                                            <div className="mold_table">
                                                <div>
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
                                                                                (<td> <input type='text' className="form-control" value={value.Cavity_Data} readOnly /> </td>)
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

                                                                                            name={`Part${key2}`}
                                                                                            onChange={handleEditPartChange}
                                                                                            defaultValue={NewRow2[key1][`Part${key2}`] || ''}
                                                                                            onBlur={handleEditPartSubmit}
                                                                                            onFocus={(event) => setPartId(event, value)} />

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
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type='submit' onClick={handleSubmit}> Save </Button>
                        <Button color="primary" type='submit' onClick={handleClose}> Close </Button>
                    </ModalFooter>
                </Modal>)}
        </>
    )
}

export default CreateMold
