import React, {isValidElement, useState, useEffect} from 'react'

const NewEventModal = (props) => {
  
  const {onSave, onClose} = props
  
  console.log(props)

    const [title, setTitle] = useState('');
    const [reminder, setReminder] = useState('');
    const [location, setLocation] = useState('')

    const [charDifference, setCharDifference] = useState(0)

    const [titleError, setTitleError] = useState(false);
    const [titleErrorMsg, setTitleErrorMsg] = useState('')
    
    const [reminderError, setReminderError] = useState(false);
    const [reminderErrorMsg, setReminderErrorMsg] = useState('')
    
    const [locationError, setLocationError] = useState(false);
    const [locationErrorMsg, setLocationErrorMsg] = useState('')

    const [timeSlotOne, setTimeSlotOne] = useState('');
    const [amPmOne, setAmPmOne] = useState('');
    const [timeSlotTwo, setTimeSlotTwo] = useState('');
    const [amPmTwo, setAmPmTwo] = useState('')

    const [timeSlotErrorMsg, setTimeSlotErrorMsg] = useState('')

    const handleValidation = () => {
      let valid = true;

      if (title.length <= 0) {
        valid = false
        setTitleError(true)
        console.log('TO SHORT');
        setTitleErrorMsg('Please add a title')
      }
      
      if (reminder.length <= 0) {
        console.log('TO SHORT REMINDER');
        setReminderError(true)
        setReminderErrorMsg('Please add a reminder')
        valid = false
      }

      if (reminder.length > 30) {
        setReminderError(true)
        setReminderErrorMsg(('Description needs to be shorter than 30 characters'))
        valid = false
      }

      if (location.length <= 0) {
        setLocationError(true)
        setLocationErrorMsg('Please add a valid city or location')
        valid = false
      }

      if (timeSlotOne.length  <= 0 || timeSlotTwo.length  <= 0 || amPmOne.length <= 0 || amPmTwo.length <= 0  ) {
        setTimeSlotErrorMsg('Please Enter all Time Slot Fields')
        valid = false
      }
      
      console.log('finishing guacamole')

      console.log(valid, 'WAKA WAKA')
      return valid
    }

    useEffect(() => {
      console.log(title,reminder,location, timeSlotOne, amPmOne, timeSlotTwo, amPmTwo)
    }, [title,reminder,location, timeSlotOne, amPmOne, timeSlotTwo, amPmTwo])
    
    const calculateDifference = (str) => {
      console.log(str)
      const differenceChar = 30 - str.length
      setCharDifference(differenceChar)
    }

    return(
      <>
        <div id="newEventModal">
          <h2>New Event</h2>
          <input 
            // className={titleError ? 'error' : ''}
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            id="eventTitleInput" 
            placeholder="Event Title" 
          />
          <div className="error-message-input">{titleErrorMsg}</div>

          <h2>Reminder</h2>
            
            <input 
              // className={reminderError ? 'error' : ''}
              value={reminder} 
              onChange={e =>{
                calculateDifference(e.target.value) 
                setReminder(e.target.value)
              }} 
              id="eventTitleInput" 
              placeholder="Description Max. 30 chars" 
            />
            <h2 className="charachters-left">{charDifference}</h2>
            <div className="error-message-input">{reminderErrorMsg}</div>
          
          <h2>Location/City</h2>
            <input 
              // className={locationError ? 'error' : ''}
              value={location} 
              onChange={e => setLocation(e.target.value)} 
              id="eventTitleInput" 
              placeholder="Example: London" 
            />
          <div className="error-message-input">{locationErrorMsg}</div>
          
          <h2>Time</h2>
          <div className="row-time-selector">
              <select className="time-selector" name="time-slot" onChange={(event) => setTimeSlotOne(event.target.value)}>
                <option value="">-</option>
                <option value="0:00">0:00</option>
                <option value="1:00">1:00</option>
                <option value="2:00">2:00</option>
                <option value="3:00">3:00</option>
                <option value="4:00">4:00</option>
                <option value="5:00">5:00</option>
                <option value="6:00">6:00</option>
                <option value="7:00">7:00</option>
                <option value="8:00">8:00</option>
                <option value="9:00">9:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
              </select>
              <select className="time-selector" name="time-slot" onChange={(event) => setAmPmOne(event.target.value)}>
                <option value="">-</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
              <select className="time-selector" name="time-slot" onChange={(event) => setTimeSlotTwo(event.target.value)}>
              <option value="">-</option>
                <option value="0:00">0:00</option>
                <option value="1:00">1:00</option>
                <option value="2:00">2:00</option>
                <option value="3:00">3:00</option>
                <option value="4:00">4:00</option>
                <option value="5:00">5:00</option>
                <option value="6:00">6:00</option>
                <option value="7:00">7:00</option>
                <option value="8:00">8:00</option>
                <option value="9:00">9:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
              </select>
              <select className="time-selector" name="time-slot" onChange={(event) => setAmPmTwo(event.target.value)}>
                <option value="">-</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
              <div className="error-message-input">{timeSlotErrorMsg}</div>
          </div>


          <button 
            onClick={ async () => {
              let isFormValid = await handleValidation()
              console.log(isFormValid, 'Loging this')
              // isFormValid = true
              if (isFormValid) {
                onSave(title,reminder,location, timeSlotOne, amPmOne, timeSlotTwo, amPmTwo);
              } 
            }} 


            id="saveButton">Save</button>
  
  
          <button 
            onClick={onClose}
            id="cancelButton">Cancel</button>
        </div>
  
        <div id="modalBackDrop"></div>
      </>
    );
  };

export default NewEventModal
