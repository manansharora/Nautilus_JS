import React from 'react';
import { ChartComponent, LineSeries, SeriesCollectionDirective, SeriesDirective, Category, DataLabel, Inject } from '@syncfusion/ej2-react-charts';
import { HtmlEditor, RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor';

const CoolingPrint = ({ column, NewRow2, grid2, Mold_Name, Session_Name, Comment, maxValue, minValue, minValue2, maxValue2, chartData }) => {

    console.log = console.warn = console.error = console.assert = () => { };

    return (
        <div className='Print'>
            <div>
                <h1> Cooling Time Data </h1>
            </div>

            {/* Div for input's */}
            <div className='Input-Table'>
                <table>
                    <thead>
                        <tr>
                            <th> Mold Id </th>
                            <th> Session Name </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> {Mold_Name} </td>
                            <td> {Session_Name} </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Div for Grid */}
            <div>
                <h3> Data View </h3>
            </div>

            <div className='Printable-Grid'>
                <table>
                    <thead>
                        <tr>
                            {column.map((value, key) => (
                                <React.Fragment key={key}><th>
                                    <div className="table-heading-content">
                                        <div className="table-heading">
                                            <span> {value.header} </span>
                                        </div>
                                    </div>
                                </th>
                                </React.Fragment>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="grid_style">
                        {NewRow2.map((value, key1) => (
                            <tr key={value.id} >
                                {column.map((index, key2) => (
                                    <React.Fragment key={key2}>

                                        <td> <input type='text' name={index.header} style={{ backgroundColor: '#fff' }} defaultValue={NewRow2[key1][`value${key2}`] || ''} className="form-control" readOnly /> </td>

                                    </React.Fragment>

                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Div for Chart */}
            <div className='Printable-Chart'>

                <ChartComponent title="Cooling Time Study Chart" primaryXAxis={{ valueType: "Double", title: "Cooling Time", minimum: minValue ? minValue : 0, maximum: maxValue ? maxValue : 0 }} primaryYAxis={{ minimum: minValue2 ? minValue2 : 0, maximum: maxValue2 ? maxValue2 : 0 }}>

                    <Inject services={[LineSeries, Category, DataLabel]} />

                    <SeriesCollectionDirective>

                        {/* NewRow2 is the name of the Array which contains our data and again grid2 will be varying */}
                        <SeriesDirective type="Line" fill="rgb(2,0,4)" width={2.5} dataSource={chartData} xName="value0" yName={grid2 ? grid2 : "value1"} marker={{ dataLabel: { visible: true }, visible: true }}></SeriesDirective>

                    </SeriesCollectionDirective>

                </ChartComponent>

            </div>

            {/* Div for Comment */}
            <div className='Print pb-4'>

                <div>
                    <h3> Comments </h3>
                </div>

                <div style={{ border: "2px solid black" }}>
                    <RichTextEditorComponent
                        value={Comment}
                        height={200}
                        width={800}
                    >
                        <Inject services={[HtmlEditor]} />
                    </RichTextEditorComponent>
                </div>

            </div>

        </div>
    )
}

export default CoolingPrint