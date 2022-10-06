import React, { useEffect, useState } from 'react'
import Breadcrumb from '../common/breadcrumb';
import "../../assets/custom-stylesheet/app2_style.css";
import "../../assets/custom-stylesheet/samplepage_style.css";
import '../App.css';
import Session from './Session';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import '../App.css';
import '../../assets/custom-stylesheet/grid_stylecss.css';
import { useParams, useHistory } from 'react-router-dom';
import DataService from '../../services/ApiService';
import Header2 from '../common/header-component/header2';
import { createSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { ToastContainer } from 'react-toastify';

const SessionGrid = ({ user }) => {

  const history = useHistory();

  // To get the Mold Id from url using useParams hook
  var { MoldName, Mold_Id } = useParams();

  // Variable to store the a mold Name
  const [moldName, setMoldName] = useState();
  const [moldId, setMoldId] = useState();

  // Redirect's to sixStepstudy of that respective session
  const handleSession = (session) => {

    // Using the "btoa" method to encrypt the URL so that the exact ID should not be visible
    var Session_Id = btoa(session.id)
    var Mold_Id = btoa(session.mold)
    var Mold_Name = btoa(session.Mold_Name)
    var Session_Name = btoa(session.Session_Name)

    createSpinner({

      // Specify the target for the spinner to show
      target: document.getElementById('Container'),

    });

    showSpinner(document.getElementById('Container'));

    setTimeout(() => {

      history.push(`/sixstepstudy/${Mold_Id}/${Session_Id}/${Mold_Name}/${Session_Name}/sixstepstudy`)

    }, 100);

  }

  // To toggle Create Session modal
  const [modal2, setModal2] = useState();

  const toggle2 = () => {
    setModal2(!modal2)
  }

  // To set the visiblity of the Select Mold Drop Down List
  const [showDropDown, setShowDropDown] = useState();

  // To Store the Mold's if Drop Down is there
  const [MoldData, setMoldData] = useState([]);

  // To Store the current Mold Data
  const [CurrentMoldData, setCurrentMoldData] = useState([]);

  // These are the state's which store the Session's created by the user.
  const [SessionData, setSessionData] = useState([]);

  // An Local Object to store the Session Data which is stored in the Above Session Array.
  const [addSessionData, setAddSessionData] = useState({
    Session_Name: "",
    Date: ""
  });

  // This Event store's the Local Session Object in the main Session Data array.
  const handleAddFormSubmit2 = (event) => {
    event.preventDefault();

    const newSession = {
      "Mold_Name": moldName ? moldName : '',
      "mold": moldId,
      "Session_Name": addSessionData.Session_Name,
      "Date": addSessionData.Date
    };

    // This method is exported from services folder which has different method's of saving and fetching data.
    DataService.SaveSession(newSession).then((res) => {
      if (res.data.message) {
        // alert("Please select a mold before creating session.")
      }
      else {
        setSessionData([...SessionData, res.data])
        setAddSessionData([])
      }
    }).catch((err) => console.log(err))

  };

  // The event to store the Session Data into the local Object
  const handleAddFormChange2 = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addSessionData };
    newFormData[fieldName] = fieldValue;

    setAddSessionData(newFormData);
  };

  // Event to get the created mold's
  const handleGetMold = (id) => {

    DataService.FetchMold(id).then((res) => {
      if (res.data.message) {
        setMoldData([])
      }
      else {
        setMoldData(res.data)
      }
    }
    ).catch((err) => console.log(err))

  }

  // Event to get the created session's
  const handleGetSession = (moldId) => {

    if (moldId) {

      // Fetching the Data of Selected Mold, to show in the Mold Detail Grid
      DataService.GetMold(moldId).then((res) => {

        if (res.data) {
          setCurrentMoldData(res.data)
        }
        else {
        }

      }).catch((err) => console.log(err))

      // Fetching Sessions of the selected Mold by Mold Id
      DataService.FetchSession(moldId).then((res) => {

        if (res.data.message) {

          setSessionData([])

        }
        else {

          setSessionData(res.data)
          setMoldName(res.data[0].Mold_Name)

        }

      }).catch((err) => console.log(err))

    }
    else {

      setSessionData([])

    }

  }

  useEffect(() => {

    // Checking whether there is moldId in the URL or not, if there is a mold Id then using it directly session's will be fetched 
    if (Mold_Id) {

      // Using the "atob" method we are decrypting the values getting from the URL
      setMoldName(atob(MoldName))
      setMoldId(atob(Mold_Id))

      // To get the session's of that respective mold's
      handleGetSession(moldId)

      // To hide the drop down
      setShowDropDown(false)

    }

    // Else if there is no mold Id then mold's will be fetched and displayed in the drop down
    else {

      // First Checking for the user
      if (user) {

        // This event has a GET api in it
        handleGetMold(user.id)

        // Showing the Drop Down
        setShowDropDown(true)

      }
      else {

        setMoldData([])

      }

    }

  }, [MoldName, setMoldName, moldId, Mold_Id, user])

  const setMold = (e) => {

    var Id = e.target.value;

    setMoldId(Id)

  }

  return (
    <>
      <Header2 Title="Current Sessions" />
      <div>
        <Breadcrumb title="Sessions" parent="Dashboard" />
      </div>
      <div className="container-fluid">
        <div className="card mt-4">
          <div className="row d-flex justify-content-between">

            {/* Dynamically Showing the Drop Down to select mold's to get session's based on the data we get from the URL we toggle "showDropDown" */}

            {showDropDown && <div className='d-flex justify-content-between m-3'>
              <div className='col-md-4'>

                <label> Select Mold: </label>

                <select className="form-control" onChange={setMold} onClick={() => handleGetSession(moldId)}>

                  {MoldData.map((mold, key) => (

                    <option key={key} value={mold.id}> {mold.Mold_Id} </option>

                  ))}

                </select>
              </div>

              {/* Grid to show the details of the selected mold's */}
              <div className='col-md-10'>
                <Table>
                  <thead>
                    <tr>
                      <th> Mold Id </th>
                      <th> Platen Orientation </th>
                      <th> Number Of Bases </th>
                      <th> Number Of Parts </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> {CurrentMoldData.Mold_Id} </td>
                      <td> {CurrentMoldData.Platen_Orientation} </td>
                      <td> {CurrentMoldData.Number_Of_Bases} </td>
                      <td> {CurrentMoldData.Number_Of_Parts} </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>}
            <div className="col-md-2 m-3">

              <Session modal2={modal2} toggle2={toggle2} handleAddFormChange2={handleAddFormChange2} handleAddFormSubmit2={handleAddFormSubmit2} moldName={moldName} CurrentMoldData={CurrentMoldData} showDropDown={showDropDown} addSessionData={addSessionData} />

            </div>
          </div>

          {/* Grid to display the session's of the selected Mold */}
          <div id="Container" className="m-2">
            <form autoComplete="off">
              <div className="viscosity_table">
                <Table striped bordered hover responsive variant="light">
                  <thead>
                    <tr>
                      <th className="Pressure_Heading">
                        <span> Session Name </span>
                      </th>
                      <th className="Pressure_Heading">
                        <span> Date </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="grid_style">
                    {SessionData.map((session, sessionId) => (

                      <tr key={SessionData[sessionId].id} >

                        <td> <input type='text' className="form-control session-link" title="Go to Six Step Study" name="Session_Name" value={session.Session_Name} onClick={() => handleSession(session)} readOnly /> </td>

                        <td> <input type='text' className="form-control" name="Date" value={session.Date} readOnly /> </td>

                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(SessionGrid);