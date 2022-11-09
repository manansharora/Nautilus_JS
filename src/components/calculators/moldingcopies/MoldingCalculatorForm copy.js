import React from 'react'

const MoldingCalculatorForm = ({onSubmit, newName, handleNameChange, partVolume, handlePartVolumeChange, newNumber, handleNumberChange}) =>
  <form onSubmit={onSubmit}>
        <div>
          <h3>Molding Calculations</h3>
        </div> 
        <div>
            Part Volume: <input value={partVolume} onChange={handlePartVolumeChange} />
        </div>
        <div>
            Runner Volume: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            Specific Gravity: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            Projected Area: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            Runner Projected Area: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            Number of Runners: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            Number of Cavities: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            Average Cycle Time: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            Shot Capacity: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            Tons/Inch: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            Screw Diameter: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            <button type="submit">Calculate</button>
        </div>
    </form>

export default MoldingCalculatorFormcopy