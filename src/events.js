import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";
import { auth } from "./auth.js";
import { selectCalendar } from "../src/util.js";
import moment from "moment";

// Google calendar API settings
const calendar = google.calendar({ version: "v3" });

/**
 * Insert new event to the Google Calendar
 * @param {*} event
 * @param {*} calendarId id pertaining to the calendar event is being added to
 * @returns 1 on success and 0 on failure
 */
export const insertEvent = async (event, calendarId = "summer") => {
  try {
    const response = await calendar.events.insert({
      auth,
      calendarId: selectCalendar(calendarId),
      resource: event,
    });

    return response["status"] == 200 ? 1 : 0;
  } catch (error) {
    return console.error(`Error at insertEvent --> ${error}`);
  }
};

// Event for Google Calendar
// const event = {
//   summary: "TESTING 🎈",
//   description: "This is a test run of the smart calendar beginnings",
//   start: {
//     dateTime: start,
//     timeZone: process.env.TIMEZONE,
//   },
//   end: {
//     dateTime: end,
//     timeZone: process.env.TIMEZONE,
//   },
// };

//insertEvent(event).catch(console.error);

/**
 * Retrieve a list of all events from the calendar with @calendarId
 * @param {*} start start of the timespan for the events
 * @param {*} end end of the timespan for the events
 * @param {*} calendarId
 * @returns list of all events from calendarId. 0 on failure.
 */
export const getEvents = async (start, end, calendarId = "default") => {
  try {
    const response = await calendar.events.list({
      auth: auth,
      calendarId: selectCalendar(calendarId),
      timeMin: start,
      timeMax: end,
      timeZone: process.env.TIMEZONE,
    });

    return response["data"]["items"];
  } catch (error) {
    return console.log(`Error at getEvents --> ${error}`);
  }
};

/**
 * Return all events from all calendars until end. Defaults to one week
 * @returns [] - Array of objects containing event details
 */
export const getAllComingEvents = async (end = null) => {
  const start = moment().format(process.env.TIME_FORMAT);
  if (!end) end = moment().add(1, "week").format(process.env.TIME_FORMAT);

  return [
    ...(await getEvents(start, end, "schedule")),
    ...(await getEvents(start, end, "default")),
    ...(await getEvents(start, end, "summer")),
  ];
};

// Delete an event from eventID
// const deleteEvent = async (eventId, calendarId = "summer") => {
//     try {
//         let response = await calendar.events.delete({
//             auth: auth,
//             calendarId: selectCalendar(calendarId),
//             eventId: eventId,
//         });

//         if (response.data === "") {
//             return 1;
//         } else {
//             return 0;
//         }
//     } catch (error) {
//         console.log(`Error at deleteEvent --> ${error}`);
//         return 0;
//     }
// };

// retrieve eventId from getEvents response
// let eventId = "4gf800a4uh2vc5sriufskv7c50";

// deleteEvent(eventId)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
