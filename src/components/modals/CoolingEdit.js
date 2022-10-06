import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CoolingEdit = ({ modal3, toggle3, column, addHeader, editColumnHeader, editColumn }) => {

    return (

        <div className="btn-showcase">
            {/* < !-- Using Form Modal --> */}
            <button className="btn btn-pill btn-primary btn-air-primary mr-4" type="button"onClick={toggle3}> Edit Column Header </button>
            <Modal isOpen={modal3} centered={true}>
                <ModalHeader toggle={toggle3}>{"Edit Header's Value"}</ModalHeader>
                <ModalBody>
                    {column.map((value, key) => (
                        <div className="row" key={key}>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect23" className="lbl_style">{key + 1}:</label>
                                        </div>
                                    </div>
                                    <div className="col-md-10" onMouseOut={editColumnHeader}>
                                        {key === 0 ? (<input className="form-control " id="exampleInputPassword27" type="text" placeholder="Enter new header" defaultValue={value.header} readOnly />)
                                            :
                                            (<input className="form-control " id="exampleInputPassword27" type="text" placeholder="Enter new header" defaultValue={value.header} onChange={addHeader} onClick={() => editColumn(value.id)} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button color="fourth" onClick={toggle3}> Update & Close </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CoolingEdit;