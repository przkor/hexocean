import React from 'react'

const Soup = ({dishDetails,handleDishDetails}) => (
    <>
    <div>
      <label htmlFor="spiciness_scale">Spiciness scale (1-10)</label>
    </div>
    <div className="formDiv">
      <input 
        type="number" 
        className="form-control"
        id="spiciness_scale"
        name="spiciness_scale"
        min="1"
        max="10"
        step="1"
        value={dishDetails.spiciness_scale || 0}
        onChange={handleDishDetails}
        required
      />
      <span className="validity"></span>
    </div>
    </>
  )

  export default Soup