import dotenv from "dotenv";
dotenv.config();

export const selectCalendar = (calenderId) => {
  const calendarIDs = {
    summer: JSON.parse(process.env.CALENDARS).summer_id,
    schedule: JSON.parse(process.env.CALENDARS).schedule_id,
    default: JSON.parse(process.env.CALENDARS).default_id,
  };
  return calendarIDs[calenderId.toLowerCase()];
};

// print more compact calendar information
export const printc = (calendarEntry) => {
  console.log(
    `${calendarEntry.summary} (${
      (calendarEntry.organizer && calendarEntry.organizer.displayName) ||
      "Default"
    })`
  );
};
