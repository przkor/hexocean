import './App.css';
import React,{useState}  from 'react'
import axios from 'axios'

const dishTypes = ['pizza','soup','sandwich']

function App() {
  
  const [name,setName] = useState()
  const [preparation_time,setPreparation_time]=useState()
  const [type,setType]=useState()
  const [dishDetails,setDishDetails] = useState({})
 
  const handleChangeDishName = (e) => {
    setName(e.target.value) 
  }

  const handleChangePreparation = (e) => {
    setPreparation_time(e.target.value) 
  }

  const handleSelectDishType = (e) => {
    setType(e.target.value) 
    setDishDetails({})
  }

  const handleDishDetails = (e) => {
    if (e.target.name==='slices') {
      setDishDetails(prevValue => {
        return {
          ...prevValue,
          no_of_slices: parseInt(e.target.value),  
        }
      })
    }
    if (e.target.name==='diameter') {
      setDishDetails(prevValue => {
        return {
          ...prevValue,
          diameter: parseFloat(e.target.value),  
        }
      })
    }
    if (e.target.name==='spiciness_scale') {
      setDishDetails(prevValue => {
        return {
          ...prevValue,
          spiciness_scale: parseInt(e.target.value),  
        }
      })
    }   
    if (e.target.name==='slices_of_bread') {
      setDishDetails(prevValue => {
        return {
          ...prevValue,
          slices_of_bread : parseInt(e.target.value),  
        }
      })
    }  
  }

  const handleSendDish = (e) => {
    e.preventDefault()
    const dishData = {
      name:name,
      preparation_time:preparation_time,
      type:type
    }
    let data = Object.assign(dishData,dishDetails)
   // const tab = Object.keys(dishDetails)
    axios({
      method: 'post',
      url: 'https://frosty-wood-6558.getsandbox.com:443/dishes',
      data: data
    })
    .then(function (response) {
      if (response.status===200) {
        alert('Dish was add')
        setName('')
        setPreparation_time('')
        setType('')
        setDishDetails({})
      }
      if (response.status===404) {
        Object.keys(response.data).forEach(key => {
          console.log(key) // returns the keys in an object
          console.log(response.data[key])  // returns the appropriate value 
       })
      }
    })
    .catch(function (error) {
     console.log(error);
    });
  }

  const types = dishTypes.map((dishType, index) => {
    return <option key={index} value={dishType}>{dishType}</option>
  })

  const pizza = (
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

  const soup = (
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

  const sandwitch = (
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

  const elementToShow = () => {
    let element
    switch (type) {
        case 'pizza' : element=pizza
        break
        case 'soup' : element = soup
        break
        case 'sandwich' : element=sandwitch
        break
        default: return
    }
    return (  
        <>
        {element}
        </>
    );
}

  const dishForm = () => {
   return (
      <form>
        <div>
          <label htmlFor="name">Dish Name</label>
        </div>
        <div className="formDiv">
          <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name || ''}
              onChange={handleChangeDishName}
              required
              />
          <span className="validity"></span>
        </div>
        <div>
          <label htmlFor="preparation_time">Preparation time</label>
        </div>
        <div className="formDiv">
          <input 
            type="time"
            className="form-control"
            id="preparation_time"
            name="preparation_time"
            value={preparation_time || "00:00:00"}
            min="00:00:00"
            onChange={handleChangePreparation}
            required
            />  
        </div>
        <div>
          <label htmlFor="type">Dish type</label>
        </div>
        <div className="formDiv">
          <select
            onChange={handleSelectDishType}
            className="form-control"
            id="type"
            name="type"
            value={type || ''}
            placeholder="wybierz"
            required
          >
            <option value=''>wybierz</option>
            {types}
          </select>
          <span className="validity"></span>
        </div>
          {type ? elementToShow() : '' }
        <div>
        <button
          type="button"
          id="submit"
          name="submit"
          className="btn btn-primary pull-right"
          onClick={handleSendDish}
        >
          Send
        </button>
        </div>
      </form>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Dishes</h2>
      </header>
      <section>
        {dishForm()}
      </section>
    </div>
  );
}

export default App;
