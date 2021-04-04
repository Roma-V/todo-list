/**
 * @file Utilities for time/date operations. 
 * @author Roman Vasilyev
 */

/**
 * @param {Int} milliseconds Time in milliseconds.
 * @returns {Float} Time in hours.
 */
export function millisecondsToHours(milliseconds) {
    return (milliseconds/1000/60/60).toFixed(2)
}

/**
 * @param {Date} date Date object to extract time from.
 * @returns {Float} Time in hours.
 */
export function dateToHours(date) {
    return date.getHours() + date.getMinutes()/60;
}