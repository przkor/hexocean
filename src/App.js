import './App.css';
import React,{useState}  from 'react'
import DishForm from './components/DishForm'
import axios from 'axios'

function App() {
  
  const [name,setName] = useState()
  const [preparation_time,setPreparation_time]=useState()
  const [type,setType]=useState()
  const [dishDetails,setDishDetails] = useState({})

  const [message,setMessage] = useState('')
 
  const handleChangeDishName = (e) => {
    setName(e.target.value) 
  }

  const handleChangePreparation = (e) => {
    setPreparation_time(e.target.value) 
  }

  const handleSelectDishType = (e) => {
    setType(e.target.value) 
    setDishDetails({})
    setMessage('')
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
        setMessage('')
      }
    })
    .catch(function (error) {
      Object.keys(error.response.data).forEach (key => {
        setMessage(error.response.data[key])
      })
     console.log(error);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Dishes</h2>
      </header>
      <section>
        <DishForm name={name} preparation_time={preparation_time} type={type} 
          dishDetails={dishDetails} message={message} 
          handleChangeDishName={handleChangeDishName} 
          handleChangePreparation={handleChangePreparation}
          handleSelectDishType={handleSelectDishType}
          handleDishDetails={handleDishDetails}
          handleSendDish={handleSendDish}
        />
      </section>
    </div>
  );
}

export default App;
