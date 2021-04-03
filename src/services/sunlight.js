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
    return {
        sunrise: utcTimeToDateObject(data.sunrise),
        sunset: utcTimeToDateObject(data.sunset),
        // midnight: data.day_length,
        // midday: 
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

export default getSunlightData;