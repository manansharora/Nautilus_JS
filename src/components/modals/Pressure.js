import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, DetailRow, Page, CommandColumn, Edit } from '@syncfusion/ej2-react-grids';

const Pressure = ({ modal, toggle }) => {

    return (

        <div className="card-body btn-showcase">
            {/* < !-- Using Form Modal --> */}
    
            <Modal isOpen={modal} toggle={toggle} centered={true}>
                <ModalHeader toggle={toggle}>{"Select Max Machine Pressure"}</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect23" className="lbl_style"> Find Machine No:</label>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <input className="form-control " id="exampleInputPassword27" type="text" placeholder="Nozzle Length" />
                            </div>
                            <div className="col-md-2">
                                <Button color="primary"> Search </Button>
                            </div>
                        </div>
                    </form>
                    <div className="d-flex flex-column justify-content-center">
                        <div>
                            <GridComponent allowEditing={true} allowPaging={true} pageSettings={{ pageSize: 4 }}>
                                <ColumnsDirective>
                                    <ColumnDirective field="MatchNo" headerText="Match No" textAlign="Center" width="100" />
                                    <ColumnDirective field="MaxPIPress" headerText="Max PI Press" textAlign="Center" width="100" />
                                </ColumnsDirective>
                                <Inject services={[DetailRow, Page, Edit, CommandColumn]} />
                            </GridComponent>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"> Ok </Button>
                    <Button color="fourth" onClick={toggle}> Cancel </Button>
                </ModalFooter>
            </Modal>

        </div>

    );
};

export default Pressure;


