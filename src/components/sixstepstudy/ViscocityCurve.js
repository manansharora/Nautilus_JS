import React, { useEffect, useState, useRef } from "react";

// Syncfusion chart control
import {
    ChartComponent,
    LineSeries,
    Inject,
    SeriesCollectionDirective,
    SeriesDirective,
    Category,
    DataLabel,
} from "@syncfusion/ej2-react-charts";

// This is a modal imported from modals folder since we have a button i.e Generate Injection Speed this modal gets displayed
// import Viscocity from '../modals/Viscocity';

// CSS
import "../App.css";

// This is the Grid/Table of our viscosity curve import from Grids folder
import ViscocityGrid from "../Grids/ViscocityGrid";

// ViscosityGridData array is holding this data.
import data from "../data/Viscocity_curve_data.json";

// Generates random id's
import { nanoid } from "nanoid";

// Event having multiple method's to deal with the back-end
import DataService from "../../services/ApiService";

// Hook to get the parameter's from the URL
import { useParams } from "react-router-dom";

// A package which scroll's to different section of page on button click
import { scroller } from "react-scroll";

import ViscocityAddRow from "../columns&rows/ViscocityAddRow";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

// Import TextEditor Functionality from Syncfusion
import {
    HtmlEditor,
    RichTextEditorComponent,
    Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";

import { useReactToPrint } from "react-to-print";

import ViscosityPrint from "../printables/ViscosityPrint";

import { toast } from "react-toastify";

const ViscocityCurve = ({ showAlert }) => {

    // Set's the visibility of the Generate Injection Speed modal
    // const [modal, setModal] = useState();
    // const toggle = () => {
    //     setModal(!modal)
    // }

    // Set's the visibility of the modal which we use to get the number of row's to be generated which is imported in Viscosity Grid.
    const [ViscosityAddRowModal, setViscosityAddRowModal] = useState();

    const ToggleAddRowModal = () => {
        setViscosityAddRowModal(!ViscosityAddRowModal);
    };

    // This is our main array based on which all the row manupulation is done and which holds the row data as well.
    const [ViscosityGridData, setViscosityGridData] = useState([]);

    // As the user enter's the number of row's it get's set in this variable.
    const [row, setRow] = useState();

    const [Alert, setAlert] = useState(false);

    // This is the event to do the above said thing.
    const addRow = (e) => {

        e.preventDefault();

        setRow(e.target.value);

    };

    // This is a simple array which holds the number of objects based on the row variable
    const AddedRow = [];

    // This is the event which gets called as the user click's ok in the add row modal.
    // what it does is it run's a loop as many times the row variable is and along with that it pushes an object containing all the key's based on the grid with an id generated using nanoid library and then set's the row1 in the main array i.e ViscosityGridData.

    // Then using editFormData object, handleEditFormChange and handleEditFormSubmit we store the data in these objects as the user enter's in the grid's input field's
    const increaseRow = () => {

        if (isNaN(row)) {

            alert("Please enter number of rows you would like to add.")

        }
        else {

            for (let i = 0; i < parseInt(row); i++) {

                AddedRow.push({
                    id: nanoid(),
                    Injection_Speed: "",
                    Fill_Time: "",
                    Peak_Inj_Press: "",
                    Viscosity: "",
                    Shear_Rate: "",
                });

            }

            setViscosityGridData([...ViscosityGridData, ...AddedRow]);

            showAlert.current = true

            setAlert(true)

            setRow(null)

        }

    };

    // This is the event which deletes the row as clicked on the delete icon, id of the row gets passed and using filter method that row is filtered out.
    const deleteRow2 = (id) => {

        const updatedRows = [...ViscosityGridData].filter((value) => {
            return value.id !== id;
        });

        setViscosityGridData(updatedRows);

        showAlert.current = true;

        setAlert(true)

    };

    // There is an input field in viscosity curve asking for Intensification Ratio so this is a variable which holds the value of it and is used for calculations wherever needed.
    const [IntensificationRatio, setIntensificationRatio] = useState();
    const [Injection_Speed_Units, setInjection_Speed_Units] = useState("in/sec");
    const [Pressure_Units, setPressure_Units] = useState();

    const [minInjection, setMinInjection] = useState();
    const [maxInjection, setMaxInjection] = useState();

    const [minViscosity, setMinViscosity] = useState();
    const [maxViscosity, setMaxViscosity] = useState();

    const [minShear, setMinShear] = useState();
    const [maxShear, setMaxShear] = useState();

    // An object in which we Initially store the new values entered in row/column and then we replace this object with the existing object in our main array.
    const [editFormData, setEditFormData] = useState({
        Injection_Speed: "",
        Fill_Time: "",
        Peak_Inj_Press: "",
        Viscosity: "",
        Shear_Rate: "",
    });

    // This event is called when the input field's of the grid get's changed.
    const handleEditFormChange = (event) => {

        event.preventDefault();

        // Here the logic is like, as the event get's called on change of the input field it get's the name and value of that input field and then it is stored in the editFormData object.

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    // When clicked on any row of the grid this event set's the id of that row in itself using this variable we check exactly in which row change has been done and help's to switch between editable and readOnly row.
    const [isRowId, setIsRowId] = useState(null);

    // Once the data in inside editFormData then using isRowId we check exactly in which row data has been entered and including that row's id and values inside editFormdata we create a new local object and this object is replaced with the existing row's object.
    // In such way we store the initially entered values and the changed values in our main array.
    const handleEditFormSubmit = (event) => {

        event.preventDefault();

        // This is the local object mentioned above
        const editedValue = {
            id: isRowId,
            Injection_Speed: editFormData.Injection_Speed ? editFormData.Injection_Speed : "",
            Fill_Time: editFormData.Fill_Time ? editFormData.Fill_Time : "",
            Peak_Inj_Press: editFormData.Peak_Inj_Press ? editFormData.Peak_Inj_Press : "",
            Viscosity: Math.round(
                editFormData.Fill_Time *
                editFormData.Peak_Inj_Press *
                IntensificationRatio
            ),
            Shear_Rate: isFinite(Number(1 / editFormData.Fill_Time)) ? Number(1 / editFormData.Fill_Time).toFixed(3) : ""
        };

        const newValues = [...ViscosityGridData];

        const index = ViscosityGridData.findIndex((value) => value.id === isRowId);

        newValues[index] = editedValue;

        setViscosityGridData(newValues);

        setIsRowId(null);

    };

    const handleIntensification = (e) => {

        e.preventDefault();

        setIntensificationRatio(e.target.value);

        handleEditFormSubmit(e);

    };

    const setId = (event, NewRow) => {

        event.preventDefault();

        setIsRowId(NewRow.id);

        const formValues = {
            Injection_Speed: NewRow.Injection_Speed,
            Fill_Time: NewRow.Fill_Time,
            Peak_Inj_Press: NewRow.Peak_Inj_Press,
        };

        setEditFormData(formValues);

        showAlert.current = true

        setAlert(true)

    };

    // Session Id getting from the URL
    const [SessionId, setSessionId] = useState();

    // Event to Scroll to Chart
    const scrollToChart = () => {

        setGraph();

        scroller.scrollTo("viscosity-Chart", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });

    };

    // Event to Scroll to Grid
    const scrollToGrid = () => {

        scroller.scrollTo("viscosity-Grid", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });

    };

    // This event get's called on the Show Graph button and based on the data in the ViscosityGridData array it set's the values.
    const setGraph = () => {

        scaleGraph();
        scaleGraph2();

    };

    // Based on the grid we will be showing two chart's one is Injection Speed and other is shear rate so this is a boolean variable which switches between true/false on a Drop Down below and due to that the respective chart code gets rendered.
    const [Injection_Speed, setInjection_Speed] = useState(true);

    // This is the event which does the switching part.
    const ChangeGraph = () => {
        setInjection_Speed(!Injection_Speed);
    };

    // To get the Id's from url using useParams hook
    var { sessionId, moldName, sessionName } = useParams();

    // Variable to store the Mold/Session Name
    const [Mold_Name, setMold_Name] = useState();
    const [Session_Name, setSession_Name] = useState();

    // Boolean variable to switch between the save and update button
    const [showSave, setShowSave] = useState(true);

    // A state variable to store and set the value of textarea
    const [Comment, setComment] = useState("");

    let toolbarSettings = {

        items: [
            "Bold",
            "Italic",
            "Underline",
            "FontSize",
            "FontColor",
            "BackgroundColor",
            "Alignments",
            "OrderedList",
            "UnorderedList",
            "Undo",
            "Redo",
        ],

    };

    // Event to set the data entered in the textarea
    const getComment = (e) => {

        if (e.target) {
            setComment(e.target.value);
        } else {
            setComment(e.value); // Get the RTE value
            showAlert.current = true
            setAlert(true)
        }

    };

    // Event to Call the POST request API and save the data
    const saveData = () => {

        const data = {
            session: SessionId,
            Injection_Speed_Units: Injection_Speed_Units
                ? Injection_Speed_Units
                : "in/sec",
            IntensificationRatio: IntensificationRatio ? IntensificationRatio : 0,
            Pressure_Units: Pressure_Units ? Pressure_Units : 0,
            Grid_Data: ViscosityGridData,
            Comment: Comment ? Comment : "N/A",
        };

        DataService.SaveViscosity(data)
            .then((res) => {

                setAlert(false)

                toast("Data has been saved", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setShowSave(false);

                showAlert.current = false
            })
            .catch((err) => console.log(err));

    };

    // Event to Call the PUT request API and update the data
    const updateData = () => {

        const data = {
            session: SessionId,
            Injection_Speed_Units: Injection_Speed_Units
                ? Injection_Speed_Units
                : "in/sec",
            IntensificationRatio: IntensificationRatio ? IntensificationRatio : 0,
            Pressure_Units: Pressure_Units ? Pressure_Units : 0,
            Grid_Data: ViscosityGridData,
            Comment: Comment ? Comment : "N/A",
        };

        DataService.UpdateViscosity(SessionId, data)
            .then((res) => {

                setAlert(false)

                toast("Data has been Updated", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                showAlert.current = false

            })
            .catch((err) => console.log(err));

    };

    // Event to GET the current session's viscosity data
    const handleGet = (SessionId) => {

        if (SessionId) {
            DataService.FetchViscosity(SessionId)
                .then((res) => {
                    if (res.data) {

                        setViscosityGridData(res.data.Grid_Data);
                        setIntensificationRatio(res.data.IntensificationRatio);
                        setComment(res.data.Comment);
                        setPressure_Units(res.data.Pressure_Units);
                        setShowSave(false);

                    } else {

                        setViscosityGridData(data);

                    }
                })
                .catch((err) => console.log(err));
        } else {
            setViscosityGridData(data);
        }

    };

    // Event that will be called as soon as the Viscosity Curve Page load's so that if there is data available will get fetched
    useEffect(() => {
        
        // On load it decrypt's the session Id
        setSessionId(atob(sessionId));

        setMold_Name(atob(moldName));
        setSession_Name(atob(sessionName));

        // After that it call's this event to fetch the data
        handleGet(SessionId);

    }, [sessionId, SessionId, moldName, sessionName]);

    // Hooks and Event's for RTE Control
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => setShow(true);

    // Hooks and Events for the Print Control
    const [showPrint, setShowPrint] = useState(false);

    const componentRef = useRef();

    const printPage = useReactToPrint({

        content: () => componentRef.current,
        onBeforePrint: () => setShowPrint(true),
        onAfterPrint: () => setShowPrint(false),

    });

    // Set's the visibility of HTML Part to true and then call's print event
    const handlePrint = () => {

        setShowPrint(true);

        setTimeout(() => {

            printPage();

        }, 100);

        setGraph()
    };

    // Event to set the Min, Max and Interval of graph i.e scalling the graph
    const scaleGraph = () => {

        // To store the sorted Array
        let InjectionArray = [],
            ViscosityArray = [];

        // This is the event to sort the data based on Injection Speed
        const CompareInjectionSpeed = (a, b) => {
            return a.Injection_Speed - b.Injection_Speed;
        };

        // This is the event to sort the data based on Viscosity
        const CompareViscosity = (a, b) => {
            return a.Viscosity - b.Viscosity;
        };

        for (let i = 0; i < ViscosityGridData.length; i++) {

            if (ViscosityGridData[i].Injection_Speed) {
                InjectionArray.push(ViscosityGridData[i]);
                ViscosityArray.push(ViscosityGridData[i]);
            } else {
            }

        }

        ViscosityGridData.sort(CompareInjectionSpeed);
        InjectionArray.sort(CompareInjectionSpeed);
        ViscosityArray.sort(CompareViscosity);

        setMinInjection(
            parseInt(InjectionArray[0].Injection_Speed) -
            parseInt(InjectionArray[0].Injection_Speed) / 10
        );

        setMaxInjection(
            parseInt(InjectionArray[InjectionArray.length - 1].Injection_Speed) +
            parseInt(InjectionArray[InjectionArray.length - 1].Injection_Speed) /
            15
        );

        setMinViscosity(
            parseInt(ViscosityArray[0].Viscosity) -
            parseInt(ViscosityArray[0].Viscosity) / 5
        );

        setMaxViscosity(
            parseInt(ViscosityArray[InjectionArray.length - 1].Viscosity) +
            parseInt(ViscosityArray[InjectionArray.length - 1].Viscosity) / 10
        );

    };

    let shearRateArray = [];

    // Event to set the Min, Max and Interval of graph i.e scalling the graph
    const scaleGraph2 = () => {

        // This is the event to sort the data based on Shear Rate
        const compareShearRate = (a, b) => {
            return a.Shear_Rate - b.Shear_Rate;
        };

        for (let i = 0; i < ViscosityGridData.length; i++) {

            if (ViscosityGridData[i].Injection_Speed) {

                shearRateArray.push(ViscosityGridData[i]);

            }
            else {

            }

        }

        shearRateArray.sort(compareShearRate);

        setMinShear(
            parseFloat(shearRateArray[0].Shear_Rate) -
            parseFloat(shearRateArray[0].Shear_Rate) / 10
        );

        setMaxShear(
            parseFloat(shearRateArray[shearRateArray.length - 1].Shear_Rate) +
            parseFloat(shearRateArray[shearRateArray.length - 1].Shear_Rate) / 10
        );


    };

    return (
        <>
            <div className="Viscosity pb-4 viscosity-Grid">
                <section className="card">
                    <form autoComplete="off">
                        <div className="viscocity-curve mt-2">
                            <div className="d-flex">
                                <div className="d-flex">
                                    <div className="m-2">
                                        <label
                                            htmlFor="Injection_Speed_Units"
                                            className="lbl_design"
                                        >
                                            {" "}
                                            Injection Speed Units:{" "}
                                        </label>
                                    </div>
                                    <div>
                                        <select
                                            className="mt-2"
                                            onChange={(e) => setInjection_Speed_Units(e.target.value)}
                                            name="Injection_Speed_Units"
                                        >
                                            <option> in/sec </option>
                                            <option> mm/sec </option>
                                            <option> in^3/sec </option>
                                            <option> cm^3/sec </option>
                                            <option> cms/sec </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="m-2">
                                        <label
                                            htmlFor="Intensification_Ratio"
                                            className="lbl_design"
                                        >
                                            Intensification Ratio:
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="viscosity-inputs mt-2"
                                            onChange={handleIntensification}
                                            name="Intensification_Ratio"
                                            defaultValue={IntensificationRatio}
                                            onKeyPress={(event) => {
                                                if (!/[-0.0-9.0]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="m-2">
                                        <label htmlFor="Pressure_Units" className="lbl_design">
                                            {" "}
                                            Pressure Units:{" "}
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="viscosity-inputs mt-2"
                                            onChange={(e) => setPressure_Units(e.target.value)}
                                            name="Pressure_Units"
                                            defaultValue={Pressure_Units}
                                            type="text"
                                        />
                                    </div>
                                </div>
                                {/* <div className="col-md-2">
                                            <div className="step-button">
                                                <button className="btn btn-pill btn-primary btn-air-primary" type="button" onClick={toggle}>Generate Injection Speed</button>
                                                {modal && <Viscocity toggle={toggle} modal={modal} />}
                                            </div >
                                        </div> */}
                            </div>
                        </div>
                    </form>
                </section>

                <div className="card">
                    <div className="grid-chart-container m-2">
                        <div className="mb-4 d-flex justify-content-between">
                            <div>
                                <button
                                    className="btn btn-pill btn-secondary btn-air-secondary mr-4"
                                    type="button"
                                    onClick={ToggleAddRowModal}
                                >
                                    {" "}
                                    Add Row{" "}
                                </button>
                                <ViscocityAddRow
                                    ToggleAddRowModal={ToggleAddRowModal}
                                    ViscosityAddRowModal={ViscosityAddRowModal}
                                    addRow={addRow}
                                    increaseRow={increaseRow}
                                />
                            </div>

                            <div className="d-flex justify-content-between">
                                <div>
                                    {showSave ? (
                                        <button
                                            className="btn btn-pill btn-secondary btn-air-secondary"
                                            type="button"
                                            onClick={saveData}
                                        >
                                            {" "}
                                            Save{" "}
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-pill btn-fifth btn-air-fifth"
                                            type="button"
                                            onClick={updateData}
                                        >
                                            {" "}
                                            Update & Save{" "}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    className="btn btn-pill btn-primary btn-air-primary mr-2"
                                    onClick={scrollToChart}
                                >
                                    {" "}
                                    Show Graph{" "}
                                </button>

                                <button
                                    className="btn btn-pill btn-fifth btn-air-fifth mr-2"
                                    type="button"
                                    onClick={handlePrint}
                                >
                                    {" "}
                                    Print{" "}
                                </button>

                                <button
                                    className="btn btn-pill btn-primary btn-air-primary"
                                    type="button"
                                    onClick={handleShow}
                                >
                                    Comment
                                </button>

                                <Modal isOpen={show} centered>
                                    <ModalHeader toggle={handleClose}>Add Comment</ModalHeader>
                                    <ModalBody>
                                        <RichTextEditorComponent
                                            change={getComment}
                                            value={Comment}
                                            saveInterval="1"
                                            toolbarSettings={toolbarSettings}
                                            height={250}
                                        >
                                            <Inject services={[Toolbar, HtmlEditor]} />
                                        </RichTextEditorComponent>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="dark" onClick={handleClose}>
                                            {" "}
                                            Save & Close{" "}
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>

                        <div>
                            <ViscocityGrid
                                ToggleAddRowModal={ToggleAddRowModal}
                                ViscosityAddRowModal={ViscosityAddRowModal}
                                addRow={addRow}
                                increaseRow={increaseRow}
                                ViscosityGridData={ViscosityGridData}
                                deleteRow2={deleteRow2}
                                handleEditFormChange={handleEditFormChange}
                                handleEditFormSubmit={handleEditFormSubmit}
                                setId={setId}
                                isRowId={isRowId}
                                editFormData={editFormData}
                                IntensificationRatio={IntensificationRatio}
                                setGraph={setGraph} Alert={Alert}
                            />
                        </div>
                    </div>
                </div>

                <section className="card mt-4 viscosity-Chart">
                    <div className="grid-chart-container m-4">
                        <div className="d-flex justify-content-between">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="lbl_design"> X-Axis: </label>
                                    <select
                                        className="form-control digits"
                                        onChange={ChangeGraph}
                                    >
                                        <option> Injection Speed </option>
                                        <option> Shear Rate </option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    className="btn btn-pill btn-primary btn-air-primary"
                                    onClick={scrollToGrid}
                                >
                                    Back to Data
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">

                                <div className={Injection_Speed ? "ViscosityChart" : "Viscosity_Showable_Chart"}>

                                    <ChartComponent
                                        width="1000"
                                        title="Viscosity Curve"
                                        primaryXAxis={{
                                            title: `Injection Speed (${Injection_Speed_Units})`,
                                            minimum: minInjection ? minInjection : 0,
                                            maximum: maxInjection ? maxInjection : 0,
                                        }}
                                        primaryYAxis={{
                                            title: "psi - sec",
                                            minimum: minViscosity ? minViscosity : 0,
                                            maximum: maxViscosity ? maxViscosity : 0,
                                        }}
                                    >
                                        <Inject services={[LineSeries, Category, DataLabel]} />

                                        <SeriesCollectionDirective>
                                            <SeriesDirective
                                                dataSource={ViscosityGridData}
                                                type="Line"
                                                xName="Injection_Speed"
                                                yName="Viscosity"
                                                marker={{ dataLabel: { visible: true }, visible: true }}
                                                fill="rgb(2,0,4)"
                                                width={2.5}
                                            ></SeriesDirective>
                                        </SeriesCollectionDirective>

                                    </ChartComponent>

                                </div>

                                <div className={Injection_Speed ? "Viscosity_Showable_Chart" : "ViscosityChart"}>

                                    <ChartComponent width='1000' title="Viscosity Curve" primaryXAxis={{
                                        title: "Shear Rate (1 / sec)", valueType: 'Double',
                                        minimum: minShear ? minShear : 0,
                                        maximum: maxShear ? maxShear : 0
                                    }} primaryYAxis={{
                                        title: "psi - sec", minimum: minViscosity ? minViscosity : 0,
                                        maximum: maxViscosity ? maxViscosity : 0
                                    }}>

                                        <Inject services={[LineSeries, Category, DataLabel]} />

                                        <SeriesCollectionDirective>
                                            <SeriesDirective dataSource={ViscosityGridData} type="Line" xName="Shear_Rate" yName="Viscosity" marker={{ dataLabel: { visible: true }, visible: true }} fill="rgb(2,0,4)" width={2.5}></SeriesDirective>
                                        </SeriesCollectionDirective>

                                    </ChartComponent>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ******************** Printable Part ******************** */}
            <section
                className={showPrint ? "Printable_Part" : "Showable_Part"}
                ref={componentRef}
            >
                <ViscosityPrint
                    Injection_Speed_Units={Injection_Speed_Units}
                    IntensificationRatio={IntensificationRatio}
                    Pressure_Units={Pressure_Units}
                    ViscosityGridData={ViscosityGridData}
                    Injection_Speed={Injection_Speed}
                    Mold_Name={Mold_Name}
                    Session_Name={Session_Name}
                    Comment={Comment}
                    maxViscosity={maxViscosity}
                    minViscosity={minViscosity}
                    maxShear={maxShear}
                    minShear={minShear}
                    minInjection={minInjection}
                    maxInjection={maxInjection}
                />
            </section>
        </>
    );
};

export default ViscocityCurve;
