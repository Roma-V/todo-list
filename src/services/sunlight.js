/**
 * @file service defining sunrise and sunset UTC time based on location. 
 * "sunrise-sunset.org" API is used to get the data based on latitude and longitude.
 * @author Roman Vasilyev
 */

import axios from 'axios';

const baseUrl = 'https://api.sunrise-sunset.org/json';

/**
 * 
 * @returns {Promise} A Promise with retrieved data with unnecessary fields removed.
 */
function getSunlightData({ latitude, longitude }) {
    const request = axios.get(
        baseUrl,
        {
            params: {
                lat: latitude,
                lng: longitude,
                date: 'today',
            },
        });
    return request
        .then(response => response.data.results)
        .then(parseSinlightData);
};

/**
 * 
 * @param {Object} data JSON received from API and parsed to an Object.
 * @returns {Object} Data Object with unnecessary fields removed.
 */
function parseSinlightData(data) {
    const sunrise = utcTimeToDateObject(data.sunrise);
    const sunset = utcTimeToDateObject(data.sunset)
    const midday = midDay(sunrise, sunset);
    const midnight = midNight(sunrise, sunset);
    
    return {
        sunrise,
        sunset,
        midnight,
        midday,
        midnightToSunriseLength: millisecondsToHours(sunrise - midnight),
        sunriseToMiddayLength: millisecondsToHours(midday - sunrise),
    };
}

/**
 * 
 * @param {String} time String representation of time (HH:MM:SS (AM/PM)?).
 * @returns {Date} Date object corresponding to the time provided today.
 */
function utcTimeToDateObject(time) {
    const now = new Date();

    const date = new Date(now.toISOString().split('T')[0] + ' ' + time + ' UTC');
    return date;
}

/**
 * 
 * @param {Date} sunrise Date object representing sunrise time.
 * @param {Date} sunset Date object representing sunset time.
 * @returns {Date} Date object representing median day time.
 */
function midDay(sunrise, sunset) {
    const dayLength = sunset - sunrise;
    return new Date(sunrise.valueOf() + dayLength/2);
}

/**
 * 
 * @param {Date} sunrise Date object representing sunrise time.
 * @param {Date} sunset Date object representing sunset time.
 * @returns {Date} Date object representing median night time.
 */
function midNight(sunrise, sunset) {
    const previousSunset = new Date(sunset);
    previousSunset.setDate(sunset.getDate() - 1);
    const nightLength = sunrise - previousSunset;
    return new Date(sunrise.valueOf() - nightLength/2);
}

/**
 * 
 * @param {Int} milliseconds Time in milliseconds.
 * @returns {Float} Time in hours.
 */
function millisecondsToHours(milliseconds) {
    return (milliseconds/1000/60/60).toFixed(2)
}

export default getSunlightData;