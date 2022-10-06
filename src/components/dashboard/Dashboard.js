import React, { useState, useEffect } from 'react';
import '../App.css';
import MoldGrid from './MoldGrid';
import { nanoid } from 'nanoid';
import { connect } from 'react-redux';
import { column_data, row_data } from './Mold_Data';
import DataService from '../../services/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import Header2 from '../common/header-component/header2';

const Dashboard = ({ user }) => {

    // Toggle for showing create mold modal
    const [modal3, setModal3] = useState(false);

    // Event to do the toggling create Mold Modal
    const toggle3 = () => {
        setModal3(!modal3)
    }

    // Toggle for showing edit modal
    const [editMold, setEditMold] = useState(false);

    // Event to do the toggling part of the edit mold
    const setEdit = () => {
        setEditMold(!editMold)
    }

    // These are the states which deal with Part data details for storing and editing
    const [NewRow2, setNewRow2] = useState(row_data);
    const [editFormData, setEditFormData] = useState();
    const [isPartId, setIsPartId] = useState(null);
    const [partColumn, setpartColumn] = useState(column_data);
    const [PartNumber, setPartNumber] = useState(1);

    const [Platen, setPlaten] = useState(false);
    const [FamilyMold, setFamilyMold] = useState(false);

    // These are the state's which store the Mold's created by the user.
    const [MoldData, setMoldData] = useState([]);

    // An Local Object to store the Mold Data which is stored in the Above Mold Array.
    const [addMoldData, setAddMoldData] = useState({
        Mold_Id: "",
        Platen_Orientation: "",
        Number_Of_Bases: "",
        Is_This_A_New_Mold: "",
        Number_Of_Parts: ""
    });

    // Add Column's to the part
    const setPart = () => {

        let col = [{
            "id": 0,
            "Part": "",
            "edit": false,
            "delete": false
        }];

        for (let i = 0; i < parseInt(PartNumber); i++) {

            col.push({
                "id": nanoid(),
                "Part_No": `Part${i + 1}`,
                "delete": true
            })

        }

        setpartColumn([...col]);

    };

    // The event to store the Mold Data into the local Object.
    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addMoldData };
        newFormData[fieldName] = fieldValue;

        setAddMoldData(newFormData);
    };

    // This Event store's the Local Mold Object in the main Mold Data array.
    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        if (!addMoldData.Mold_Id) {

            toast("Please Enter Mold Data", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        }
        else if (!PartNumber) {

            toast("Please Enter No. of Parts", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        }
        else if (!NewRow2[0].Part1) {

            alert("All the fields are mandatory in part table.")

        }
        else if (!NewRow2[1].Part1) {

            alert("All the fields are mandatory in part table.")

        }
        else if (!NewRow2[2].Part1) {

            alert("All the fields are mandatory in part table.")

        }
        else if (!NewRow2[3].Part1) {

            alert("All the fields are mandatory in part table.")

        }
        else {

            const newMold = {
                "Mold_Id": addMoldData.Mold_Id,
                "Platen_Orientation": addMoldData.Platen_Orientation ? addMoldData.Platen_Orientation : 'Horizontal',
                "Number_Of_Bases": addMoldData.Number_Of_Bases ? addMoldData.Number_Of_Bases : 1,
                "Is_This_A_New_Mold": addMoldData.Is_This_A_New_Mold ? addMoldData.Is_This_A_New_Mold : "No",
                "Number_Of_Parts": addMoldData.Number_Of_Parts ? addMoldData.Number_Of_Parts : 1,
                "Part_Details": partColumn ? partColumn : '',
                "Part_Data": NewRow2 ? NewRow2 : '',
                "user": user.id
            };

            // There is an Api call inside DataService method name as SaveMold using which we are saving mold into the DB.
            DataService.SaveMold(newMold).then((res) => {
                if (res.data.message) {

                    toast('Please enter valid data', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
                else {

                    toast('Mold Has Been Created', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                    setMoldData([...MoldData, res.data])

                    addMoldData.Mold_Id = ""

                    setpartColumn(column_data);

                    setNewRow2(row_data);

                    setPartNumber(1)

                    if (Platen === true) {
                        setPlaten(false)
                    }

                    if (FamilyMold === true) {
                        setFamilyMold(false)
                    }

                    toggle3();

                }
            }).catch((err) => console.log(err))

        }
    };

    // Now these are the event's which deal with the part detail's
    // There is an Local Object 'editFormData' to store the Part Data which is stored in the NewRow2 Array.
    const handleEditPartChange = (event) => {

        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData }
        newFormData[fieldName] = fieldValue

        setEditFormData(newFormData)

    }

    // This the event which store the editFormData in the NewRow2 Array
    const handleEditPartSubmit = (event) => {

        event.preventDefault();

        const editedValue = { id: isPartId };

        const newObject = Object.assign(editedValue, editFormData);

        const newValues = [...NewRow2];

        const index = NewRow2.findIndex((value) => value.id === isPartId);

        newValues[index] = newObject;

        setNewRow2(newValues);

        setIsPartId(null);

    }

    const setPartId = (event, value) => {

        event.preventDefault();

        setIsPartId(value.id);

        const formValues = Object.assign({}, value)

        setEditFormData(formValues);

    }

    // Event to get the created mold's
    const handleGet = (id) => {

        DataService.FetchMold(id).then((res) => {

            if (res.data.message) {
                setMoldData([])
            }
            else {
                setMoldData(res.data)
            }

        }
        ).catch((err) => console.log(err))

    }

    useEffect(() => {

        if (user) {
            handleGet(user.id)
        }
        else {
            setMoldData([])
        }

    }, [user])

    return (
        <>
            <Header2 Title="Current Projects" />

            <MoldGrid handleAddFormChange={handleAddFormChange} handleAddFormSubmit={handleAddFormSubmit} MoldData={MoldData} setMoldData={setMoldData} modal3={modal3} toggle3={toggle3} handleEditPartSubmit={handleEditPartSubmit} handleEditPartChange={handleEditPartChange} NewRow2={NewRow2} setPartId={setPartId} isPartId={isPartId} setPartNumber={setPartNumber} PartNumber={PartNumber} setPart={setPart} partColumn={partColumn} setpartColumn={setpartColumn} setNewRow2={setNewRow2} setEdit={setEdit} editMold={editMold} user={user} addMoldData={addMoldData} Platen={Platen} setPlaten={setPlaten} FamilyMold={FamilyMold} setFamilyMold={setFamilyMold} />

            <ToastContainer />

        </>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Dashboard);
