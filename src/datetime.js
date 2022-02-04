require("dotenv").config();
const moment = require("moment");

/**
 * Create a time window with the following format: YYYY-MM-DDTHH:mm:ss.SSSZ
 * from the current date.
 * < ----(n)---- [now] ----(n)---- >
 * @param {*} n integer of days or months or years of the symmetric time window
 * @param {*} months select true if value of n is in months
 * @param {*} years select true if value of n is in years
 * @returns [start, end]
 */
const createWindow = (n, months = false, years = false) => {
  if (months) {
    return [
      moment().subtract(n, "months").format(process.env.TIME_FORMAT),
      moment().add(n, "months").format(process.env.TIME_FORMAT),
    ];
  } else if (years) {
    return [
      moment().subtract(n, "years").format(process.env.TIME_FORMAT),
      moment().add(n, "years").format(process.env.TIME_FORMAT),
    ];
  } else {
    return [
      moment().subtract(n, "days").format(process.env.TIME_FORMAT),
      moment().add(n, "days").format(process.env.TIME_FORMAT),
    ];
  }
};

/**
 * Set the duration of an event in hours.
 * @param {*} n real number representing how many hours the event lasted for
 * @returns [start, end] start and end values of duration in correct format
 */
const eventDuration = (n) => {
  return [
    moment().format(process.env.TIME_FORMAT),
    moment().add(n, "hours").format(process.env.TIME_FORMAT),
  ];
};

module.exports = { createWindow, eventDuration };
