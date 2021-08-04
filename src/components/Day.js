import React, { useState} from 'react'

const Day = ( {day, onClick}) => {

    const [weatherIsTrue, setWeatherIsTrue] = useState(false)
    const [avgTemperature, setAvgTemperature] = useState(0)

    const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;

    async function fetchLocation (location) {
            const url = `https://www.metaweather.com/api/location/search/?query=${location}`;
            const response = await fetch(url, {
            })
            const data = await response.json()
            try {
                const woeid = await data[0].woeid
                fetchWeatherData(woeid)
            }
            catch {
                console.log('LOCATION ENTERED DOES NOT HAVE WEATHER DATA')
            }
    }

    async function fetchWeatherData (woeid) {
        const splitDate = day.date.split('/')
        
        const monthString = splitDate[0];
        const dayString = splitDate[1];
        const yearString = splitDate[2]; 

        const requestDate = yearString + '/' + monthString + '/' + dayString + '/'

        let url = `https://www.metaweather.com/api/location/${woeid}/${requestDate}`;
        const response = await fetch(url, {
        })
        const data = await response.json()
        const avgTempCalc = (data[0].max_temp + data[0].min_temp) / 2
        setAvgTemperature(avgTempCalc)
        setWeatherIsTrue(true)
    }

    if (day.event) {
        console.log('Logging This')
        const locationInput = day.event.location.toLowerCase()
        fetchLocation(locationInput)
    }
    

    return (
        <div onClick={onClick} className={className}>
            <div className="row-div-day">
                {day.value === 'padding' ? '' : day.value}
                { weatherIsTrue ? <div className="temperature">{avgTemperature} °</div> : <></>}
            </div>

            {day.event && <div className='event'>{day.event.title}</div>}
        
        </div>
    )
}

export default Day
