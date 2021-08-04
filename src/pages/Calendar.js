import React, { useState, useEffect } from 'react';
import '../sass/calendar.scss'
import Day from '../components/Day'
import CalendarHeader from '../components/CalendarHeader';
import NewEventModal from '../components/NewEventModal'
import DeleteEventModal from '../components/DeleteEventModel'

function Calendar(props) {
  
  //Initalizing States used in Calendar
  const [nav, setNav] = useState(0)
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState('');
  const [clicked, setClicked] = useState();
  
  //Checking if we already have some events stored in local storage.
  const [events, setEvents] = useState(
    localStorage.getItem('events') 
    ? JSON.parse(localStorage.getItem('events')) 
    : []
  );

  const [eventsTemp, setEventsTemp] = useState(
    localStorage.getItem('eventsTemp') 
    ? JSON.parse(localStorage.getItem('eventsTemp')) 
    : []
  );

  const eventForDate = date => events.find(e => e.date === date);
  
  //UseEffect function that updates state of events each time event changes
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events])

  useEffect(() => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dt = new Date();
    
    const dayNumber = dt.getDate()
    
    //Function to check if the day is the 31 of a month (Bug fixed from changing from 31 January to Feb)
    if (nav !==0 && dayNumber > 28) {
      dt.setDate(new Date().getDate() - 5);
    }

    if (nav !==0) {
      dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });

    setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`);

    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    const daysArr = [];

    for (let i = 0; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`
    
      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0  ? true : false,
          date: dayString
        });
      } else {
        daysArr.push({
          value: 'padding',
          event: null,
          isCurrentDay: false,
          date: ''
        });
      }      
    }   

    setDays(daysArr)

  }, [events, nav])

  const onSave = (title, reminder, location, timeSlotOne, amPmOne, timeSlotTwo, amPmTwo) => {
    let timeString = timeSlotOne + amPmOne + " - " + timeSlotTwo + amPmTwo
    console.log(timeString, 'GUACAMOLE');
    setEvents([ ...events, {title, date:clicked, reminder: reminder, location: location, time: timeString, 
      timeVariables: {timeSlotOne:timeSlotOne, amPmOne: amPmOne, timeSlotTwo: timeSlotTwo, amPmTwo:amPmOne}}])
    setClicked(null);
  }

  return (
    <>
      <div id="container">
      
      <CalendarHeader
        dateDisplay={dateDisplay}
        onNext={() => setNav(nav + 1)}
        onBack={() => setNav(nav - 1)}
      />
      
      <div id="weekdays">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>

      <div id="calendar">
        {days.map((d, index) => (
        <Day
          key={index}
          day={d}
          onClick={ () => {
            if (d.value !== 'padding') {
              setClicked(d.date)
            }
          }}    
          />
          ))}
      </div>
    </div>

        { 
          clicked && !eventForDate(clicked) &&
          <NewEventModal
          onClose={() => setClicked(null)}
          onSave={onSave}
          />
        }

        {
        clicked && eventForDate(clicked) &&
        <DeleteEventModal
          clicked={clicked}
          events = {events}
          eventText={eventForDate(clicked).title}
          eventReminder={eventForDate(clicked).reminder}
          eventLocation={eventForDate(clicked).location}
          eventTime={eventForDate(clicked).time}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter(e => e.date !== clicked));
            setClicked(null);  
          }}
          onSave={onSave}
          eventForDate={eventForDate}
        />
        }

    </>
  );
}

export default Calendar;