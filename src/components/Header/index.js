import React, { useState, useEffect } from "react";

import getLocation from '../../services/location.js';
import getSunlightData from '../../services/sunlight.js';

import './Header.css';

function Header(props) {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        getLocation()
            .then(location => {
                setLocation(location);
            })
    }, []);

    useEffect(() => {
        getSunlightData()
            .then(sunlight => {
                getSunriseDateObject(sunlight.sunrise);
            })
    }, []);

    function getTime() {
        const time = new Date();
        return time.toLocaleString();
    }

    function getSunriseDateObject(sunriseTime) {
        console.log(sunriseTime);
        const now = new Date();

        const sunriseDate = new Date(now.toLocaleDateString() + ' ' + sunriseTime + ' UTC');
        console.log(sunriseDate);
    }

    return (
        <header className="header">
            <h1>Manage your day</h1>
            {location && <p> Location: {location.city}, {location.country}</p>}
            <p>Date/Time: {getTime()}</p>
        </header>
    );
}


export default Header;