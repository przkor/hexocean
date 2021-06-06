import React from 'react'
import Pizza from './Pizza'
import Soup from './Soup'
import Sandwich from './Sandwich'

const dishTypes = ['pizza','soup','sandwich']

const types = dishTypes.map((dishType, index) => {
  return <option key={index} value={dishType}>{dishType}</option>
})

const DishForm = ({name,preparation_time,type,message,dishDetails,handleChangeDishName,
    handleChangePreparation,handleSelectDishType,handleDishDetails,handleSendDish}) => {

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
         <div>
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