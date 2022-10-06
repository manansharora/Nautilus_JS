import React, { useState, useEffect, useRef } from 'react'
import {
    ChartComponent, LineSeries, Inject, SeriesCollectionDirective, ScatterSeries, Category, DataLabel, SeriesDirective
} from '@syncfusion/ej2-react-charts';
import CosmeticGrid from '../Grids/CosmeticGrid';
import CosmeticEdit from '../modals/CosmeticEdit';
import data from '../data/Cosmetic_data.json';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { HtmlEditor, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

// Event having multiple method's to deal with the back-end
import DataService from '../../services/ApiService'

// Hook to get the parameter's from the URL
import { useParams } from 'react-router-dom';

// A package which scroll's to different section of page on button click
import { scroller } from "react-scroll";

import { useReactToPrint } from 'react-to-print';
import CosmeticPrint from '../printables/CosmeticPrint';

import { toast } from 'react-toastify';

export let chartInstance;

const CosmeticPressure = ({ showAlert }) => {

    const [modal, setModal] = useState();
    const [Melting, setMelting] = useState("Melt Temp");
    const [Hydraulic, setHydraulic] = useState("Hydraulic");
    const [CosmeticGridData, setCosmeticGridData] = useState(data);

    var centerPoints = [];
    const [chartData, setChartData] = useState([]);
    const [editFormData, setEditFormData] = useState({
        Melt_Temp: "",
        Low: "",
        High: ""
    });

    const [isRowId, setIsRowId] = useState(null)

    const [PressureUnits, setPressureUnits] = useState(null)
    const [TemperatureUnits, setTemperatureUnits] = useState(null)

    const [Alert, setAlert] = useState(false);

    const handleEditFormChange = (event) => {

        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData)

    }

    const handleEditFormSubmit = (event) => {

        event.preventDefault();

        const editedValue = {
            id: isRowId,
            Melt_Temp: editFormData.Melt_Temp,
            Low: editFormData.Low,
            High: editFormData.High
        }

        const newValues = [...CosmeticGridData];

        const index = CosmeticGridData.findIndex((value) => value.id === isRowId)

        newValues[index] = editedValue;

        setCosmeticGridData(newValues);

        setIsRowId(null);

    }

    const setId = (event, NewRow) => {

        event.preventDefault();

        setIsRowId(NewRow.id);

        const formValues = {
            Melt_Temp: NewRow.Melt_Temp,
            Low: NewRow.Low,
            High: NewRow.High,
        }

        setEditFormData(formValues);

        showAlert.current = true

        setAlert(true)
    }

    const toggle = () => {
        setModal(!modal)
    }

    const setHeader1 = (e) => {

        e.preventDefault();

        setMelting(e.target.value)
    }

    const setHeader2 = (e) => {
        e.preventDefault();
        setHydraulic(e.target.value)
    }

    // Create an object which will be used to plot the polygon
    const polygonData = [
        { x: parseFloat(CosmeticGridData[0]["Melt_Temp"]), y: parseFloat(CosmeticGridData[0]["Low"]) },
        { x: parseFloat(CosmeticGridData[1]["Melt_Temp"]), y: parseFloat(CosmeticGridData[1]["Low"]) },
        { x: parseFloat(CosmeticGridData[1]["Melt_Temp"]), y: parseFloat(CosmeticGridData[1]["High"]) },
        { x: parseFloat(CosmeticGridData[0]["Melt_Temp"]), y: parseFloat(CosmeticGridData[0]["High"]) },
        { x: parseFloat(CosmeticGridData[0]["Melt_Temp"]), y: parseFloat(CosmeticGridData[0]["Low"]) }
    ]

    var Coordinates = [
        { x: parseFloat(CosmeticGridData[0]["Melt_Temp"]), y: parseFloat(CosmeticGridData[0]["Low"]) },
        { x: parseFloat(CosmeticGridData[1]["Melt_Temp"]), y: parseFloat(CosmeticGridData[1]["Low"]) },
        { x: parseFloat(CosmeticGridData[1]["Melt_Temp"]), y: parseFloat(CosmeticGridData[1]["High"]) },
        { x: parseFloat(CosmeticGridData[0]["Melt_Temp"]), y: parseFloat(CosmeticGridData[0]["High"]) },
        { x: parseFloat(CosmeticGridData[0]["Melt_Temp"]), y: parseFloat(CosmeticGridData[0]["Low"]) }
    ]


    // The below three variables are used to set the minimum, maximum and interval of the chart axis.
    const [minCosmetic, setMinCosmetic] = useState()
    const [maxCosmetic, setMaxCosmetic] = useState()
    const [minCosmetic2, setMinCosmetic2] = useState()
    const [maxCosmetic2, setMaxCosmetic2] = useState()

    const setGraph = () => {

        let cosmeticArray = []

        // This is the event to sort the data based on Injection Speed
        const Compare = (a, b) => {
            return a.Melt_Temp - b.Melt_Temp;
        }

        // Storing the main array in a local so that we can perform sorting on the local array
        for (let i = 0; i < CosmeticGridData.length; i++) {
            cosmeticArray.push(CosmeticGridData[i])
        }

        // Sorting the Array
        cosmeticArray.sort(Compare)

        // Setting the minimum and maximum for X-Axis
        setMinCosmetic(parseInt(cosmeticArray[0].Melt_Temp - 20))
        setMaxCosmetic(parseInt(cosmeticArray[1].Melt_Temp) + 20)

        if (parseInt(cosmeticArray[0].Low) > parseInt(cosmeticArray[0].High)) {

            toast("Low value cannot be Higher than High value", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            setChartData([])

        }
        else if (parseInt(cosmeticArray[1].Low) > parseInt(cosmeticArray[1].High)) {

            toast("Low value cannot be Higher than High value", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            setChartData([])

        }
        else {
            setChartData(polygonData)
        }

        // Setting the minimum and maximum for Y-Axis
        // Checking which Lower value is less and that will be initilised as minimum
        if (parseInt(cosmeticArray[0].Low) > parseInt(cosmeticArray[1].Low)) {
            setMinCosmetic2(parseInt(cosmeticArray[1].Low) - 50)

        }
        else {
            setMinCosmetic2(parseInt(cosmeticArray[0].Low) - 50)
        }

        // Checking which Higher value is more and that will be initilised as maximum
        if (parseInt(cosmeticArray[0].High) < parseInt(cosmeticArray[1].High)) {
            setMaxCosmetic2(parseInt(cosmeticArray[1].High) + 50)
        }
        else {
            setMaxCosmetic2(parseInt(cosmeticArray[0].High) + 50)
        }

    }

    // Event to calculate the centroid
    function center(Coordinates) {

        function Point(x, y) {
            this.x = x;
            this.y = y;
        }

        function Region(points) {
            this.points = points || [];
            this.length = points.length;
        }

        Region.prototype.area = function () {
            var area = 0,
                i,
                j,
                point1,
                point2;

            for (i = 0, j = this.length - 1; i < this.length; j = i, i++) {
                point1 = this.points[i];
                point2 = this.points[j];
                area += point1.x * point2.y;
                area -= point1.y * point2.x;
            }
            area /= 2;

            return area;
        };

        Region.prototype.centroid = function () {
            var x = 0,
                y = 0,
                i,
                j,
                f,
                point1,
                point2;

            for (i = 0, j = this.length - 1; i < this.length; j = i, i++) {
                point1 = this.points[i];
                point2 = this.points[j];
                f = point1.x * point2.y - point2.x * point1.y;
                x += (point1.x + point2.x) * f;
                y += (point1.y + point2.y) * f;
            }

            f = this.area() * 6;

            return new Point(Number(x / f).toFixed(0), Number(y / f).toFixed(0));
        };

        var polygon = Coordinates,
            region = new Region(polygon);

        centerPoints.push(region.centroid())
    }

    center(Coordinates);

    // To get the Session Id from url using useParams hook
    var { sessionId, moldName, sessionName } = useParams();

    // Variable to store the a Mold/Session Name
    const [Mold_Name, setMold_Name] = useState();
    const [Session_Name, setSession_Name] = useState();

    // Boolean variable to switch between the save and update button
    const [showSave, setShowSave] = useState(true);

    // Session Id getting from the URL
    const [SessionId, setSessionId] = useState();

    // Event to Call the POST request API and save the data
    const saveData = () => {

        if (parseInt(CosmeticGridData[0].Low) > parseInt(CosmeticGridData[0].High)) {

            toast("Low value cannot be Higher than High value", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            setChartData([])

        }
        else if (parseInt(CosmeticGridData[1].Low) > parseInt(CosmeticGridData[1].High)) {

            toast("Low value cannot be Higher than High value", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            setChartData([])

        }
        else {

            const data = {
                "session": SessionId,
                "PressureUnits": PressureUnits ? PressureUnits : 0,
                "TemperatureUnits": TemperatureUnits ? TemperatureUnits : 0,
                "Grid_Data": CosmeticGridData,
                "Comment": Comment ? Comment : "N/A"
            }

            DataService.SaveCosmetic(data).then((res) => {

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


    }

    // Event to Call the PUT request API and update the data
    const updateData = () => {

        if (parseInt(CosmeticGridData[0].Low) > parseInt(CosmeticGridData[0].High)) {

            toast("Low value cannot be Higher than High value", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            setChartData([])

        }
        else if (parseInt(CosmeticGridData[1].Low) > parseInt(CosmeticGridData[1].High)) {

            toast("Low value cannot be Higher than High value", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            setChartData([])

        }
        else {

            const data = {
                "session": SessionId,
                "PressureUnits": PressureUnits ? PressureUnits : 0,
                "TemperatureUnits": TemperatureUnits ? TemperatureUnits : 0,
                "Grid_Data": CosmeticGridData,
                "Comment": Comment ? Comment : "N/A"
            }

            DataService.UpdateCosmetic(SessionId, data).then((res) => {

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

    }

    // Event the current session's viscosity data 
    const handleGet = (SessionId) => {

        if (SessionId) {

            DataService.FetchCosmetic(SessionId).then((res) => {
                if (res.data) {
                    setCosmeticGridData(res.data.Grid_Data)
                    setShowSave(false)
                    setComment(res.data.Comment)
                    setPressureUnits(res.data.PressureUnits)
                    setTemperatureUnits(res.data.TemperatureUnits)
                }
                else {
                    setCosmeticGridData(data)
                }
            }).catch((err) => console.log(err))

        }
        else {
            setCosmeticGridData(data)
        }

    }

    // Event to Scroll to Chart
    const scrollToChart = () => {

        if (!CosmeticGridData[0].Melt_Temp) {

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
        else if (!CosmeticGridData[1].Melt_Temp) {

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
        else {

            setGraph()

            scroller.scrollTo("Cosmetic-Chart", {
                duration: 800,
                delay: 0,
                smooth: "easeInOutQuart",
            });

        }

    };

    // Event to Scroll to Grid
    const scrollToGrid = () => {

        scroller.scrollTo("Cosmetic-Grid", {
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

    const textRender = (args) => {
        args.text =
            'Center of window(X : ' + args.point.x + ', Y : ' + args.point.y + ')';
    }

    return (
        <>
            <div>
                <section className='Cosmetic-Grid card p-2'>
                    <div className="mt-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div className="form-group">
                                    <CosmeticEdit toggle={toggle} modal={modal} setHeader1={setHeader1} setHeader2={setHeader2} Melting={Melting} Hydraulic={Hydraulic} />
                                </div>
                                {/* <div className="d-flex mt-1">
                                    <div className='mr-2'>
                                        <label htmlFor='Units'> Units: </label>
                                    </div>
                                    <div>
                                        <input className="viscosity-inputs" name="Units" type="text" />
                                    </div>
                                </div> */}
                            </div>
                            <div className="ml-4">
                                {showSave ? <button className="btn btn-pill btn-secondary btn-air-secondary" type="button" onClick={saveData}> Save </button> : <button className="btn btn-pill btn-fifth btn-air-fifth" type="button" onClick={updateData}> Update & Save </button>}
                            </div>
                            <div>
                                <button className="btn btn-pill btn-primary btn-air-primary mr-2" onClick={scrollToChart}> Show Graph </button>

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
                        <div className='d-flex justify-content-around'>
                            <div>
                                <CosmeticGrid Melting={Melting} Hydraulic={Hydraulic} CosmeticGridData={CosmeticGridData} setId={setId} handleEditFormChange={handleEditFormChange} handleEditFormSubmit={handleEditFormSubmit} isRowId={isRowId} editFormData={editFormData} Alert={Alert} />
                            </div>
                            <div>
                                <div className='d-flex p-2'>
                                    <div>
                                        <label htmlFor="Nozzle_Length" className="lbl_design pr-2">Pressure Units: </label>
                                    </div>
                                    <div>
                                        <input className="viscosity-inputs" id="Pressure_Units" type="text" defaultValue={PressureUnits} onChange={(e) => setPressureUnits(e.target.value)} />
                                    </div>
                                </div>
                                <div className='d-flex p-2'>
                                    <div>
                                        <label htmlFor="Nozzle_Length" className="lbl_design pr-2">Temperature Units: </label>
                                    </div>
                                    <div>
                                        <input className="viscosity-inputs" id="Temperature_Units" type="text" defaultValue={TemperatureUnits} onChange={(e) => setTemperatureUnits(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <section className='Cosmetic-Chart card p-2'>

                    <div className='ml-2'>
                        <button className="btn btn-pill btn-primary btn-air-primary" onClick={scrollToGrid}> Back to Data </button>
                    </div>

                    <div>
                        <ChartComponent title="Cosmetic Process Study" width="1100"

                            primaryXAxis={{ title: `${Melting}`, minimum: isNaN(minCosmetic) ? 0 : minCosmetic ? minCosmetic : 0, maximum: isNaN(maxCosmetic) ? 0 : maxCosmetic ? maxCosmetic : 0 }}

                            primaryYAxis={{ title: `${Hydraulic} Pressure`, minimum: isNaN(minCosmetic2) ? 0 : minCosmetic2 ? minCosmetic2 : 0, maximum: isNaN(maxCosmetic2) ? 0 : maxCosmetic2 ? maxCosmetic2 : 0 }}

                            tooltip={{ enable: true, shared: false }} textRender={textRender}>

                            <Inject services={[LineSeries, Category, DataLabel, ScatterSeries]} />

                            <SeriesCollectionDirective>

                                <SeriesDirective type="Line" dataSource={chartData} xName="x" yName="y" marker={{ visible: true }} fill="rgb(255,0,0)" width={2.5}></SeriesDirective>

                                <SeriesDirective
                                    dataSource={centerPoints}
                                    xName="x"
                                    yName="y"
                                    width={2}
                                    marker={{
                                        dataLabel: { visible: true },
                                        shape: 'Diamond',
                                        width: 10,
                                        height: 10,
                                    }}
                                    type="Scatter"
                                ></SeriesDirective>

                            </SeriesCollectionDirective>

                        </ChartComponent>
                    </div>
                </section>
            </div>

            {/* ******************** Printable Part ******************** */}
            <section className={showPrint ? 'Printable_Part' : 'Showable_Part'} ref={componentRef}>

                <CosmeticPrint Melting={Melting} Hydraulic={Hydraulic} CosmeticGridData={CosmeticGridData} chartData={chartData} centerPoints={centerPoints} minCosmetic={minCosmetic} maxCosmetic={maxCosmetic} Mold_Name={Mold_Name} Session_Name={Session_Name} minCosmetic2={minCosmetic2} maxCosmetic2={maxCosmetic2} textRender={textRender} Comment={Comment} PressureUnits={PressureUnits} TemperatureUnits={TemperatureUnits} />

            </section>

        </>
    )
}

export default CosmeticPressure;
