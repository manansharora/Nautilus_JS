import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CoolingAddColumn = ({ toggle, modal, addHeader, addColumn }) => {

    const handleSubmit = (event) => {

        event.preventDefault();

        addColumn();
        toggle();
    }

    return (
        <div className="btn-showcase">
            <button className="btn btn-pill btn-fifth btn-air-fifth mr-4" type="button" onClick={toggle}> Add Column </button>
            <Modal isOpen={modal} toggle={toggle} centered={true}>
                <ModalHeader toggle={toggle}>
                    Add column
                </ModalHeader>
                <ModalBody>
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label htmlFor="add-column">1: </label>
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
                    <Button color="fourth" onClick={toggle}> Cancel </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CoolingAddColumn
