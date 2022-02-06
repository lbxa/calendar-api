import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const SCOPES = "https://www.googleapis.com/auth/calendar";
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

export const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);
