import dotenv from "dotenv";
import moment from "moment";
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
export const printc = ({ summary, start = "", end = "" }) => {
  const startDate = moment(start.dateTime, process.env.TIME_FORMAT);
  const endDate = moment(end.dateTime, process.env.TIME_FORMAT);
  const diff = moment.utc(endDate.diff(startDate)).format("HH:mm");

  console.table({ summary, duration: diff + " hours" });
};
