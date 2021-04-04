import React, { useState, useEffect } from "react";

import getLocation from '../../services/location.js';
import getSunlightData from '../../services/sunlight.js';

import './Header.css';

function Header(props) {
    const [location, setLocation] = useState(null);
    const [sunlight, setSunlight] = useState(null);

    const now = new Date();
    let headerClassName = 'header'

    // Compute background style based on daytime
    if (now && sunlight) {
        const hoursNow = hours(now);
        let dayTime;

        if (hoursNow < hours(sunlight.sunrise) - sunlight.midnightToSunriseLength/2) {
            dayTime = 'night';
        }
        else if (hoursNow < hours(sunlight.midday) - sunlight.sunriseToMiddayLength/2) {
            dayTime = 'dawn';
        }
        else if (hoursNow < hours(sunlight.sunset) + sunlight.midnightToSunriseLength/2) {
            dayTime = 'day';
        } else {
            dayTime = 'dusk';
        }
        console.log(dayTime);

        headerClassName += ' ' + dayTime;
    }

    function hours(date) {
        return date.getHours() + date.getMinutes()/60;
    }

    useEffect(() => {
        getLocation()
            .then(location => setLocation(location))
    }, []);

    useEffect(() => {
        if (!location) return;

        getSunlightData(location)
            .then(sunlight => setSunlight(sunlight))
    }, [location]);

    return (
        <header className={headerClassName}>
            <h1>Manage your day</h1>
            {location && <p> Location: {location.city}, {location.country}</p>}
            <p>Date/Time: {now.toLocaleString()}</p>
            <p>Sunrise at: {sunlight && sunlight.sunrise.toLocaleString()}</p>
            {
                sunlight 
                && <p>Time since sinrise: {((now - sunlight.sunrise)/1000/60/60).toFixed(1)}H</p>
            }
            <p>Sunset at: {sunlight && sunlight.sunset.toLocaleString()}</p>
            {
                sunlight 
                && <p>Time to sinset: {((sunlight.sunset - now)/1000/60/60).toFixed(1)}H</p>
            }
        </header>
    );
}


export default Header;