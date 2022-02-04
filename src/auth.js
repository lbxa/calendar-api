const { google } = require("googleapis");

const SCOPES = "https://www.googleapis.com/auth/calendar";
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

module.exports = { auth };
