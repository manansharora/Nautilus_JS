import React from 'react';
import { ChartComponent, LineSeries, SeriesCollectionDirective, SeriesDirective, Category, DataLabel, Inject } from '@syncfusion/ej2-react-charts';

import { HtmlEditor, RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor';

const CavityPrint = ({ column, CavityGridData, Total, Average, MaxPart, MinPart, Percentage, Range, chartData, chartData2, Mold_Name, Session_Name, Comment }) => {

  console.log = console.warn = console.error = console.assert = () => { };

  return (
    <div className='Print'>
      <div>
        <h1> Cavity Balance Data </h1>
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

      <div>
        <h3> Data View </h3>
      </div>

      <div className='row'>
        {/* Div for Grid */}
        <div className='Printable-Grid'>
          <table>
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

                <tr key={key1}>
                  {column.map((value2, key2) => (

                    <React.Fragment key={value2.id}>
                      {value2.edit === false ?
                        (<td> <input type='text' className="form-control" value={value.Cavity_No} readOnly /> </td>)
                        :
                        <>

                          <td>

                            <input type='text' name={`value${key2}`} style={{ backgroundColor: '#fff' }} className="form-control" defaultValue={CavityGridData[key1][`value${key2}`] ? CavityGridData[key1][`value${key2}`] : CavityGridData[key1][`value${key2 + 1}`]} />

                          </td>

                        </>
                      }
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Div For Grid 2 */}
        <div className='Printable-Grid cold-md-4'>
          <table>
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
          </table>
        </div>
      </div>

      {/* Div for Chart */}
      <div className='Printable-Chart'>
        <ChartComponent title="Cavity Chart Analysis" width='800' primaryXAxis={{ valueType: "Category", title: "Cavity ID", labelIntersectAction:"Rotate90" }} primaryYAxis={{ title: "Part Weight" }}>
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
  )
}

export default CavityPrint;