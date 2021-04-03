import React, { useState, useEffect } from "react";

import getLocation from '../../services/location.js';
import getSunlightData from '../../services/sunlight.js';

import './Header.css';

function Header(props) {
    const [location, setLocation] = useState(null);
    const [sunlight, setSunlight] = useState(null);

    const now = new Date();

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
        <header className="header">
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