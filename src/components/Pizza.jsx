import React from 'react'

const Pizza = ({dishDetails,handleDishDetails}) => (
    <>
      <div>
        <label htmlFor="slices">Slices</label>
      </div>
      <div className="formDiv">
        <input 
          type="number" 
          className="form-control"
          id="slices"
          name="slices"
          min="1"
          value={dishDetails.no_of_slices || 0}
          onChange={handleDishDetails}
          required
        />
        <span className="validity"></span>
      </div>
      <div>
        <label htmlFor="diameter">Diameter</label>
      </div>
      <div className="formDiv">
        <input 
          type="number"
          className="form-control"
          id="diameter"
          name="diameter"
          value={dishDetails.diameter || 0.0}
          step="0.1"
          min="0.1"
          onChange={handleDishDetails}
          required
        />
        <span className="validity"></span>
     </div>
    </>
)

export default Pizza