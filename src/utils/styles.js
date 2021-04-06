/**
 * @file Utilities for handling CSS. 
 * @author Roman Vasilyev
 */

/**
 * @param {String} mainClass Main class returned by default on its own.
 * @param {Boolean} condition Condition defining whether to add an additional class or not.
 * @param {String} additionalClass Additional class that will be added to classList if condition is true
 * @returns {String}
 */
export function conditionallyAddClass(mainClass, condition=false, additionalClass) {
    return condition ? mainClass + " " + additionalClass : mainClass;
}