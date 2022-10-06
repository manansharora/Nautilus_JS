import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Viscocity = ({  modal2, toggle2 }) => {

    return (
        <div className="card-body btn-showcase">
        {/* < !-- Using Form Modal --> */}
        <Modal isOpen={modal2} toggle={toggle2} centered={true}>
            <ModalHeader toggle={toggle2}> {"Edit Pressure Value"} </ModalHeader>
            <ModalBody>
                <form>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect23" className="lbl_style"> {"1"}:</label>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <input className="form-control " id="exampleInputPassword27" type="text" placeholder="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect23" className="lbl_style"> {"2"}:</label>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <input className="form-control " id="exampleInputPassword27" type="text" placeholder="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect23" className="lbl_style"> {"3"}:</label>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <input className="form-control " id="exampleInputPassword27" type="text" placeholder="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect23" className="lbl_style"> {"4"}:</label>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <input className="form-control " id="exampleInputPassword27" type="text" placeholder="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect23" className="lbl_style"> {"5"}:</label>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <input className="form-control " id="exampleInputPassword27" type="text" placeholder="" />
                        </div>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary">{"Update"}</Button>
                <Button color="fourth" onClick={toggle2}>{"Cancel"}</Button>
            </ModalFooter>
        </Modal>
    </div>
    );
};

export default Viscocity;


