import React, { useEffect, useState } from 'react'

const DeleteEventModal = (props) => {

    console.log(props);
    
    const thisEvent = props.eventForDate(props.clicked)

    const { 
        onDelete, 
        eventText, 
        eventReminder, 
        eventLocation, 
        eventTime, 
        onClose,
        onSave
        } = props
    

    console.log(eventTime)
    // const originalTimeString = eventTime
    const [editModeOn, setEditModeOn] = useState(false)

    //Edit States
    const [newText, setNewText] = useState(eventText);
    const [newEventReminder, setNewEventReminder] = useState(eventReminder);
    const [newEventLocation, setNewEventLocation] = useState(eventLocation);
    // const [newTimeSlotOne, setNewTimeSlotOne] = useState(timeSlotOne);
    const [newEventTime, setNewEventTime] = useState(eventTime)

    const [newTimeSloteOne, setnewTimeSloteOne] = useState(thisEvent.timeVariables.timesSlotOne)
    const [newTimeSloteTwo, setnewTimeSloteTwo] = useState(thisEvent.timeVariables.timesSlotTwo)
    const [newAmPmOne, setNewAmPmOne] = useState(thisEvent.timeVariables.amPmOne)
    const [newAmPmTwo, setNewAmPmTwo] = useState(thisEvent.timeVariables.amPmTwo)
    
    const finishEdit = () => {
        onDelete()
        console.log(newTimeSloteOne)
        onSave(newText, newEventReminder, newEventLocation, newTimeSloteOne, newAmPmOne, newTimeSloteTwo, newAmPmTwo);
    }

    

    return (
    <>
        <div id="deleteEventModal">
            <h2>Event</h2>

            {   editModeOn ?
                
                <>
                    <div className="row-div">
                        <p id="eventText">Title:</p>
                        <input onChange={(event) => setNewText(event.target.value)} placeholder={eventText}></input>
                    </div>
                    <div className="row-div">
                        <p id="eventText">Reminder:</p>
                        <input onChange={(event) => setNewEventReminder(event.target.value)} placeholder={eventReminder}></input>
                    </div>
                    <div className="row-div">
                        <p id="eventText">Location:</p>
                        <input onChange={(event) => setNewEventLocation(event.target.value)} placeholder={eventLocation}></input>
                    </div>
                    <div className="row-div">
                        <p id="eventText">Time Slot:</p>
                        <select onChange={(event) => setnewTimeSloteOne(event.target.value)} className="time-selector" name="time-slot" >
                <option value="">{}</option>
                <option value="0:00">0:00</option>
                <option value="0:00">1:00</option>
                <option value="0:00">2:00</option>
                <option value="0:00">3:00</option>
                <option value="0:00">4:00</option>
                <option value="0:00">5:00</option>
                <option value="0:00">6:00</option>
                <option value="0:00">7:00</option>
                <option value="0:00">8:00</option>
                <option value="0:00">9:00</option>
                <option value="0:00">10:00</option>
                <option value="0:00">11:00</option>
                <option value="0:00">11:00</option>
              </select>
              <select onChange={(event) => setNewAmPmOne(event.target.value)} className="time-selector" name="time-slot">
                <option value="">-</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
              <select onChange={(event) => setnewTimeSloteTwo(event.target.value)} className="time-selector" name="time-slot">
                <option value="">-</option>
                <option value="0:00">0:00</option>
                <option value="0:00">1:00</option>
                <option value="0:00">2:00</option>
                <option value="0:00">3:00</option>
                <option value="0:00">4:00</option>
                <option value="0:00">5:00</option>
                <option value="0:00">6:00</option>
                <option value="0:00">7:00</option>
                <option value="0:00">8:00</option>
                <option value="0:00">9:00</option>
                <option value="0:00">10:00</option>
                <option value="0:00">11:00</option>
                <option value="0:00">11:00</option>
              </select>
              <select onChange={(event) => setNewAmPmTwo(event.target.value)} className="time-selector" name="time-slot" >
                <option value="">-</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
                    </div>
                </>
                :
                <>
                    <p id="eventText">Title: {eventText}</p>
                    <p id="eventText">Description: {eventReminder}</p>
                    <p id="eventText">Description: {eventLocation}</p>
                    <p id="eventText">Description: {eventTime}</p>
                </>
            }

            
            { editModeOn ? 
            
            <button className="save-btn" onClick={finishEdit}>Save</button> :
            
            <button className="edit-btn" onClick={() => setEditModeOn(!editModeOn)} id="editButton">Edit</button>

            }

            <button onClick={onDelete} id="deleteButton">Delete</button>
            <button onClick={onClose} id="closeButton">Close</button>
        </div>

        <div id="modalBackDrop"></div>
    </>
    )
}

export default DeleteEventModal
