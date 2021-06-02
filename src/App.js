import logo from './logo.svg';
import './App.css';
import React,{useState}  from 'react'

const dishTypes = ['pizza','soup','sandwich']


function App() {

  const [number,setNumber] = useState(0)
  const [name,setName] = useState('')
  const [preparation,setPreparation]=useState('')
  const [type,setType]=useState('')
  const [dishDetails,setDishDetails] = useState('')
  
  const handleChangeNumber = (e) => {
    setNumber(e.target.value) 
  }

  const handleChangeDishName = (e) => {
    setName(e.target.value) 
  }

  const handleChangePreparation = (e) => {
    setPreparation(e.target.value) 
  }

  const handleSelectDishType = (e) => {
    setType(e.target.value) 
  }

  const handleDishDetails = (e) => {
    setDishDetails (e.target.value)
  }


  const types = dishTypes.map((dishType, index) => {
    return <option key={index} value={dishType}>{dishType}</option>
  })

  const pizza = (
    <p>pizza</p>
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
      <form onSubmit="">
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
            value={preparation || '00:00:00'}
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
        <div>
            <label htmlFor="number">Slices</label>
            <input
              type="number"
              className="form-control"
              id="number"
              name="number"
              value={number || ''}
              step="0.1"
              min="1"
              onChange={handleChangeNumber}
              required
              />
            <span class="validity"></span>
          </div>
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
