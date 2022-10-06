import React from 'react';
import '../App.css';
import Table from 'react-bootstrap/Table';

const CavityGrid2 = ({ column, CavityGridData, scrollToGrid, scrollToChart, Total, Average, MaxPart, MinPart, Percentage, Range }) => {

    return (
        <>
            <div className='d-flex justify-content-between mt-4 mb-2'>
            
                <div>
                    <button className="btn btn-pill btn-primary btn-air-primary mr-4" type="button" onClick={scrollToChart}> Go to Graph </button>
                </div>

                <div>
                    <button className="btn btn-pill btn-primary btn-air-primary mr-4" type="button" onClick={scrollToGrid}> Back to Data </button>
                </div>
            </div>
            <div className='container-fluid cold_table2'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div>
                                <div className="Cavity-Grid-Container">
                                    <div>
                                        <Table striped bordered hover responsive variant="light">
                                            <thead>
                                                <tr>
                                                    {column.map((value, key) => (
                                                        <React.Fragment key={value.id}>
                                                            <th key={key}> <span> {value.header} </span> </th>
                                                        </React.Fragment>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="grid_style">
                                                <tr>
                                                    {column.map((value1, key1) => (
                                                        <React.Fragment key={value1.id}>
                                                            {value1.edit === true ?
                                                                (<td> <input type='text' className="form-control" value={Total[key1 - 1] || ''} readOnly /> </td>)
                                                                :
                                                                (<td> <input type='text' className="form-control" value="Total Fill" readOnly /> </td>)}
                                                        </React.Fragment>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    {column.map((value1, key1) => (
                                                        <React.Fragment key={value1.id}>
                                                            {value1.edit === true ?
                                                                (<td> <input type='text' className="form-control" value={Average[key1 - 1] || ''} readOnly /> </td>)
                                                                :
                                                                (<td> <input type='text' className="form-control" value="Average Fill" readOnly /> </td>)}
                                                        </React.Fragment>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    {column.map((value1, key1) => (
                                                        <React.Fragment key={value1.id}>
                                                            {value1.edit === true ?
                                                                (<td> <input type='text' className="form-control" value={Range[key1 - 1] || ''} readOnly /> </td>)
                                                                :
                                                                (<td> <input type='text' className="form-control" value="Range" readOnly /> </td>)}
                                                        </React.Fragment>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    {column.map((value1, key1) => (
                                                        <React.Fragment key={value1.id}>
                                                            {value1.edit === true ?
                                                                (<td> <input type='text' className="form-control" value={MaxPart[key1 - 1] || ''} readOnly /> </td>)
                                                                :
                                                                (<td> <input type='text' className="form-control" value="Max Part Wt." readOnly /> </td>)}
                                                        </React.Fragment>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    {column.map((value1, key1) => (
                                                        <React.Fragment key={value1.id}>
                                                            {value1.edit === true ?
                                                                (<td> <input type='text' className="form-control" value={MinPart[key1 - 1] || ''} readOnly /> </td>)
                                                                :
                                                                (<td> <input type='text' className="form-control" value="Min Part Wt." readOnly /> </td>)}
                                                        </React.Fragment>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    {column.map((value, key1) => (
                                                        <React.Fragment key={value.id}>
                                                            {value.edit === true ?
                                                                (<td> <input type='text' className="form-control" value='-' readOnly /> </td>)
                                                                :
                                                                (<td> <input type='text' className="form-control" value="% Variation From Average" readOnly /> </td>)}
                                                        </React.Fragment>
                                                    ))}
                                                </tr>
                                                {CavityGridData.map((value, key1) => (
                                                    <tr key={key1}>
                                                        {column.map((value2, key) => (
                                                            <React.Fragment key={value2.id}>
                                                                {value2.edit === false ?
                                                                    (<td> <input type='text' className="form-control" value={value.Cavity_No || ''} readOnly /> </td>)
                                                                    :
                                                                    (<td> <input type='text' className="form-control" value={Percentage[key - 1] === undefined ? ('-') : (Percentage[key - 1][key1]) || ''} readOnly /> </td>)
                                                                }
                                                            </React.Fragment>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default CavityGrid2;