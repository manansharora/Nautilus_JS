import React from 'react';

// Chart from syncfusion
import { ChartComponent, LineSeries, Inject, SeriesCollectionDirective, SeriesDirective, Category, DataLabel } from '@syncfusion/ej2-react-charts';

import { HtmlEditor, RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor';

const ViscosityPrint = ({ Injection_Speed_Units, IntensificationRatio, Pressure_Units, ViscosityGridData, Injection_Speed, Mold_Name, Session_Name, Comment, maxViscosity, minViscosity, maxShear, minShear, minInjection, maxInjection }) => {

    console.log = console.warn = console.error = console.assert = () => { };

    return (
        <div className='Print'>
            <div>
                <h1> Viscosity Curve Data </h1>
            </div>

            {/* Div for input's */}
            <div className='Input-Table'>
                <table>
                    <thead>
                        <tr>
                            <th> Mold Id </th>
                            <th> Session Name </th>
                            <th> Injection Speed Units </th>
                            <th> Intensification Ratio </th>
                            <th> Pressure Units </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> {Mold_Name} </td>
                            <td> {Session_Name} </td>
                            <td> {Injection_Speed_Units ? Injection_Speed_Units : "in/sec"} </td>
                            <td> {IntensificationRatio} </td>
                            <td> {Pressure_Units ? Pressure_Units : 'N/A'} </td>
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
                            <th>
                                Injection Speed
                            </th>
                            <th>
                                Fill Time
                            </th>
                            <th>
                                Peak Inj Press
                            </th>
                            <th>
                                Viscosity
                            </th>
                            <th>
                                Shear Rate
                            </th>
                            <th>
                                AbsoluteDropViscosity
                            </th>
                            <th>
                                %DropViscosity
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ViscosityGridData.map((NewRow, rowId) => (
                            <tr key={ViscosityGridData[rowId].id}>

                                <td> <input type='text' className="form-control" style={{ backgroundColor: '#fff' }} value={NewRow.Injection_Speed || ""} readOnly /> </td>

                                <td> <input type='text' className="form-control" style={{ backgroundColor: '#fff' }} value={NewRow.Fill_Time || ""} readOnly /> </td>

                                <td> <input type='text' className="form-control" style={{ backgroundColor: '#fff' }} value={NewRow.Peak_Inj_Press || ""} readOnly /> </td>

                                <td> <input type='text' className="form-control" name="Viscosity" value={ViscosityGridData[rowId].Viscosity === "" ? ('-') : (Math.round(ViscosityGridData[rowId].Fill_Time * ViscosityGridData[rowId].Peak_Inj_Press * IntensificationRatio))} readOnly /> </td>

                                <td> <input type='text' className="form-control" name="Shear_Rate" value={ViscosityGridData[rowId].Shear_Rate === "" ? '-' : Number(NewRow.Shear_Rate).toFixed(3)} readOnly /> </td>

                                <td> <input type='text' className="form-control" name="Absolute_Viscosity"

                                    value={rowId === 0 ? ('-') : (ViscosityGridData[rowId].Viscosity === "" || ViscosityGridData[rowId - 1].Viscosity === "" || ViscosityGridData[rowId - 1].Viscosity === 0 ? '-' : ViscosityGridData[rowId].Fill_Time === "" ? '-' : (Math.round(ViscosityGridData[rowId - 1].Viscosity - ViscosityGridData[rowId].Viscosity)))}

                                    readOnly /> </td>

                                <td> <input type='text' className="form-control" name="Drop_Viscosity"

                                    value={rowId === 0 ? ('-') : (ViscosityGridData[rowId].Viscosity === "" || ViscosityGridData[rowId - 1].Viscosity === "" || ViscosityGridData[rowId - 1].Viscosity === 0 ? '-' : ViscosityGridData[rowId].Fill_Time === "" ? '-' : Number((Math.round(ViscosityGridData[rowId - 1].Viscosity - ViscosityGridData[rowId].Viscosity) * 100) / (ViscosityGridData[rowId - 1].Viscosity)).toFixed(1))}

                                    readOnly /> </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

            {/* Div for Chart */}
            <div className='Printable-Chart'>
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

            {/* Div for Comment */}
            <div className='Print'>

                <div>
                    <h3> Comments </h3>
                </div>

                <div style={{ border: "2px solid black" }}>
                    <RichTextEditorComponent
                        value={Comment}
                        height={160}
                        width={800}
                    >
                        <Inject services={[HtmlEditor]} />
                    </RichTextEditorComponent>
                </div>

            </div>

        </div>
    )
}

export default ViscosityPrint