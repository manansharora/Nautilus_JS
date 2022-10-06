import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Viscocity = ({ modal, toggle, GenerateRow, setMinInjection, setMaxInjection, setInterval }) => {

    return (

        <div className="card-body btn-showcase">
            {/* < !-- Using Form Modal --> */}
            <Modal isOpen={modal} toggle={toggle} centered={true}>
                <ModalHeader toggle={toggle}>{"Generate Injection Speed"}</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="lbl_style"> {"Minimum value"}:</label>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" name='MinInjection' type="text" placeholder="Minimum value"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="lbl_style"> {"Maximum value"}:</label>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" name='MaxInjection' type="text" placeholder="Maximum value"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="lbl_style"> {"Increment value"}:</label>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" name='Interval' type="text" placeholder="Increment value"/>
                            </div>
                        </div>
                        
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">{"Rescale"}</Button>
                    <Button color="fourth" onClick={toggle}>{"Cancel"}</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Viscocity;


