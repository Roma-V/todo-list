/**
 * @file service defining sunrise and sunset UTC time based on location. 
 * "sunrise-sunset.org" API is used to get the data based on latitude and longitude.
 * @author Roman Vasilyev
 */

import axios from 'axios';

import { millisecondsToHours, dateToHours } from '../utils/timeUtils.js'

const baseUrl = 'https://api.sunrise-sunset.org/json';

/**
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
 * @param {Object} data JSON received from API and parsed to an Object.
 * @returns {Object} Data Object with end times for part of a day.
 */
function parseSinlightData(data) {
    const sunrise = utcTimeToDateObject(data.sunrise);
    const sunset = utcTimeToDateObject(data.sunset)
    const midday = midDay(sunrise, sunset);
    const midnight = midNight(sunrise, sunset);
    
    return {
        night: dateToHours(sunrise) - millisecondsToHours(sunrise - midnight)/2,
        dawn: dateToHours(midday) - millisecondsToHours(midday - sunrise)/2,
        day: dateToHours(sunset) - millisecondsToHours(midday - sunrise)/2,
        dusk: dateToHours(sunset) + millisecondsToHours(sunrise - midnight)/2,
    };
}

/**
 * @param {String} time String representation of time (HH:MM:SS (AM/PM)?).
 * @returns {Date} Date object corresponding to the time provided today.
 */
function utcTimeToDateObject(time) {
    const now = new Date();

    const date = new Date(now.toISOString().split('T')[0] + ' ' + time + ' UTC');
    return date;
}

/**
 * @param {Date} sunrise Date object representing sunrise time.
 * @param {Date} sunset Date object representing sunset time.
 * @returns {Date} Date object representing median day time.
 */
function midDay(sunrise, sunset) {
    const dayLength = sunset - sunrise;
    return new Date(sunrise.valueOf() + dayLength/2);
}

/**
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

export default getSunlightData;