import React, { useState, useEffect, useRef } from 'react';
import { ChartComponent, LineSeries, SeriesCollectionDirective, SeriesDirective, Category, DataLabel } from '@syncfusion/ej2-react-charts';
import { Button } from 'reactstrap';
import CoolingAddColumn from '../columns&rows/CoolingAddColumn';
import CoolingAddRow from '../columns&rows/CoolingAddRow';
import { nanoid } from 'nanoid';
import { data, data2 } from '../data/Cooling_data'
import CoolingGrid from '../Grids/CoolingGrid';
import { HtmlEditor, Inject, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../App.css';
import CoolingEdit from '../modals/CoolingEdit'

// Event having multiple method's to deal with the back-end
import DataService from '../../services/ApiService'

// Hook to get the parameter's from the URL
import { useParams } from 'react-router-dom';

// A package which scroll's to different section of page on button click
import { scroller } from "react-scroll";

import { useReactToPrint } from 'react-to-print';
import CoolingPrint from '../printables/CoolingPrint';

import { toast } from 'react-toastify';

export let chartInstance;

const CoolingTimeStudy = ({ showAlert }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // A state variable to store and set the value of textarea
    const [Comment, setComment] = useState('');

    const [Alert, setAlert] = useState(false);

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

    const [modal, setModal] = useState();

    const toggle = () => {

        setModal(!modal);

    }

    const [modal2, setModal2] = useState();

    const toggle2 = () => {
        setModal2(!modal2);
    }

    const [modal3, setModal3] = useState();

    const toggle3 = () => {
        setModal3(!modal3);
    }

    // ************ Functions to deal with column ************

    const [header, setHeader] = useState();
    const [column, setColumn] = useState(data);
    const [isColumnId, setIsColumnId] = useState(null);
    const [toggleEdit, setToggleEdit] = useState(true);
    const [grid2, setGrid2] = useState("value1");
    const [CoolingGridHeader, setCoolingGridHeader] = useState("Dim 1");
    const [editFormData, setEditFormData] = useState()
    const [isRowId, setIsRowId] = useState(null)
    const [Key, setKey] = useState(1)

    // To store the minimum and maximum values
    const [minValue, setMinValue] = useState()
    const [maxValue, setMaxValue] = useState()
    const [minValue2, setMinValue2] = useState()
    const [maxValue2, setMaxValue2] = useState()

    const [chartData, setChartData] = useState([]);

    const addHeader = (e) => {
        e.preventDefault();
        setHeader(e.target.value)
    }

    const addColumn = () => {
        if (!header) {

        }
        else {
            const newColumn = { id: nanoid(), header: header }
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

    const handleEditFormChange = (event) => {

        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData }
        newFormData[fieldName] = fieldValue

        setEditFormData(newFormData)

        showAlert.current = true

        setAlert(true)
    }

    const handleEditFormSubmit = (event) => {

        event.preventDefault()

        const editedValue = { id: isRowId }

        const newObject = Object.assign(editedValue, editFormData);

        const newValues = [...NewRow2];

        const index = NewRow2.findIndex((value) => value.id === isRowId);

        newValues[index] = newObject;

        setNewRow2(newValues);

        setIsRowId(null);

    }

    const setId = (event, value) => {

        event.preventDefault();

        setIsRowId(value.id);

        const formValues = Object.assign({}, value)

        setEditFormData(formValues);

        showAlert.current = true

        setAlert(true)

    }

    const setGraph = () => {

        let DimArray = [], timeArray = [];

        // This is the event to sort the data based on Time
        const compareValue = (a, b) => {
            return a.value0 - b.value0;
        }

        // This is the event to sort the data based on Weight
        const compareValue2 = (a, b) => {
            return a[`value${Key}`] - b[`value${Key}`];
        }

        for (let i = 0; i < NewRow2.length; i++) {

            if (NewRow2[i].value0) {

                DimArray.push(NewRow2[i])
                timeArray.push(NewRow2[i])

            }
            else {

            }

        }

        NewRow2.sort(compareValue)
        timeArray.sort(compareValue)
        DimArray.sort(compareValue2)

        setChartData(NewRow2)

        setMinValue( parseFloat(timeArray[0].value0) - (parseFloat(timeArray[0].value0) / 10) )

        setMaxValue( parseFloat(timeArray[timeArray.length - 1].value0) + ( parseFloat(timeArray[timeArray.length - 1].value0) / 10) )

        setMinValue2( parseFloat(DimArray[0][`value${Key}`]) - (parseFloat(DimArray[0][`value${Key}`]) / 10) )

        setMaxValue2( parseFloat(DimArray[DimArray.length - 1][`value${Key}`]) + (parseFloat(DimArray[DimArray.length - 1][`value${Key}`]) / 10) )

        console.log(chartData)

    }

    const deleteColumn = (id, key) => {

        const updatedColumns = column.filter((index) => {
            return index.id !== id;
        })

        setColumn(updatedColumns)

        for (let j = 1; j < column.length; j++) {

            for (let i = 0; i < NewRow2.length; i++) {
                delete NewRow2[i][`value${key}`]
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

    // ************ Functions to deal with row ***************

    const row1 = [];
    const [row, setRow] = useState();
    const [NewRow2, setNewRow2] = useState(data2);

    const addRow = (e) => {
        e.preventDefault();
        setRow(e.target.value)
    }

    const increaseRow = () => {
        for (let i = 0; i < parseInt(row); i++) {
            row1.push({
                id: nanoid(),
                "edit": true,
                "delete": true
            })
        }
        setNewRow2([...NewRow2, ...row1]);

        showAlert.current = true

        setAlert(true)
    };

    const deleteRow2 = (id) => {

        const updatedRows = [...NewRow2].filter((value) => {
            return value.id !== id;
        });
        setNewRow2(updatedRows);

        showAlert.current = true

        setAlert(true)

    };

    // To get the Session Id from url using useParams hook
    var { sessionId, moldName, sessionName } = useParams();

    // Variable to store the a Mold/Session Name
    const [Mold_Name, setMold_Name] = useState();
    const [Session_Name, setSession_Name] = useState();

    // Boolean variable to switch between the save and update button
    const [showSave, setShowSave] = useState(true)

    // Session Id getting from the URL
    const [SessionId, setSessionId] = useState()

    // Event to Call the POST request API and save the data
    const saveData = () => {

        const data = {
            "session": SessionId,
            "Column_Details": column,
            "Column_Data": NewRow2,
            "Comment": Comment ? Comment : "N/A"
        }

        DataService.SaveCooling(data).then((res) => {

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
            "Column_Details": column,
            "Column_Data": NewRow2,
            "Comment": Comment ? Comment : "N/A"
        }

        DataService.UpdateCooling(SessionId, data).then((res) => {

            toast("Data has been Updated", {
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

    // Event the current session's viscosity data 
    const handleGet = (SessionId) => {

        if (SessionId) {

            DataService.FetchCooling(SessionId).then((res) => {
                if (res.data) {
                    setShowSave(false);
                    setColumn(res.data.Column_Details)
                    setNewRow2(res.data.Column_Data)
                    setComment(res.data.Comment)
                }
                else {
                    setColumn(data)
                    setNewRow2(data2)
                }
            }).catch((err) => console.log(err))

        }
        else {
            setColumn(data)
            setNewRow2(data2)
        }

    }

    // Event to Scroll to Chart
    const scrollToChart = () => {

        setGraph()

        scroller.scrollTo("Cooling-Chart", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });

    };

    // Event to Scroll to Grid
    const scrollToGrid = () => {

        scroller.scrollTo("Cooling-Grid", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });

    };

    useEffect(() => {

        // On load it decrypt's the session Id
        setSessionId(atob(sessionId))

        setMold_Name(atob(moldName))
        setSession_Name(atob(sessionName))

        // After that it call's this event to fetch the data
        handleGet(SessionId)

    }, [sessionId, SessionId, moldName, sessionName])

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

    const setGrid = (e) => {

        var val = document.getElementById("Cooling-Column");

        var CoolingHeader = val.options[val.selectedIndex].text;

        setGrid2(`value${e.target.value}`)

        setKey(e.target.value)

        setCoolingGridHeader(CoolingHeader)

        setChartData([])

    }

    return (
        <>
            <div className='cooling pb-2'>
                <div className='Cooling-Grid card p-4'>
                    <div className="grid-chart-container mt-3">
                        <div className="d-flex justify-content-between mb-4">
                            <div className="d-flex">
                                <div>
                                    <CoolingAddColumn modal={modal} toggle={toggle} addColumn={addColumn} addHeader={addHeader} />
                                </div>

                                <div>
                                    <CoolingAddRow modal2={modal2} toggle2={toggle2} addRow={addRow} increaseRow={increaseRow} />
                                </div>

                                <div>
                                    <CoolingEdit modal3={modal3} toggle3={toggle3} column={column} addHeader={addHeader} editColumnHeader={editColumnHeader} editCancel={editCancel} editColumn={editColumn} />
                                </div>
                            </div>
                            <div>
                                {showSave ? <button className="btn btn-pill btn-secondary btn-air-secondary" type="button" onClick={saveData}> Save </button> : <button className="btn btn-pill btn-fifth btn-air-fifth" type="button" onClick={updateData}> Update & Save </button>}
                            </div>
                            <div>
                                <button className="btn btn-pill btn-fifth btn-air-fifth mr-4" type="button" onClick={scrollToChart}> Show Graph </button>

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
                        <div>
                            <CoolingGrid modal={modal} toggle={toggle} modal2={modal2} toggle2={toggle2} column={column} deleteColumn={deleteColumn} editColumn={editColumn} isColumnId={isColumnId} editCancel={editCancel} addHeader={addHeader} setHeader={setHeader} toggleEdit={toggleEdit} editColumnHeader={editColumnHeader} addColumn={addColumn} NewRow2={NewRow2} deleteRow2={deleteRow2} handleEditFormChange={handleEditFormChange} handleEditFormSubmit={handleEditFormSubmit} setId={setId} isRowId={isRowId} editFormData={editFormData} setGrid2={setGrid2} setCoolingGridHeader={setCoolingGridHeader} Alert={Alert} />
                        </div>

                    </div>
                </div>
                <div className='Cooling-Chart card p-2'>
                    <div className="grid-chart-container">
                        <div className="d-flex justify-content-between w-100">
                            <div className="d-flex ml-4">
                                <div className="form-group" style={{ width: '200px' }}>
                                    <label className="lbl_design"> Y-Axis: </label>
                                    <select className="form-control digits" id="Cooling-Column" onChange={setGrid} onClick={(e) => setGrid2(`value${e.target.value}`)}>
                                        {column.map((value, key) => (
                                            <React.Fragment key={key}>
                                                {value.id === 0 ? '-' : <option value={key === 0 ? key + 1 : key} > {value.header} </option>}
                                            </React.Fragment>
                                        ))}
                                    </select>
                                </div>
                                <div className="ml-2 mt-4">
                                    <button className="btn btn-pill btn-secondary mr-2" type="button" onClick={scrollToChart}> Show </button>
                                </div>
                            </div>
                            <div className="col-md-4 mt-4">
                                <button className="btn btn-pill btn-primary btn-air-primary mr-4" type="button" onClick={scrollToGrid}> Back to Data </button>
                            </div>
                        </div>
                        <div className="col-md-12">

                            <ChartComponent title="Cooling Time Study Chart" primaryXAxis={{ valueType: "Double", title: "Cooling Time", minimum: minValue ? minValue : 0, maximum: maxValue ? maxValue : 0 }} primaryYAxis={{ minimum: minValue2 ? minValue2 : 0, maximum: maxValue2 ? maxValue2 : 0 }}>

                                <Inject services={[LineSeries, Category, DataLabel]} />

                                <SeriesCollectionDirective>

                                    {/* chartData is the name of the Array which contains our data and again grid2 will be varying */}
                                    <SeriesDirective type="Line" fill="rgb(2,0,4)" width={2.5} dataSource={chartData} xName="value0" yName={grid2 ? grid2 : "value1"} marker={{ dataLabel: { visible: true }, visible: true }}></SeriesDirective>

                                </SeriesCollectionDirective>

                            </ChartComponent>

                        </div>
                    </div>
                </div>
            </div>

            {/* ************************* Printable Part ********************* */}
            <section className={showPrint ? 'Printable_Part' : 'Showable_Part'} ref={componentRef}>

                <CoolingPrint column={column} NewRow2={NewRow2} grid2={grid2} Mold_Name={Mold_Name} Session_Name={Session_Name} CoolingGridHeader={CoolingGridHeader} Comment={Comment} maxValue={maxValue} minValue={minValue} minValue2={minValue2} maxValue2={maxValue2} chartData={chartData} />

            </section>

        </>

    )
}

export default CoolingTimeStudy;
