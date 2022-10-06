import React, { useState, useEffect, useRef } from 'react';

import { ChartComponent, LineSeries, SeriesCollectionDirective, SeriesDirective, Category, DataLabel } from '@syncfusion/ej2-react-charts';

// import Pressure from "../modals/Pressure";
import PressureGrid from '../Grids/PressureGrid';
import { nanoid } from 'nanoid'
import data from "../data/Pressure_Drop_Data.json"

// Event having multiple method's to deal with the back-end
import DataService from '../../services/ApiService'

// Hook to get the parameter's from the URL
import { useParams } from 'react-router-dom';

// A package which scroll's to different section of page on button click
import { scroller } from "react-scroll";

import { Button } from 'reactstrap';
import PressureAddRow from '../columns&rows/PressureAddRow';
import { HtmlEditor, Inject, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { useReactToPrint } from 'react-to-print';
import PressurePrint from '../printables/PressurePrint';

import { toast } from 'react-toastify';

const PressureDropStudy = ({ showAlert }) => {

    // const [modal, setModal] = useState();

    // const toggle = () => {
    //     setModal(!modal)
    // }

    const [modal2, setModal2] = useState();

    const toggle2 = () => {
        setModal2(!modal2)
    }

    const [row, setRow] = useState();
    const [PressureGridRow, setPressureGridRow] = useState([]);

    const addRow = (e) => {
        e.preventDefault();
        setRow(e.target.value)
    }

    // This is a simple array which holds the number of objects based on the row variable
    const AddedRow = [];

    const increaseRow = () => {

        for (let i = 0; i < parseInt(row); i++) {

            AddedRow.push({
                id: nanoid(),
                Flow_Area: "",
                Peak_Pressure: "",
                Percent_Maximum: "",
                Delta_P: "",
                Percent_Delta_P: ""
            })

        }

        setPressureGridRow([...PressureGridRow, ...AddedRow]);

        showAlert.current = true

        setAlert(true)

        setRow(null)

    };

    const deleteRow2 = (id) => {

        const NewRows = [...PressureGridRow].filter((value) => {
            return value.id !== id;
        });

        setPressureGridRow(NewRows);

        console.log(NewRows);

        showAlert.current = true;

        setAlert(true)

    };

    const [Max_Press_Available, setMax_Press_Available] = useState()
    const [Units, setUnits] = useState()
    const [Nozzle_Length, setNozzle_Length] = useState()
    const [Orifice_Diameter, setOrifice_Diameter] = useState()
    const [MaxPressData, setMaxPressData] = useState()
    const [minPressure, setMinPressure] = useState()
    const [ChartData, setChartData] = useState()
    const [Interval, setInterval] = useState()

    const [editFormData, setEditFormData] = useState({
        Flow_Area: "",
        Peak_Pressure: "",
        Percent_Maximum: "",
        Max_Press_Available: Max_Press_Available
    })

    const [isRowId, setIsRowId] = useState(null)

    const [Alert, setAlert] = useState(false);

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);

        showAlert.current = true

        setAlert(true)

    }

    const handleEditFormSubmit = (event) => {

        event.preventDefault();

        if (parseFloat(editFormData.Peak_Pressure) > parseFloat(Max_Press_Available)) {

            alert("Peak pressure should be less than max pressure available.")

        }
        else {

            const editedValue = {
                id: isRowId,
                Flow_Area: editFormData.Flow_Area,
                Peak_Pressure: editFormData.Peak_Pressure,
                Percent_Maximum: (editFormData.Peak_Pressure * 100) / Max_Press_Available,
                Max_Press_Available: Max_Press_Available
            }

            const newValues = [...PressureGridRow];

            const index = PressureGridRow.findIndex((value) => value.id === isRowId)

            newValues[index] = editedValue;

            setPressureGridRow(newValues);

            setIsRowId(null);

        }

    }

    const setId = (event, NewRow) => {

        event.preventDefault();

        setIsRowId(NewRow.id);

        const formValues = {
            Flow_Area: NewRow.Flow_Area,
            Peak_Pressure: NewRow.Peak_Pressure,
            Percent_Maximum: NewRow.Percent_Maximum,
        }

        setEditFormData(formValues);
    }

    const setGraph = (event) => {

        let maxArray = []

        for (let i = 0; i < PressureGridRow.length; i++) {

            maxArray.push({
                "id": nanoid(),
                "Flow_Area": PressureGridRow[i].Flow_Area,
                "Max_Press_Available": Max_Press_Available
            })

        }

        setMaxPressData(maxArray)

        scaleGraph()

    }

    const scaleGraph = () => {

        let pressureArray = []

        // This is the event to sort the data based on Injection Speed
        const Compare = (a, b) => {
            return a.Peak_Pressure - b.Peak_Pressure;
        }

        for (let i = 0; i < PressureGridRow.length; i++) {

            if (PressureGridRow[i].Peak_Pressure) {

                pressureArray.push(PressureGridRow[i])

            } else {

            }
        }

        pressureArray.sort(Compare)

        setMinPressure(parseInt(pressureArray[0].Peak_Pressure) - (parseInt(pressureArray[0].Peak_Pressure) / 10))

        setInterval(parseInt(pressureArray[pressureArray.length - 1].Peak_Pressure) - parseInt(pressureArray[0].Peak_Pressure))

    }

    // Session Id getting from the URL
    const [SessionId, setSessionId] = useState()

    // Event to Scroll to Chart
    const scrollToChart = () => {

        if (PressureGridRow[0].Flow_Area) {

            setGraph()

            scroller.scrollTo("Pressure-Chart", {
                duration: 800,
                delay: 0,
                smooth: "easeInOutQuart",
            });

            setChartData(PressureGridRow)

        }
        else {

            toast("Insufficient Data to plot the chart", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        }
    };

    // Event to Scroll to Grid
    const scrollToGrid = () => {
        scroller.scrollTo("Pressure-grid", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    };

    // To get the Session Id from url using useParams hook
    var { sessionId, moldName, sessionName } = useParams();

    // Variable to store the a Mold/Session Name
    const [Mold_Name, setMold_Name] = useState();
    const [Session_Name, setSession_Name] = useState();

    // Boolean variable to switch between the save and update button
    const [showSave, setShowSave] = useState(true)

    // Event to Call the POST request API and save the data
    const saveData = () => {

        const data = {
            "session": SessionId,
            "Units": Units ? Units : "psi",
            "Nozzle_Length": Nozzle_Length ? Nozzle_Length : 1,
            "Orifice_Diameter": Orifice_Diameter ? Orifice_Diameter : 1,
            "Max_Pressure_Available": Max_Press_Available,
            "Grid_Data": PressureGridRow,
            "Comment": Comment ? Comment : "N/A"
        }

        DataService.SavePressure(data).then((res) => {

            toast("Data has been saved", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })


            setShowSave(false);

            showAlert.current = false

            setAlert(false)

        }).catch((err) => console.log(err))

    }

    // Event to Call the PUT request API and update the data
    const updateData = () => {

        const data = {
            "session": SessionId,
            "Units": Units ? Units : "psi",
            "Nozzle_Length": Nozzle_Length ? Nozzle_Length : "",
            "Orifice_Diameter": Orifice_Diameter ? Orifice_Diameter : "",
            "Max_Pressure_Available": Max_Press_Available,
            "Grid_Data": PressureGridRow,
            "Comment": Comment ? Comment : "N/A"
        }

        DataService.UpdatePressure(SessionId, data).then((res) => {

            toast("Data has been updated", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            showAlert.current = false

            setAlert(false)

        }).catch((err) => console.log(err))

    }

    // Event the current session's viscosity data 
    const handleGet = (SessionId) => {

        if (SessionId) {

            DataService.FetchPressure(SessionId).then((res) => {

                if (res.data) {
                    setPressureGridRow(res.data.Grid_Data)
                    setMax_Press_Available(res.data.Max_Pressure_Available)
                    setNozzle_Length(res.data.Nozzle_Length)
                    setOrifice_Diameter(res.data.Orifice_Diameter)
                    setComment(res.data.Comment)
                    setUnits(res.data.Units)
                    setShowSave(false)
                }
                else {
                    setPressureGridRow(data)
                }

            }).catch((err) => console.log(err))

        }
        else {
            setPressureGridRow(data)
        }

    }

    // Event that will be called as soon as the Pressure Drop Page load's so that if there is data available will get fetched
    useEffect(() => {

        // On load it decrypt's the session Id
        setSessionId(atob(sessionId))

        setMold_Name(atob(moldName))
        setSession_Name(atob(sessionName))

        // After that it call's this event to fetch the data
        handleGet(SessionId)

    }, [sessionId, SessionId, moldName, sessionName])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // A state variable to store and set the value of textarea
    const [Comment, setComment] = useState('');

    let toolbarSettings = {
        items: ['Bold', 'Italic', 'Underline', 'FontSize', 'FontColor', 'BackgroundColor', 'Alignments', 'OrderedList', 'UnorderedList', 'Undo', 'Redo']
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

    const [showPrint, setShowPrint] = useState(false);

    const componentRef = useRef();

    const printPage = useReactToPrint({

        content: () => componentRef.current,
        onBeforePrint: () => setShowPrint(true),
        onAfterPrint: () => setShowPrint(false)

    });

    const handlePrint = () => {

        setShowPrint(true)

        setTimeout(() => {
            printPage()
        }, 100);
    }

    return (
        <>
            <div className='Pressure p-2'>
                <section className='card'>
                    <form autoComplete='off'>
                        <div className="d-flex">
                            <div className='d-flex'>
                                <div className='m-2'>
                                    <label className="lbl_design"> Units: </label>
                                </div>
                                <div>
                                    <select className="mt-2" onChange={(e) => setUnits(e.target.value)}>
                                        <option>{"psi"}</option>
                                        <option>{"mPa"}</option>
                                        <option>{"bar"}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className='m-2'>
                                    <label htmlFor="Nozzle_Length" className="lbl_design">Nozzle Length:</label>
                                </div>
                                <div>
                                    <input className="viscosity-inputs mt-2" id="Nozzle_Length" type="text" defaultValue={Nozzle_Length} onChange={(e) => setNozzle_Length(e.target.value)} />
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className='m-2'>
                                    <label htmlFor="Orifice_Diameter" className="lbl_design"> Orifice Diameter: </label>
                                </div>
                                <div>
                                    <input className="viscosity-inputs mt-2" id="Orifice_Diameter" type="text" defaultValue={Orifice_Diameter} onChange={(e) => setOrifice_Diameter(e.target.value)} />
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className='m-2'>
                                    <label htmlFor="Max_Pressure_Available" className="lbl_design"> Max Pressure Available: </label>
                                </div>
                                <div>
                                    <input className="viscosity-inputs mt-2" onKeyPress={(event) => {
                                        if (!/[-0.0-9.0]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }} name="Max_Press_Available" type="text" defaultValue={Max_Press_Available} onChange={(e) => setMax_Press_Available(e.target.value)} />
                                </div>
                            </div>
                            {/* <div className="col-md-4">
                                <div className="step-button">
                                    <div className="pre-step-button2">
                                        <Button color="primary" className="btn-max-pre" onClick={toggle}>{"Select Max Press from machine DB"}</Button>
                                    </div>

                                </div>
                            </div>
                            {modal && <Pressure toggle={toggle} modal={modal} />} */}
                        </div>
                    </form>
                </section>

                <section className="Pressure-grid card p-4">
                    <div className="mb-4 d-flex justify-content-between">
                        <div>
                            <button className="btn btn-pill btn-secondary btn-air-secondary mr-4" type="button" onClick={toggle2}> Add Row </button>
                            <PressureAddRow toggle2={toggle2} modal2={modal2} addRow={addRow} increaseRow={increaseRow} />
                        </div>

                        <div className='d-flex justify-content-between'>
                            <div>
                                {showSave ? <button className="btn btn-pill btn-secondary btn-air-secondary" type="button" onClick={saveData}> Save </button> : <button className="btn btn-pill btn-fifth btn-air-fifth" type="button" onClick={updateData}> Update & Save </button>}
                            </div>
                        </div>

                        <div>
                            <button className="btn btn-pill btn-secondary btn-air-secondary mr-4" type="button" onClick={scrollToChart}> Show Graph </button>

                            <button className="btn btn-pill btn-fifth btn-air-fifth mr-2" type="button" onClick={handlePrint}> Print </button>

                            <button className="btn btn-pill btn-primary btn-air-primary mr-4" type="button" onClick={handleShow}> Comment </button>

                            <Modal isOpen={show} centered={true} >
                                <ModalHeader toggle={handleClose}>
                                    Add Comment
                                </ModalHeader>
                                <ModalBody>
                                    <RichTextEditorComponent change={getComment}
                                        value={Comment}
                                        saveInterval="1" toolbarSettings={toolbarSettings} height={250}>
                                        <Inject services={[Toolbar, HtmlEditor]} />
                                    </RichTextEditorComponent>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="dark" onClick={handleClose}> Save & Close </Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                    <div className="grid-chart-container">
                        <div>
                            <PressureGrid toggle2={toggle2} modal2={modal2} addRow={addRow} increaseRow={increaseRow} PressureGridRow={PressureGridRow} deleteRow2={deleteRow2} handleEditFormChange={handleEditFormChange} handleEditFormSubmit={handleEditFormSubmit} setId={setId} isRowId={isRowId} editFormData={editFormData} Max_Press_Available={Max_Press_Available} scrollToChart={scrollToChart} Alert={Alert} setEditFormData={setEditFormData} />
                        </div>
                    </div>

                </section>

                <section className="Pressure-Chart card p-4">

                    <div className="grid-chart-container">
                        <div className="chart_container_btn">
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <button className="btn btn-pill btn-primary btn-air-primary mr-4" type="button" onClick={scrollToGrid}> Back to Data </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ChartComponent title="Pressure Drop Study" primaryXAxis={{ valueType: "Category", title: "Flow Area" }} primaryYAxis={{ title: "Max Pressure", minimum: isNaN(minPressure) ? 0 : minPressure ? minPressure : 0 }}>

                                <Inject services={[LineSeries, Category, DataLabel]} />

                                <SeriesCollectionDirective>

                                    <SeriesDirective type="Line" dataSource={MaxPressData} xName="Flow_Area" yName="Max_Press_Available" fill="rgb(255,0,0)" width={2.5}></SeriesDirective>

                                    <SeriesDirective type="Line" dataSource={ChartData} xName="Flow_Area" yName="Peak_Pressure" marker={{ dataLabel: { visible: true }, visible: true }} width={2.5}></SeriesDirective>

                                </SeriesCollectionDirective>

                            </ChartComponent>
                        </div>
                    </div>
                </section>
            </div>

            {/* ******************** Printable Part ******************** */}
            <section className={showPrint ? 'Printable_Part' : 'Showable_Part'} ref={componentRef}>

                <PressurePrint Units={Units} Nozzle_Length={Nozzle_Length} Orifice_Diameter={Orifice_Diameter} Max_Press_Available={Max_Press_Available} PressureGridRow={PressureGridRow} Mold_Name={Mold_Name} Session_Name={Session_Name} minPressure={minPressure} MaxPressData={MaxPressData} Comment={Comment} Interval={Interval} ChartData={ChartData} />

            </section>

        </>
    )
}

export default PressureDropStudy;
