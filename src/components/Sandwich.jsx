import React from 'react'

const Sandwitch = ({dishDetails,handleDishDetails}) => (
    <>
      <div>
        <label htmlFor="slices_of_bread">Slices of bread</label>
      </div>
      <div className="formDiv">
        <input 
          type="number" 
          className="form-control"
          id="slices_of_bread"
          name="slices_of_bread"
          min="1"
          step="1"
          value={dishDetails.slices_of_bread || 0}
          onChange={handleDishDetails}
          required
        />
        <span className="validity"></span>
      </div>
    </>
)

export default Sandwitch

