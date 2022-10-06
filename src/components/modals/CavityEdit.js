import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CavityEdit = ({ modal, toggle, column, addHeader, editColumnHeader, editColumn }) => {
    return (
        <div className="btn-showcase">
            {/* < !-- Using Form Modal --> */}
            <button className="btn btn-pill btn-primary btn-air-primary mr-4" type="button" onClick={toggle}> Edit Column Header </button>
            <Modal isOpen={modal} centered={true}>
                <ModalHeader toggle={toggle}>{"Edit Header's Value"}</ModalHeader>
                <ModalBody>
                    {column.map((value, key) => (
                        <div className="row" key={value.id}>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label className="lbl_style">{key + 1}:</label>
                                        </div>
                                    </div>
                                    <div className="col-md-10" onMouseOut={editColumnHeader}>
                                        {key === 0 ? (<input className="form-control" type="text" placeholder="Enter new header" defaultValue={value.header} readOnly />)
                                            :
                                            (<input className="form-control" type="text" placeholder="Enter new header" defaultValue={value.header} onChange={addHeader} onClick={() => editColumn(value.id)} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button color="fourth" onClick={toggle}> Update & Close </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CavityEdit