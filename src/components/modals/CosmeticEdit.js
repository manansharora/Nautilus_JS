import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../App.css';

const CosmeticEdit = ({ modal, toggle, setHeader1, setHeader2, Melting, Hydraulic }) => {

    return (

        <div className="btn-showcase">
            {/* < !-- Using Form Modal --> */}
            <div className="mb-4 d-flex justify-content-between">
                <div>
                    <button className="btn btn-pill btn-primary btn-air-primary ml-4" type="button" onClick={toggle}> Edit Column Header </button>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle} centered={true}>
                <ModalHeader toggle={toggle}>{"Change Header Text"}</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect23" className="lbl_style"> {"X-Axis"}:</label>
                                        </div>
                                    </div>
                                    <div className="col-md-10">
                                        <input className="form-control" defaultValue={Melting} type="text" onChange={setHeader1} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect23" className="lbl_style"> {"Y-Axis"}:</label>
                                        </div>
                                    </div>
                                    <div className="col-md-10">
                                        <input className="form-control" defaultValue={Hydraulic} type="text" onChange={setHeader2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="fourth" onClick={toggle}> Update & Close </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CosmeticEdit;
