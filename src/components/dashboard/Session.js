import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Table from 'react-bootstrap/Table';

const Session = ({ toggle2, modal2, handleAddFormChange2, handleAddFormSubmit2, CurrentMoldData, showDropDown, addSessionData }) => {

  let defaultDate, date;

  let NewDate = new Date()
  let TodaysDate = NewDate.toISOString().split('T')[0]

  const [error, setError] = useState(false)

  const toggle = () => {

    toggle2()
    setError(false)

  }

  const handleSubmit = (e) => {

    if (!addSessionData.Session_Name) {
      setError(true)

    }
    else if (!addSessionData.Date) {

      date = new Date();
      defaultDate = date.toDateString();
      addSessionData.Date = defaultDate
      toggle2();
      handleAddFormSubmit2(e);

    }
    else {

      toggle2();
      handleAddFormSubmit2(e);

    }

  }

  const setDate = (e) => {

    if (e.target.value) {

      date = new Date(e.target.value);
      defaultDate = date.toDateString();
      addSessionData.Date = defaultDate;

    }

  }

  const onClose = () => {
    addSessionData.Session_Name = ""
    toggle2();
    setError(false)
  }

  return (
    <>
      <div className='flex-row'>

        <div>

          <button className="btn btn-pill btn-primary btn-air-primary mt-2" type="button" onClick={toggle}>Create session</button>

        </div>

        <div>

          {!showDropDown && <Table>
            <thead>
              <tr>
                <th>Mold Id</th>
                <th>Platen Orientation</th>
                <th>Number Of Bases</th>
                <th>Number Of Parts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: 'center' }}> {CurrentMoldData.Mold_Id} </td>
                <td style={{ textAlign: 'center' }}> {CurrentMoldData.Platen_Orientation} </td>
                <td style={{ textAlign: 'center' }}> {CurrentMoldData.Number_Of_Bases} </td>
                <td style={{ textAlign: 'center' }}> {CurrentMoldData.Number_Of_Parts} </td>
              </tr>
            </tbody>
          </Table>}

        </div>

      </div>
      <form>
        <Modal isOpen={modal2} centered={true} toggle={toggle2}>
          <ModalHeader toggle={toggle2}> Add Session </ModalHeader>
          <ModalBody>
            <div> {error ? <span style={{ color: "red" }}> *Please enter session name </span> : ""} </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label className="lbl_style">Session Name :</label>
                </div>
              </div>
              <div className="col-md-8">
                <input className="form-control" name="Session_Name" type="text" onChange={handleAddFormChange2} required />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label className="lbl_style">Date :</label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="input-group">
                  <input className="form-control" id="dateRequired"
                    type="date"
                    name="Date" defaultValue={TodaysDate} onChange={setDate} required />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={handleSubmit}> Create </Button>
            <Button color="fourth" onClick={onClose}> Cancel </Button>
          </ModalFooter>
        </Modal>
      </form>
    </>
  )
}

export default Session
