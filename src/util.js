require("dotenv").config();

const selectCalendar = (calenderId) => {
    const calendarIDs = {
        summer: JSON.parse(process.env.CALENDARS).summer_id,
        personal: JSON.parse(process.env.CALENDARS).personal_id,
        default: JSON.parse(process.env.CALENDARS).default_id,
    };
    return calendarIDs[calenderId.toLowerCase()];
};

const printc = (calendarEntry) => {
    console.log(" --------------Event---------------");
    console.log("|", calendarEntry.summary);
    console.log("|", calendarEntry.description);
    console.log(" ----------------------------------");
};

module.exports = { selectCalendar, printc };
