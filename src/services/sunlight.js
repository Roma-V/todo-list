/**
 * @file service defining sunrise and sunset UTC time based on location. 
 * "sunrise-sunset.org" API is used to get the data based on latitude and longitude.
 * @author Roman Vasilyev
 */

import axios from 'axios';

const baseUrl = 'https://api.sunrise-sunset.org/json';

/**
 * 
 * @returns {Promise} A Promise with retrieved data with unnecessary fields removed
 */
function getSunlightData() {
    const request = axios.get(
        baseUrl,
        {
            params: {
                lat: 12345,
                lng: 123,
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
 * @returns {Object} Data Object with unnecessary fields removed
 */
function parseSinlightData(data) {
    return {
        sunrise: data.sunrise,
        sunset: data.sunset,
    };
}

export default getSunlightData;