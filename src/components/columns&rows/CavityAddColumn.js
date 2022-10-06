import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Cavity = ({ toggle2, modal2, addHeader, addColumn }) => {

    const handleSubmit = (event) => {

        event.preventDefault();

        addColumn();
        toggle2();
    }

    return (
        <div className="btn-showcase">
            <button className="btn btn-pill btn-secondary btn-air-secondary mr-4" type="button" onClick={toggle2}> Add Column </button>
            <Modal isOpen={modal2} toggle={toggle2} centered={true}>
                <ModalHeader toggle={toggle2}>
                    Add column
                </ModalHeader>
                <ModalBody>
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label htmlFor="add-column" className="lbl_style">1: </label>
                                        </div>
                                    </div>
                                    <div className="col-md-10">
                                        <input className="form-control" type="text" placeholder="Enter Header Name" name="header" onChange={addHeader} />
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

export default Cavity
