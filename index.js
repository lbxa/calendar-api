require("dotenv").config();
const { insertEvent, getEvents } = require("./src/events");
const { createWindow, eventDuration } = require("./src/datetime");
const { printc } = require("./src/util");

let [start, end] = eventDuration(2);

// Event for Google Calendar
const event = {
    summary: "TESTING 🎈",
    description: "This is a test run of the smart calendar beginnings",
    start: {
        dateTime: start,
        timeZone: process.env.TIMEZONE,
    },
    end: {
        dateTime: end,
        timeZone: process.env.TIMEZONE,
    },
};

//insertEvent(event).catch(console.error);

[start, end] = createWindow(100);
getEvents(start, end, "personal")
    .then((res) => {
        res.map((calendarEntry) => printc(calendarEntry));
    })
    .catch(console.error);
