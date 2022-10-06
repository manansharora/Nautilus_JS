import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import '../App.css';
import '../../assets/custom-stylesheet/grid_stylecss.css';

// Event having multiple method's to deal with the back-end
// import DataService from '../../services/ApiService'

// Hook to get the parameter's from the URL
import { useParams, Prompt } from 'react-router-dom';

// import { nanoid } from 'nanoid'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CavityGrid = ({ column, deleteColumn, CavityGridData, handleEditFormChange,
    handleEditFormSubmit, setId, isRowId, setPercentage, setTotal, setAverage, setRange, setMaxPart, setMinPart, Alert }) => {

    // To get the Session Id from url using useParams hook
    var { moldId, sessionId } = useParams();

    // Variable to store the a mold Id and Session Id
    const [mold_Id, setmold_Id] = useState();
    const [session_Id, setsessionId] = useState();

    // useEffect Hook to do the calculation of the data entered in the Grid
    useEffect(() => {

        setmold_Id(atob(moldId))
        setsessionId(atob(sessionId))

        const Total_Average = () => {

            let columnTotal = [], columnAverage = [], columnRange = [], columnMaxPart = [], columnMinPart = [], columnPercent = [];

            for (let i = 1; i < column.length; i++) {

                let total = 0, average = 0, range, Range_Array = [], Range_Array_for_Percent = [], max, min, percent = [];

                const compare = (a, b) => {
                    return a - b;
                }

                for (let j = 1; j <= CavityGridData.length; j++) {

                    Range_Array_for_Percent.push(isNaN(parseFloat(CavityGridData[j - 1][`value${i}`])) ? 0 : parseFloat(CavityGridData[j - 1][`value${i}`]))

                    Range_Array.push(isNaN(parseFloat(CavityGridData[j - 1][`value${i}`])) ? 0 : parseFloat(CavityGridData[j - 1][`value${i}`]))

                    total += Range_Array[j - 1]

                    average = Number(parseFloat(total) / parseInt(CavityGridData.length)).toFixed(3)

                    const Sorted_Array = Range_Array.sort(compare)

                    range = Number(Sorted_Array[Sorted_Array.length - 1] - Sorted_Array[Sorted_Array.length - Sorted_Array.length]).toFixed(2)

                    max = Sorted_Array[Sorted_Array.length - 1]

                    min = (Sorted_Array[Sorted_Array.length - Sorted_Array.length] === 0 ? Sorted_Array[(Sorted_Array.length - Sorted_Array.length) + 1] : Sorted_Array[Sorted_Array.length - Sorted_Array.length])

                }

                for (let k = 1; k <= CavityGridData.length; k++) {
                    percent.push(isNaN((Range_Array_for_Percent[k - 1] - average) * 100 / average) ? 0 : Number(((Range_Array_for_Percent[k - 1] - average) * 100 / average).toFixed(3)))
                }

                columnPercent[i - 1] = percent
                setPercentage(columnPercent)

                columnTotal[i - 1] = total
                setTotal(columnTotal)

                columnAverage[i - 1] = average
                setAverage(columnAverage)

                columnRange[i - 1] = range
                setRange(columnRange)

                columnMaxPart[i - 1] = max
                setMaxPart(columnMaxPart)

                columnMinPart[i - 1] = min
                setMinPart(columnMinPart)
            }
        }

        Total_Average()

    }, [moldId, session_Id, mold_Id, sessionId, CavityGridData, column, column.length, setAverage, setMaxPart, setMinPart, setPercentage, setRange, setTotal])

    // Toggle's the Delete Modal
    const [ShowDelete, setShowDelete] = useState(false);

    // Variable to set the ID of that column
    const [DeleteId, setDeleteId] = useState();

    // Variable to set the value of the column
    const [DeleteValue, setDeleteValue] = useState();

    // Varibale to set the name of the column
    const [DeleteColumnName, setDeleteColumnName] = useState();

    const handleShowDelete = () => {

        setShowDelete(!ShowDelete);

    };

    const onDelete = (value, key) => {

        setDeleteId(value.id);
        setDeleteValue(key);
        setDeleteColumnName(value.header)
        handleShowDelete();

    };

    const removeColumn = () => {

        deleteColumn(DeleteId, DeleteValue);
        handleShowDelete();
        setDeleteId(null);

    };

    return (
        <>

            <Prompt
                when={Alert}
                message={location =>
                    `Changes you made may not be saved.`
                }
            />

            <Modal
                isOpen={ShowDelete}
                toggle={handleShowDelete}
                centered={true}
            >
                <ModalHeader toggle={handleShowDelete}> Delete Column </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete {DeleteColumnName} column ?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={removeColumn}>
                        {" "}
                        Yes{" "}
                    </Button>
                    <Button color="secondary" onClick={handleShowDelete}>
                        {" "}
                        No{" "}
                    </Button>
                </ModalFooter>
            </Modal>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row' style={{ overflowX: "scroll" }}>
                            <div>
                                <div className="Cavity-Grid-Container">
                                    <form autoComplete="off">
                                        <div className="cold_table">
                                            <div >
                                                <Table striped bordered hover responsive variant="light">
                                                    <thead>
                                                        <tr>

                                                            {/* In the grid 2 column are going to be static and the rest will be deletable so here based on the property in the column array if the object contains delete property then it will be deletable and if not then static */}

                                                            {column.map((value, key) => (
                                                                <React.Fragment key={value.id}>
                                                                    {value.delete === false ?
                                                                        (<th>
                                                                            <div className="table-heading-content">
                                                                                <div className="table-heading" >
                                                                                    <span> {value.header} </span>
                                                                                </div>
                                                                            </div>
                                                                        </th>)
                                                                        :
                                                                        (<th>
                                                                            <div className="table-heading-content">
                                                                                <div className="table-heading">
                                                                                    <span> {value.header} </span>
                                                                                </div>
                                                                                <div className="table-heading-icons">
                                                                                    <div> <i className="fas fa-trash" onClick={() => onDelete(value, key)} ></i> </div>
                                                                                </div>
                                                                            </div>
                                                                        </th>)}
                                                                </React.Fragment>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="grid_style">
                                                        {/* Here the row's are generated with the help of CavityGridData array and the <td>'s  should be equal to the number of columns e.g 3 td's for 3 columns */}

                                                        {/* After that 1st column will be containing static row's, names will be based on the mold, so that's what we are checking over here */}

                                                        {/* If the edit property of the column array's object is false then it will be the static row i.e 1st row but if not then editable row which switches as clicked on it to editable and then readOnly */}

                                                        {CavityGridData.map((value, key1) => (

                                                            <tr key={key1} onClick={(event) => setId(event, value)} >
                                                                {column.map((value2, key2) => (

                                                                    <React.Fragment key={value2.id}>
                                                                        {value2.edit === false ?
                                                                            (<td> <input type='text' className="form-control" value={value.Cavity_No} readOnly /> </td>)
                                                                            :
                                                                            <>
                                                                                {isRowId === value.id ?
                                                                                    (
                                                                                        <td>

                                                                                            <input type='text' className="form-control" style={{ backgroundColor: '#fff' }} name={`value${key2}`} onChange={handleEditFormChange} defaultValue={CavityGridData[key1][`value${key2}`] ? CavityGridData[key1][`value${key2}`] : CavityGridData[key1][`value${key2 + 1}`]} onKeyPress={(event) => {
                                                                                                if (!/[0.0-9.0]/.test(event.key)) {
                                                                                                    event.preventDefault();
                                                                                                }
                                                                                            }} onBlur={handleEditFormSubmit} onFocus={(event) => setId(event, value)} />

                                                                                        </td>
                                                                                    )
                                                                                    :
                                                                                    (
                                                                                        <td onClick={(event) => setId(event, value)}>

                                                                                            <input type='text' name={`value${key2}`} style={{ backgroundColor: '#fff' }} className="form-control" defaultValue={CavityGridData[key1][`value${key2}`] ? CavityGridData[key1][`value${key2}`] : CavityGridData[key1][`value${key2 + 1}`]} onBlur={handleEditFormSubmit} onFocus={(event) => setId(event, value)} />

                                                                                        </td>
                                                                                    )
                                                                                }
                                                                            </>
                                                                        }

                                                                    </React.Fragment>

                                                                ))}
                                                            </tr>

                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default CavityGrid;