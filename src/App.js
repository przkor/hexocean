import logo from './logo.svg';
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
  }

  const handleDishDetails = (e) => {
    if (e.target.name==='slices') {
      setDishDetails(prevValue => {
        return {
          ...prevValue,
          no_of_slices: Number(e.target.value),  
        }
      })
    }
    if (e.target.name==='diameter') {
      setDishDetails(prevValue => {
        return {
          ...prevValue,
          diameter: Number(e.target.value),  
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
        alert(`${response.status}`)
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
      <input 
        type="number" 
        id="slices"
        name="slices"
        min="0"
        value={dishDetails.no_of_slices || 0}
        onChange={handleDishDetails}
        required
      />
      <span class="validity"></span>
    </div>
    <div>
      <label htmlFor="diameter">Diameter</label>
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
      <span class="validity"></span>
   </div>
  </>
  )

  const soup = (
    <p>soup</p>
  )

  const sandwitch = (
    <p>sandwich</p>
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
          <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name || ''}
              onChange={handleChangeDishName}
              required
              />
          <span class="validity"></span>
        </div>
        <div>
          <label htmlFor="preparation_time">Preparation time</label>
          <input 
            type="time"
            id="preparation_time"
            name="preparation_time"
            value={preparation_time || '00:00:00'}
            min="00:00:01"
            onChange={handleChangePreparation}
            required
            />
            <span class="validity"></span>
        </div>
        <div>
          <label htmlFor="type">Dish type</label>
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
          <span class="validity"></span>
        </div>
        <div>
          {type ? elementToShow() : '' }
        </div>
        <button
          type="button"
          id="submit"
          name="submit"
          className="btn btn-primary pull-right"
          onClick={handleSendDish}
        >
          Send
        </button>
      </form>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Dishes</h2>
      </header>
      <content>
        <p>Select</p>
        {dishForm()}
      </content>
    </div>
  );
}

export default App;
