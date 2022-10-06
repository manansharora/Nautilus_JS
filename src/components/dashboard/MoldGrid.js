import React, { useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import "../../assets/custom-stylesheet/app2_style.css";
import "../../assets/custom-stylesheet/samplepage_style.css";
import { useHistory } from "react-router-dom";
import "../App.css";
import Mold from "./CreateMold";
import "../../assets/custom-stylesheet/grid_stylecss.css";
import DataService from "../../services/ApiService";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
    GridComponent,
    CommandColumn,
    Toolbar,
    Inject
} from "@syncfusion/ej2-react-grids";

const MoldGrid = ({
    MoldData,
    setMoldData,
    modal3,
    toggle3,
    handleAddFormChange,
    handleAddFormSubmit,
    handleEditPartSubmit,
    handleEditPartChange,
    NewRow2,
    setPartId,
    isPartId,
    setPartNumber,
    PartNumber,
    setPart,
    partColumn,
    setpartColumn,
    setNewRow2,
    setEdit,
    editMold,
    user,
    addMoldData, Platen, setPlaten, FamilyMold, setFamilyMold
}) => {
    const toolbar = ["Search"];

    const columns = [
        {
            field: "Mold_Id",
            headerText: "Mold ID",
            width: 80,
            isPrimaryKey: true,
            template: colTemplate.bind(this),
        },
        {
            headerText: "Action",
            commands: [
                {
                    type: "Edit",
                    buttonOption: {
                        cssClass: "e-flat custom_edit",
                        iconCss: "e-edit e-icons",
                    },
                },
                {
                    type: "Delete",
                    buttonOption: {
                        cssClass: "e-flat custom_delete",
                        iconCss: "e-delete e-icons",
                    },
                },
            ],
            width: 80,
        },
    ];

    const history = useHistory();

    var grid;

    // This an local object which stores the edit mold data.
    const [editMoldData, setEditMoldData] = useState({
        Mold_Id: "",
        Platen_Orientation: "",
        Number_Of_Bases: "",
        Is_This_A_New_Mold: "",
        Number_Of_Parts: "",
    });

    // Set's the Id of the Mold in which the data has been edited.
    const [isRowId, setIsRowId] = useState(null);

    // Toggle's the Delete Modal
    const [ShowDelete, setShowDelete] = useState(false);

    const [DeleteId, setDeleteId] = useState(null);

    const handleShowDelete = () => {
        setShowDelete(!ShowDelete);
    };

    const onDelete = (id) => {
        setDeleteId(id);
        handleShowDelete();
    };

    const DeleteMold = () => {
        deleteRow2(DeleteId);
        handleShowDelete();
        setDeleteId(null);
    };

    // Redirect's to Session's page with the Id of the mold on which the user has clicked
    const handleSession = (MoldId) => {

        // Using the "btoa" method to encrypt the URL so that the exact ID should not be visible
        var MoldName = btoa(MoldId.Mold_Id);
        var Mold_Id = btoa(MoldId.id);

        history.push(`/dashboard/${MoldName}/${Mold_Id}/session`);
        
    };

    // This is the event which first store's the edited data in the local object.
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editMoldData };
        newFormData[fieldName] = fieldValue;

        setEditMoldData(newFormData);
    };

    // This the event which then updates the previous object with the edited object.
    const handleEditFormSubmit = (event) => {

        event.preventDefault();

        const editedValue = {
            id: isRowId,
            Mold_Id: editMoldData.Mold_Id,
            Platen_Orientation: editMoldData.Platen_Orientation ? editMoldData.Platen_Orientation : 'Horizontal',
            Number_Of_Bases: editMoldData.Number_Of_Bases ? editMoldData.Number_Of_Bases : 1,
            Is_This_A_New_Mold: editMoldData.Is_This_A_New_Mold ? editMoldData.Is_This_A_New_Mold : 'No',
            Number_Of_Parts: editMoldData.Number_Of_Parts ? editMoldData.Number_Of_Parts : 1,
            Part_Details: partColumn ? partColumn : "",
            Part_Data: NewRow2 ? NewRow2 : "",
            user: user.id,
        };

        const newValues = [...MoldData];

        const index = MoldData.findIndex((value) => value.id === isRowId);

        DataService.UpdateMold(isRowId, editedValue)
            .then((res) => {

                if (res.data.message) {
                }
                else {
                    newValues[index] = res.data;

                    setMoldData(newValues);

                    setEditMoldData([]);

                    toast("Mold Details Updated", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch((err) => console.log(err));

    };

    // Get's called when clicked on the delete icon and Removes that row of the grid
    const deleteRow2 = (id) => {

        const updatedRows = [...MoldData].filter((value) => {
            return value.id !== id;
        });

        setMoldData(updatedRows);

        DataService.DeleteMold(id)
            .then((res) => {
                toast("Mold Has Been Deleted", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((err) => console.log(err));
    };

    // Set's the Id of that row using which we do the editing of the data
    const setId = (mold) => {

        setIsRowId(mold.id);

        // Fetching the Data of Selected Mold
        DataService.GetMold(mold.id).then((res) => {

            if (res.data) {
                setEditMoldData(res.data)
                setNewRow2(res.data.Part_Data)
                setpartColumn(res.data.Part_Details)
            }
            else {

            }
        }).catch((err) => console.log(err))

    }

    // Get's called when clicked on the edited icon and set's the id of that row along with that set's the visibilty of edit modal to true.
    const handleEdit = (e, mold) => {
        setId(e, mold);
        setEdit();
    };

    function colTemplate(props) {
        const cellValue = props.Mold_Id;

        return (
            <p
                className="form-control session-link"
                onClick={() => handleSession(props)}
            >
                {" "}
                {cellValue}{" "}
            </p>
        );
    }

    function commandClick(args) {
        var rowData = args.rowData;

        if (args.target.classList.contains("custom_edit")) {
            handleEdit(rowData);
        }
        if (args.target.classList.contains("custom_delete")) {
            onDelete(rowData.id);
        }
    }

    function actionFailure(args) {
        console.log(args);
    }

    function created(args) {
        document
            .getElementById(grid.element.id + "_searchbar")
            .addEventListener("keyup", (args) => {
                var gridObj = document.getElementById("Grid").ej2_instances[0];

                gridObj.search(args.target.value);
            });
    }

    return (
        <>
            <div>
                <Breadcrumb title="Molds" parent="Dashboard" />
            </div>
            <div id="Container" className="container-fluid">
                <div className="card mt-4">
                    <div>
                        <Modal
                            isOpen={ShowDelete}
                            toggle={handleShowDelete}
                            centered={true}
                        >
                            <ModalHeader toggle={handleShowDelete}> Delete Mold </ModalHeader>
                            <ModalBody>
                                Deleting this mold will delete all the studies associated with
                                it. Do you want to continue ?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={DeleteMold}>
                                    {" "}
                                    Yes{" "}
                                </Button>
                                <Button color="secondary" onClick={handleShowDelete}>
                                    {" "}
                                    No{" "}
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div className="row">
                        <Mold
                            modal3={modal3}
                            toggle3={toggle3}
                            handleAddFormChange={handleAddFormChange}
                            handleAddFormSubmit={handleAddFormSubmit}
                            handleEditFormChange={handleEditFormChange}
                            handleEditFormSubmit={handleEditFormSubmit}
                            handleEditPartSubmit={handleEditPartSubmit}
                            handleEditPartChange={handleEditPartChange}
                            NewRow2={NewRow2}
                            setPartId={setPartId}
                            isPartId={isPartId}
                            setPartNumber={setPartNumber}
                            PartNumber={PartNumber}
                            setPart={setPart}
                            partColumn={partColumn}
                            setpartColumn={setpartColumn}
                            setNewRow2={setNewRow2}
                            editMold={editMold}
                            setEdit={setEdit}
                            editMoldData={editMoldData}
                            setIsRowId={setIsRowId}
                            addMoldData={addMoldData}
                            setEditMoldData={setEditMoldData}
                            Platen={Platen} setPlaten={setPlaten} FamilyMold={FamilyMold} setFamilyMold={setFamilyMold}
                        />
                    </div>
                    <div className="m-2">
                        <GridComponent
                            id="Grid"
                            dataSource={MoldData}
                            toolbar={toolbar}
                            columns={columns}
                            width="1000"
                            ref={(g) => (grid = g)}
                            commandClick={commandClick.bind(this)}
                            actionFailure={actionFailure.bind(this)}
                            created={created.bind(this)}
                        >
                            <Inject services={[Toolbar, CommandColumn]} />
                        </GridComponent>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MoldGrid;