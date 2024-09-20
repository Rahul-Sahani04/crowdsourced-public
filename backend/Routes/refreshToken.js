const { google } = require("googleapis");
const readline = require("readline");
const fs = require("fs");

// Load environment variables
require("dotenv").config();

// OAuth2 client setup
const CLIENT_ID = "104866807253-le79im2l7j7v2pe7qsm2k17ag1gce6pl.apps.googleusercontent.com";
console.log(CLIENT_ID);
const CLIENT_SECRET = "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";
console.log(CLIENT_SECRET);
const REDIRECT_URI = "http://localhost:4000"
console.log(REDIRECT_URI);
const SCOPES = ["https://www.googleapis.com/auth/drive",
"https://www.googleapis.com/auth/drive.file",
"https://www.googleapis.com/auth/drive.readonly",
"https://www.googleapis.com/auth/forms.body",
"https://www.googleapis.com/auth/forms.body.readonly",
"https://www.googleapis.com/auth/forms.responses.readonly",
"https://www.googleapis.com/auth/script.external_request"];

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Generate consent URL
// Generate consent URL with prompt for consent
const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  prompt: "consent",
});

console.log("Authorize this app by visiting this URL:", authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the code from the authorization page:", async (code) => {
  rl.close();

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log("Refresh token:", tokens.refresh_token);
    fs.writeFileSync(
      "refresh_token.json",
      JSON.stringify(tokens.refresh_token)
    );
  } catch (error) {
    console.error("Error retrieving refresh token:", error);
  }
});