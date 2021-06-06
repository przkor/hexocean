import React,{useState} from 'react'
import Pizza from './Pizza'
import Soup from './Soup'
import Sandwich from './Sandwich'
import axios from 'axios'

const dishTypes = ['pizza','soup','sandwich']

const types = dishTypes.map((dishType, index) => {
  return <option key={index} value={dishType}>{dishType}</option>
})

const DishForm = () => {

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

    const elementToShow = () => {
      let element
      switch (type) {
        case 'pizza' : element=<Pizza dishDetails={dishDetails} 
              handleDishDetails={handleDishDetails} />
        break
        case 'soup' : element = <Soup dishDetails={dishDetails} 
              handleDishDetails={handleDishDetails}/>
        break
        case 'sandwich' : element=<Sandwich dishDetails={dishDetails} 
              handleDishDetails={handleDishDetails}/>
        break
        default: return
      }
      return (  
        <>
          {element}
        </>
      );
    }

    return (
      <>
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
           <label htmlFor="preparation_time">Preparation</label>
         </div>
         <div className="formDiv">
           <input 
             type="time"
             className="form-control"
             id="preparation_time"
             name="preparation_time"
             value={preparation_time || ''}
             step="1"
             onChange={handleChangePreparation}
             required
             />  
             <span className="validity"></span>
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
         <div></div>
         <div className="formDiv">
           <span className="message">{message ? message : ''}</span>
           <button
             type="button"
             id="submit"
             name="submit"
             onClick={handleSendDish}
           >
             Send
           </button>     
         </div>
       </form>
     </>
     )
   }

   export default DishForm