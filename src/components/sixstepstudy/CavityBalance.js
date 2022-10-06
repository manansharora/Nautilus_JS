import React, { useState, useEffect, useRef } from 'react';

// Chart from syncfusion
import { ChartComponent, LineSeries, Inject, SeriesCollectionDirective, SeriesDirective, Category, DataLabel } from '@syncfusion/ej2-react-charts';

// Button From Bootstrap
import { Button } from 'reactstrap';

// Modal To add column's
import Cavity from '../columns&rows/CavityAddColumn';

// The main grid in which data entry will be done
import CavityGrid from '../Grids/CavityGrid';

// To generate random Id
import { nanoid } from 'nanoid'

// Grid in which the calculated data will be shown
import CavityGrid2 from '../Grids/CavityGrid2';

// CSS file
import '../App.css';

// Import TextEditor Functionality from Syncfusion
import { HtmlEditor, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

// Importing Modal Component from Bootstrap
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { data } from '../data/cavity_balance_data';

// Modal to Edit Column Header
import CavityEdit from '../modals/CavityEdit'

// Event having multiple method's to deal with the back-end
import DataService from '../../services/ApiService'

// Hook to get the parameter's from the URL
import { useParams } from 'react-router-dom';

// A package which scroll's to different section of page on button click
import { scroller } from "react-scroll";

import { useReactToPrint } from 'react-to-print';

import CavityPrint from '../printables/CavityPrint';

import { toast } from 'react-toastify';

// An Instance of the syncfusion chart 
export let chartInstance;

const CavityBalance = ({ showAlert }) => {

    // State and Event for the Edit and Add Modal
    const [modal, setModal] = useState();
    const [modal2, setModal2] = useState();

    const toggle = () => {

        setModal(!modal);

    }

    const toggle2 = () => {

        setModal2(!modal2);

    }

    // State and Event for the comment modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let toolbarSettings = {
        items: ['Bold', 'Italic', 'Underline', 'FontSize', 'FontColor', 'BackgroundColor', 'Alignments', 'OrderedList', 'UnorderedList', 'Undo', 'Redo']
    };

    // A state variable to store and set the value of textarea
    const [Comment, setComment] = useState('');

    // Event to set the data entered in the textarea
    const getComment = (e) => {
        if (e.target) {
            setComment(e.target.value);
        } else {
            setComment(e.value); // Get the RTE value
            showAlert.current = true
        }
    };

    const row = useRef([])
    const [header, setHeader] = useState();
    const [column, setColumn] = useState(data);
    const [toggleEdit, setToggleEdit] = useState(true);
    const [CavityGridData, setCavityGridData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [chartData2, setChartData2] = useState([]);
    const [editFormData, setEditFormData] = useState();
    const [isRowId, setIsRowId] = useState(null);
    const [isColumnId, setIsColumnId] = useState(null);

    // States to store the calculated values

    let [Total, setTotal] = useState([]);
    let [Average, setAverage] = useState([]);
    let [Range, setRange] = useState([]);
    let [MaxPart, setMaxPart] = useState([]);
    let [MinPart, setMinPart] = useState([]);
    let [Percentage, setPercentage] = useState([]);

    const [Alert, setAlert] = useState(false);

    const addHeader = (e) => {

        e.preventDefault();

        setHeader(e.target.value);
    }

    const addColumn = () => {

        if (!header) {

        }
        else {

            const newColumn = { id: nanoid(), "header": header, "edit": true, "delete": true }

            setColumn([...column, newColumn]);

            setHeader("");

            showAlert.current = true

            setAlert(true)

        }

    };

    const editColumnHeader = () => {

        if (header && !toggleEdit) {

            setColumn(
                column.map((element) => {
                    if (element.id === isColumnId) {
                        return { ...element, header: header }
                    }
                    return element;
                })
            )

            setHeader("");

            setIsColumnId(null)

            showAlert.current = true

            setAlert(true)

        }
        else {

        }

    }

    const deleteColumn = (id, key) => {

        const updatedColumns = column.filter((index) => {
            return index.id !== id;
        })

        setColumn(updatedColumns)

        for (let j = 1; j < column.length; j++) {

            for (let i = 0; i < CavityGridData.length; i++) {
                delete CavityGridData[i][`value${key}`]
            }
        }

        showAlert.current = true

        setAlert(true)

    }

    const editColumn = (id) => {
        setIsColumnId(id)
        setToggleEdit(false)
    }

    const editCancel = () => {
        setIsColumnId(null)
        setToggleEdit(true)
    }

    const handleEditFormChange = (event) => {

        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData }
        newFormData[fieldName] = fieldValue

        setEditFormData(newFormData)
    }

    const handleEditFormSubmit = (event) => {

        event.preventDefault();

        const editedValue = { id: isRowId };

        const newObject = Object.assign(editedValue, editFormData);

        const newValues = [...CavityGridData];

        const index = CavityGridData.findIndex((value) => value.id === isRowId);

        newValues[index] = newObject;

        setCavityGridData(newValues);

        setIsRowId(null);

        showAlert.current = true

        setAlert(true)

    }

    const setId = (event, value) => {

        event.preventDefault();

        setIsRowId(value.id);

        const formValues = Object.assign({}, value)

        setEditFormData(formValues);

    }

    // To get Id's from url using useParams hook
    var { moldId, sessionId, moldName, sessionName } = useParams();

    // Variable to store the a Mold/Session Name
    const [Mold_Name, setMold_Name] = useState();
    const [Session_Name, setSession_Name] = useState();

    // Boolean variable to switch between the save and update button
    const [showSave, setShowSave] = useState(true)

    // Session Id getting from the URL
    const [SessionId, setSessionId] = useState()

    // To Store the Number of Parts in that Mold
    const [No_of_Parts, setNo_of_Parts] = useState()

    // Event to Call the POST request API and save the data
    const saveData = () => {

        const data = {
            "session": SessionId,
            "Column_Details": column,
            "Column_Data": CavityGridData,
            "Comment": Comment ? Comment : "N/A",
            "Number_Of_Parts": No_of_Parts ? No_of_Parts : ''
        }

        DataService.SaveCavity(data).then((res) => {

            setShowSave(false);

            showAlert.current = false

            setAlert(false)

            toast("Data has been saved", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })


        }).catch((err) => console.log(err))

    }

    // Event to Call the PUT request API and update the data
    const updateData = () => {

        const data = {
            "session": SessionId,
            "Column_Details": column,
            "Column_Data": CavityGridData,
            "Comment": Comment ? Comment : "N/A",
            "Number_Of_Parts": No_of_Parts ? No_of_Parts : ''
        }

        DataService.UpdateCavity(SessionId, data).then((res) => {

            setShowSave(false);

            showAlert.current = false

            setAlert(false)

            toast("Data has been Updated", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            

        }).catch((err) => {

            alert("Invalid Data")

        })

    }

    // Event to Scroll to Chart
    const scrollToChart = () => {

        CreateChartData()

        setChartData(column);

        scroller.scrollTo("cavity-chart", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });

    };

    // Event to Scroll to Grid
    const scrollToGrid = () => {

        scroller.scrollTo("cavity-main-grid", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });

    };

    // Event to Scroll to Calculate
    const scrollToCalculate = () => {

        scroller.scrollTo("cavity-calculation-grid", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });

    };

    // Array to store the mold data fetched
    const Data = ([]);

    // Variable to store the a mold Id
    const [mold_Id, setmold_Id] = useState();

    useEffect(() => {

        // Event to generate the row's of cavity
        const fetchMold = () => {

            let code;

            // Array to store the mold data fetched
            const Data = ([]);

            // Checking for Mold Id
            if (mold_Id) {

                // Making the GET API call for getting current selected Mold's Detail's
                DataService.GetMold(mold_Id).then((res) => {

                    // Checking whether are getting any Data in response
                    if (res.data) {

                        // Storing the response Data in an Local Array
                        Data.push(res.data)

                        setNo_of_Parts(Data[0].Number_Of_Parts)

                        // 1st for loop will execute as many times as number of the part's in that mold
                        for (let i = 1; i <= No_of_Parts; i++) {

                            if (isNaN(Data[0].Part_Data[3][`Part${i}`])) {

                                for (let j = 1; j <= Data[0].Part_Data[2][`Part${i}`]; j++) {

                                    code = Data[0].Part_Data[3][`Part${i}`].charCodeAt(0)

                                    // Here the part number along with Starting cavity number will get pushed inside the row array until the limit of number of cavities of that part exceeds 
                                    row.current.push({

                                        "id": nanoid(),
                                        "Cavity_No": Data[0].Part_Data[1][`Part${i}`] + '-' + (String.fromCharCode(code + (j - 1)))

                                    })

                                }

                                code = null;

                            }
                            else {
                                // 2nd for loop will execute as many times as number of cavities in that part
                                for (let j = 1; j <= Data[0].Part_Data[2][`Part${i}`]; j++) {

                                    // Here the part number along with Starting cavity number will get pushed inside the row array until the limit of number of cavities of that part exceeds 
                                    row.current.push({

                                        "id": nanoid(),
                                        "Cavity_No": Data[0].Part_Data[1][`Part${i}`] + '-' + (parseInt(Data[0].Part_Data[3][`Part${i}`]) + (j - 1))

                                    })

                                }
                            }

                        }

                    }
                    else {
                        setCavityGridData([])
                    }
                }).catch((err) => setCavityGridData([]))

            }
            else {

            }
        }

        fetchMold()

    }, [No_of_Parts, mold_Id, row, setCavityGridData, setNo_of_Parts])

    const [state, set] = useState(0);

    useEffect(() => {

        fn();

    }, [state])

    function fn() {

        setTimeout(() => {

            set(prev => prev + 1)

        }, 500)
    }

    // Event the GET current session's cavity data 
    const handleGet = (SessionId) => {

        if (SessionId) {

            DataService.FetchCavity(SessionId).then((res) => {
                if (res.data) {
                    setShowSave(false);
                    setColumn(res.data.Column_Details)
                    setCavityGridData(res.data.Column_Data)
                    setComment(res.data.Comment)
                    setNo_of_Parts(res.data.Number_Of_Parts)
                }
                else {
                    setColumn(data)
                    setCavityGridData(row.current)
                }
            }).catch((err) => console.log(err))

        }
        else {
            setColumn(data)
            setCavityGridData(row.current)
        }

    }

    useEffect(() => {

        // On load it decrypt's the session Id
        setSessionId(atob(sessionId))

        setMold_Name(atob(moldName))
        setSession_Name(atob(sessionName))

        // After that it call's this event to fetch the data
        handleGet(SessionId)

    }, [sessionId, moldName, sessionName, SessionId])

    if (Alert) {

        window.onbeforeunload = function () {
            return "";
        }

    } else {

    }

    useEffect(() => {

        setmold_Id(atob(moldId))

        const handleChange = (e) => {

            chartInstance.refresh();

        }

        handleChange()

    }, [CavityGridData, moldId])

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

    const CreateChartData = () => {

        // An Array to store the Array's as per number of mold's and a variable used while getting the data the from CavityGridData
        let TotalArray = [], index = 0;

        // Checking for Mold Id
        if (mold_Id) {

            // Making the GET API call for getting current selected Mold's Detail's
            DataService.GetMold(mold_Id).then((res) => {

                // Checking whether are getting any Data in response
                if (res.data) {

                    // Storing the response Data in an Local Array
                    Data.push(res.data)

                    // 1st for loop will execute as many times as number of the part's in that mold
                    for (let i = 1; i <= No_of_Parts; i++) {

                        // As per parts, pushing an array in TotalArray to store the data got from CavityGridData Array of the respective parts
                        TotalArray.push([])

                        // 2nd for loop will execute as many times as number of cavities in that part
                        for (let j = 1; j <= Data[0].Part_Data[2][`Part${i}`]; j++) {

                            // Data From CavityGridData is getting pushed in the TotalArray based on the index variable
                            TotalArray[i - 1].push(CavityGridData[index])

                            // A variable based on which the object inside the CavityGridData will get pushed
                            index++;

                        }

                    }

                    setChartData2(TotalArray)

                }
                else {
                    setChartData2([])
                }
            }
            ).catch((err) => setChartData2([]))
        }
        else {

        }
    }

    return (
        <>
            <div className='cavity pb-2'>
                <div className="cavity-main-grid grid-chart-container">
                    <section className="card p-4">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div className="grid_container_btn">
                                    <Cavity toggle2={toggle2} modal2={modal2} addHeader={addHeader} addColumn={addColumn} />
                                </div>
                                <div className="grid_container_btn">
                                    <CavityEdit modal={modal} toggle={toggle} column={column} addHeader={addHeader} editColumnHeader={editColumnHeader} editCancel={editCancel} editColumn={editColumn} />
                                </div>
                            </div>
                            <div className="mt-3">
                                {showSave ? <button className="btn btn-pill btn-secondary btn-air-secondary" type="button" onClick={saveData}> Save </button> : <button className="btn btn-pill btn-fifth btn-air-fifth" type="button" onClick={updateData}> Update & Save </button>}
                            </div>
                            <div className='mt-3'>
                                <button className="btn btn-pill btn-secondary btn-air-secondary mr-2" type="button" onClick={scrollToCalculate}> Result </button>

                                <button className="btn btn-pill btn-secondary btn-air-secondary" type="button" onClick={scrollToChart}> Show Graph </button>
                            </div>
                            <div className='mt-3'>
                                <button className="btn btn-pill btn-fifth btn-air-fifth mr-2" type="button" onClick={handlePrint}> Print </button>
                                <button className="btn btn-pill btn-primary btn-air-primary" type="button" onClick={handleShow}> Comment </button>
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
                        <div className="mt-4">
                            <div className="mt-3">
                                <CavityGrid modal={modal} toggle={toggle} modal2={modal2} toggle2={toggle2} column={column} deleteColumn={deleteColumn} editColumn={editColumn} isColumnId={isColumnId} editCancel={editCancel} addHeader={addHeader} setHeader={setHeader} toggleEdit={toggleEdit} editColumnHeader={editColumnHeader} addColumn={addColumn} CavityGridData={CavityGridData} handleEditFormChange={handleEditFormChange} handleEditFormSubmit={handleEditFormSubmit} setId={setId} isRowId={isRowId} editFormData={editFormData} setCavityGridData={setCavityGridData} row={row} setPercentage={setPercentage} setTotal={setTotal} setAverage={setAverage} setRange={setRange} setMaxPart={setMaxPart} setMinPart={setMinPart} Total={Total} Average={Average} MaxPart={MaxPart} MinPart={MinPart} Percentage={Percentage} Range={Range} setShowSave={setShowSave} setNo_of_Parts={setNo_of_Parts} No_of_Parts={No_of_Parts} Alert={Alert} />
                            </div>

                        </div>
                    </section>
                </div>

                <section className="cavity-calculation-grid">
                    <div className="card p-4">
                        <CavityGrid2 column={column} CavityGridData={CavityGridData} scrollToGrid={scrollToGrid} scrollToChart={scrollToChart} setPercentage={setPercentage} setTotal={setTotal} setAverage={setAverage} setRange={setRange} setMaxPart={setMaxPart} setMinPart={setMinPart} Total={Total} Average={Average} MaxPart={MaxPart} MinPart={MinPart} Percentage={Percentage} Range={Range} />
                    </div>
                </section>

                <section className="cavity-chart card p-4">

                    <div className="grid-chart-container">
                        <div className="d-flex justify-content-between">

                            <div>
                                <button className="btn btn-pill btn-secondary btn-air-secondary mr-2" type="button" onClick={scrollToCalculate}> Back To Calculations </button>
                            </div>

                            <div>
                                <button className="btn btn-pill btn-secondary btn-air-secondary mr-2" type="button" onClick={scrollToGrid}> Back to Data </button>
                            </div>

                        </div>
                        <div>
                            <ChartComponent id='charts' ref={chart => chartInstance = chart} title="Cavity Chart Analysis" primaryXAxis={{ valueType: "Category", title: "Cavity ID", labelIntersectAction:"Rotate90" }} primaryYAxis={{ title: "Part Weight" }}>
                                <Inject services={[LineSeries, Category, DataLabel]} />

                                <SeriesCollectionDirective>

                                    {chartData2.map((value1, key1) => (

                                        chartData.map((value, key2) => (

                                            <SeriesDirective type="Line" dataSource={chartData2[key1]} xName="Cavity_No" yName={`value${key2}`} marker={{ dataLabel: { visible: true }, visible: true }} fill="rgb(2,0,4)" width={2.5}></SeriesDirective>

                                        ))

                                    ))}
                                    
                                </SeriesCollectionDirective>

                            </ChartComponent>
                        </div>
                    </div>
                </section>
            </div>

            {/* ************************* Printable Part ********************* */}
            <section className={showPrint ? 'Printable_Part' : 'Showable_Part'} ref={componentRef}>

                <CavityPrint column={column} CavityGridData={CavityGridData} setPercentage={setPercentage} setTotal={setTotal} setAverage={setAverage} setRange={setRange} setMaxPart={setMaxPart} setMinPart={setMinPart} Total={Total} Average={Average} MaxPart={MaxPart} MinPart={MinPart} Percentage={Percentage} Range={Range} chartData={chartData} chartData2={chartData2} Mold_Name={Mold_Name} Session_Name={Session_Name} Comment={Comment} />

            </section>

        </>
    )
}

export default CavityBalance;