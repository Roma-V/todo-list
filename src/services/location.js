/**
 * @file service defining user location. 
 * "IPWHOIS.IO" IP Geolocation API is used to get location based on user IP address.
 * @author Roman Vasilyev
 */

import axios from 'axios';

const baseUrl = 'https://ipwhois.app/json/';

/**
 * 
 * @returns {Promise} A Promise with retrieved data with unnecessary fields removed
 */
function getLocation() {
    const request = axios.get(baseUrl);
    return request
        .then(response => response.data)
        .then(parseLocationData);
};

/**
 * 
 * @param {Object} data JSON received from API and parsed to an Object.
 * @returns {Object} Data Object with unnecessary fields removed
 */
function parseLocationData(data) {
    return {
        country: data.country,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        timezone_gmt: data.timezone_gmt,
        timezone_gmtOffset: data.timezone_gmtOffset,
    };
}

export default getLocation;