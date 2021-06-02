import logo from './logo.svg';
import './App.css';
import React,{useState}  from 'react'

const dishes = [
  {
    name:'pizza'
  },
  {
    name:'soup'
  },
  {
    name:'sandwich'
  }
]


function App() {

  const [number,setNumber] = useState()
  
  const handleChangeNumber = (e) => {
    setNumber(e.target.value)
  }

  const dishForm = () => {
   return (
      <form onSubmit="">
        <div className="form-group">
            <label htmlFor="number">Slices</label>
            <input
              type="number"
              className="form-control"
              id="number"
              name="number"
              value={number || ''}
              step="1"
              min="0"
              onChange={handleChangeNumber}
              required
              />
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
