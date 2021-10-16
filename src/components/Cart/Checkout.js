import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5


const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name  : true,
    street : true,
    city : true,
    postalCode : true
  })

  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalInputRef = useRef()
  const cityInputRef = useRef()

  const confirmHandler = (event) => {
  event.preventDefault();
  const enteredName = nameInputRef.current.value
  const enteredStreet = streetInputRef.current.value
  const enteredPostalCode = postalInputRef.current.value
  const enteredCity = cityInputRef.current.value

  const enteredNameIsvalid = !isEmpty(enteredName)
  const enteredStreetIsValid = !isEmpty(enteredStreet)
  const enteredCityIsValid = !isEmpty(enteredCity)
  const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode)

  setFormInputsValidity({
    name : enteredNameIsvalid,
    street : enteredStreetIsValid,
    city : enteredPostalCodeIsValid,
    postalCode : enteredPostalCodeIsValid
  })

  const formIsValid = enteredNameIsvalid && enteredStreetIsValid && enteredCityIsValid &&  enteredPostalCodeIsValid

  if(!formIsValid){
    return
  }
  props.onConfirm({
    name : enteredName,
    street : enteredStreet,
    city : enteredCity,
    postalCode : enteredPostalCode,
    
  })
  };
  
  return (
    <form className={classes.form} onSubmit={confirmHandler}>

      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {formInputsValidity.name && <p>Please enter a valid Name!</p>}
      </div>

      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {formInputsValidity.street && <p>Please enter a valid Street!</p>}
      </div>

      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}/>
        {formInputsValidity.postalCode && <p>Please enter a valid Postal Code!</p>}
      </div>

      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {formInputsValidity.city && <p>Please enter a valid City Name!</p>}
      </div>

      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;