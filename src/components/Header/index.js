import React, { useState, useEffect } from "react";

import getLocation from '../../services/location.js';
import getSunlightData from '../../services/sunlight.js';
import { dateToHours } from '../../utils/timeUtils.js'

import './Header.css';

function Header(props) {
    const [location, setLocation] = useState(null);
    const [sunlight, setSunlight] = useState(null);

    const now = new Date();
    let headerClassName = 'header'

    // Compute background style based on daytime
    if (now && sunlight) {
        headerClassName += computeBackground(dateToHours(now), sunlight);
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
        </header>
    );
}

function computeBackground(hoursNow, sunlightData) {
    let dayTime;

    if (hoursNow < sunlightData.night || hoursNow >= sunlightData.dusk) {
        dayTime = 'night';
    }
    else if (hoursNow < sunlightData.dawn) {
        dayTime = 'dawn';
    }
    else if (hoursNow < sunlightData.day) {
        dayTime = 'day';
    }
    else if (hoursNow < sunlightData.dusk) {
        dayTime = 'dusk';
    }

    return ' ' + dayTime;
}

export default Header;