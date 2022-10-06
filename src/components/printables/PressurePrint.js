import React from 'react';
import { ChartComponent, LineSeries, SeriesCollectionDirective, Inject, SeriesDirective, Category, DataLabel } from '@syncfusion/ej2-react-charts';
import { HtmlEditor, RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor';

const PressurePrint = ({ Units, Nozzle_Length, Orifice_Diameter, Max_Press_Available, PressureGridRow, Mold_Name, Session_Name, minPressure, MaxPressData, Comment, ChartData }) => {

  console.log = console.warn = console.error = console.assert = () => { };

  return (
    <div className='Print'>
      <div>
        <h1> Pressure Drop Study Data </h1>
      </div>

      {/* Div for input's */}
      <div className='Input-Table'>
        <table>
          <thead>
            <tr>
              <th> Mold Id </th>
              <th> Session Name </th>
              <th> Units  </th>
              <th> Nozzle Length </th>
              <th> Orifice Diameter </th>
              <th> Max Pressure Available </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {Mold_Name} </td>
              <td> {Session_Name} </td>
              <td> {Units ? Units : "psi"} </td>
              <td> {Nozzle_Length ? Nozzle_Length : 1} </td>
              <td> {Orifice_Diameter ? Orifice_Diameter : 1} </td>
              <td> {Max_Press_Available} </td>
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
              <th className="Pressure_Heading">
                <span> Flow Area </span>
              </th>
              <th className="Pressure_Heading">
                <span> Peak Pressure </span>
              </th>
              <th className="Pressure_Heading">
                <span> % Maximum </span>
              </th>
              <th className="Pressure_Heading">
                <span> Delta P </span>
              </th>
              <th className="Pressure_Heading">
                <span> % Delta P </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {PressureGridRow.map((PressureRow, rowId) => (
              <tr key={PressureGridRow[rowId].id}>

                <td> <input type='text' className="form-control" value={PressureRow.Flow_Area} readOnly /> </td>

                <td> <input type='text' className="form-control" value={PressureRow.Peak_Pressure} readOnly /> </td>

                <td> <input type='text' className="form-control" value={PressureGridRow[rowId].Percent_Maximum === "" ? ('-') : (Number(PressureGridRow[rowId].Percent_Maximum).toFixed(3))} readOnly /> </td>

                <td> <input type='text' className="form-control" value={rowId === 0 ? (PressureGridRow[rowId].Peak_Pressure) : (PressureGridRow[rowId].Peak_Pressure === "" ? '-' : (Math.round(PressureGridRow[rowId].Peak_Pressure - PressureGridRow[rowId - 1].Peak_Pressure)))} readOnly /> </td>

                <td> <input type='text' className="form-control" name="Percent_Delta_P" value={rowId === 0 ? (PressureGridRow[rowId].Percent_Maximum === "" ? '-' : Number(PressureGridRow[rowId].Percent_Maximum).toFixed(3)) : (PressureGridRow[rowId].Peak_Pressure === "" ? '-' : (Number((PressureGridRow[rowId].Peak_Pressure - PressureGridRow[rowId - 1].Peak_Pressure) * 100 / (Max_Press_Available)).toFixed(3)))} readOnly /> </td>

              </tr>

            ))}
          </tbody>
        </table>
      </div>

      {/* Div for Chart */}
      <div className='Printable-Chart'>
        <ChartComponent title="Pressure Drop Study" primaryXAxis={{ valueType: "Category", title: "Flow Area" }} primaryYAxis={{ title: "Max Pressure", minimum: isNaN(minPressure) ? 0 : minPressure ? minPressure : 0 }}>

          <Inject services={[LineSeries, Category, DataLabel]} />

          <SeriesCollectionDirective>

            <SeriesDirective type="Line" dataSource={MaxPressData} xName="Flow_Area" yName="Max_Press_Available" fill="rgb(255,0,0)" width={2.5}></SeriesDirective>

            <SeriesDirective type="Line" dataSource={ChartData} xName="Flow_Area" yName="Peak_Pressure" marker={{ dataLabel: { visible: true }, visible: true }} width={2.5}></SeriesDirective>

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

export default PressurePrint;