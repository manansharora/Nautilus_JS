import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import '../App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import {
    Prompt
} from "react-router-dom";

const ColdGrid1 = ({ column, deleteColumn, NewRow2, deleteRow2, handleEditFormChange, handleEditFormSubmit, setId, Alert }) => {

    // Toggle's the Delete Modal
    const [ShowDelete, setShowDelete] = useState(false);

    // Variable to set the ID of that column
    const [DeleteId, setDeleteId] = useState();

    // Variable to set the value of the column
    const [DeleteValue, setDeleteValue] = useState();

    // Varibale to set the name of the column
    const [DeleteColumnName, setDeleteColumnName] = useState();

    const handleShowDelete = () => {

        setShowDelete(!ShowDelete);

    };

    const onDelete = (value, key) => {

        setDeleteId(value.id);
        setDeleteValue(key);
        setDeleteColumnName(value.header)
        handleShowDelete();

    };

    const removeColumn = () => {

        deleteColumn(DeleteId, DeleteValue);
        handleShowDelete();
        setDeleteId(null);

    };

    return (
        <>
            <Prompt
                when={Alert}
                message={location =>
                    `Changes you made may not be saved.`
                }
            />
            <Modal
                isOpen={ShowDelete}
                toggle={handleShowDelete}
                centered={true}
            >
                <ModalHeader toggle={handleShowDelete}> Delete Column </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete {DeleteColumnName} column ?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={removeColumn}>
                        {" "}
                        Yes{" "}
                    </Button>
                    <Button color="secondary" onClick={handleShowDelete}>
                        {" "}
                        No{" "}
                    </Button>
                </ModalFooter>
            </Modal>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row' style={{ overflowX: 'scroll' }}>
                            <div>
                                <div className="Cold-Grid-Container">
                                    <form autoComplete="off">
                                        <div className="cold_table">
                                            <Table striped bordered hover responsive variant="light">
                                                <thead>
                                                    <tr>
                                                        {column.map((value, key) => (
                                                            <React.Fragment key={key}>
                                                                {value.delete === false ? (<th>
                                                                    <div className="table-heading-content">
                                                                        <div className="table-heading">
                                                                            <span> {value.header} </span>
                                                                        </div>
                                                                    </div>
                                                                </th>) : (<th>
                                                                    <div className="table-heading-content">
                                                                        <div className="table-heading">
                                                                            <span> {value.header} </span>
                                                                        </div>
                                                                        <div className="table-heading-icons">
                                                                            <div> <i className="fas fa-trash" onClick={() => onDelete(value, key)} ></i> </div>
                                                                        </div>
                                                                    </div>
                                                                </th>)}
                                                            </React.Fragment>
                                                        ))}
                                                        <th> <span> Action </span> </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="grid_style">
                                                    {NewRow2.map((value, key1) => (
                                                        <tr key={value.id}>

                                                            {column.map((index, key2) => (
                                                                <React.Fragment key={key2}>
                                                                    <td>

                                                                        <input type='text' name={`value${key2}`} style={{ backgroundColor: '#fff' }} className="form-control" defaultValue={NewRow2[key1][`value${key2}`] || ''} onChange={handleEditFormChange} onKeyPress={(event) => {
                                                                            if (!/[0.0-9.0]/.test(event.key)) {
                                                                                event.preventDefault();
                                                                            }
                                                                        }} onBlur={handleEditFormSubmit} onFocus={(event) => setId(event, value)} />

                                                                    </td>

                                                                </React.Fragment>
                                                            ))}

                                                            <td className="icon-position"> <i className="fas fa-trash viscocity_icons" onClick={() => deleteRow2(value.id)}></i> </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ColdGrid1;
