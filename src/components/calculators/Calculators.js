import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Table from 'react-bootstrap/Table';
import '../App.css';
import MoldingCalculatorForm from './MoldingCalculatorForm';


const Calculators = () => {
    const [ newName, setNewName ] = useState('')
    const [ partVolume, setNewPartVolume ] = useState('')
    const [ runnerVolume, setNewRunnerVolume ] = useState('')
    const [ specificGravity, setNewSpecificGravity ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const addPerson = (event) => {
        console.log('Added person')
    }
    
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePartVolumeChange = (event) => {
        setNewPartVolume(event.target.value)
    }
    
      const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    return (
        <>
            <button className="btn btn-pill btn-primary btn-air-primary m-4" type="button">Molding Calculator</button>
            <MoldingCalculatorForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} partVolume={partVolume} handlePartVolumeChange={handlePartVolumeChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
        </>
    )
}

export default Calculators
    