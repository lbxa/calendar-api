import dotenv from "dotenv";
import moment from "moment";
dotenv.config();

import { getAllComingEvents, getEvents } from "./src/events.js";
import { createWindow, eventDuration } from "./src/datetime.js";
import { printc } from "./src/util.js";

// let [start, end] = createWindow(100, false, false, true);
// start = moment().format(process.env.TIME_FORMAT);
// end = moment().add(1, "week").format(process.env.TIME_FORMAT);

const twoWeeks = moment().add(2, "weeks").format(process.env.TIME_FORMAT);
const res = await getAllComingEvents(twoWeeks);
res.map((entry) => printc(entry));
