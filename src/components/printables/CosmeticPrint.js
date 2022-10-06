import React from 'react';

import {
    ChartComponent, LineSeries, Inject, SeriesCollectionDirective, ScatterSeries, Category, DataLabel, SeriesDirective
} from '@syncfusion/ej2-react-charts';
import { HtmlEditor, RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor';

const CosmeticPrint = ({ Melting, Hydraulic, CosmeticGridData, centerPoints, chartData, maxCosmetic, minCosmetic, Mold_Name, Session_Name, minCosmetic2, maxCosmetic2, textRender, Comment, PressureUnits, TemperatureUnits }) => {

    console.log = console.warn = console.error = console.assert = () => { };

    return (
        <div className='Print'>
            <div>
                <h1> Cosmetic Process Data </h1>
            </div>

            {/* Div for input's */}
            <div className='Input-Table'>
                <table>
                    <thead>
                        <tr>
                            <th> Mold Id </th>
                            <th> Session Name </th>
                            <th> Pressure Units </th>
                            <th> Temperature Units </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> {Mold_Name} </td>
                            <td> {Session_Name} </td>
                            <td> {PressureUnits} </td>
                            <td> {TemperatureUnits} </td>
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
                            <th> <span> {Melting} </span> </th>

                            <th> <span> Low {Hydraulic} </span> </th>

                            <th> <span> High {Hydraulic} </span> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {CosmeticGridData.map((NewRow, rowId) => (
                            <tr key={CosmeticGridData[rowId].id}>

                                <td> <input type='text' className="form-control" value={NewRow.Melt_Temp} readOnly /> </td>
                                <td> <input type='text' className="form-control" value={NewRow.Low} readOnly /> </td>
                                <td> <input type='text' className="form-control" value={NewRow.High} readOnly /> </td>

                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

            {/* Div for Chart */}
            <div className='Printable-Chart'>
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

export default CosmeticPrint;