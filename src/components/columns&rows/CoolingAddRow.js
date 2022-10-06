import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CoolingAddRow = ({ toggle2, modal2, addRow, increaseRow }) => {

    const handleSubmit = () => {
        increaseRow();
        toggle2();
    }

    return (
        <div className="btn-showcase">
            <button className="btn btn-pill btn-primary btn-air-primary mr-4" type="button" onClick={toggle2}> Add Row </button>
            <Modal isOpen={modal2} toggle={toggle2} centered={true}>
                <ModalHeader toggle={toggle2}>
                    Add Row
                </ModalHeader>
                <ModalBody>
                    <form autoComplete='off'>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="add-column" className="lbl_style">Enter Number Of Rows: </label>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <input className="form-control" onKeyPress={(event) => {
                                            if (!/[-0.0-9.0]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }} type="text" placeholder="Enter Number Of Rows" name="rows" onChange={addRow} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}> Add </Button>
                    <Button color="fourth" onClick={toggle2}> Cancel </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CoolingAddRow
