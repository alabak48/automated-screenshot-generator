import websiteName from './websiteName.js';
require('dotenv').config();
const path = require('path');
const fs = require('fs');


// Google OAuth2Client

const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

// API

// npm install screenshotmachine --save

var screenshotmachine = require('screenshotmachine');

const websites = [
    new websiteName(1, "iFunded", "https://ifunded.de/en/"),
    new websiteName(2, "Property Partner", "www.propertypartner.co"),
    new websiteName(3, "Property Moose", "propertymoose.co.uk"),
    new websiteName(4, "Homegrown", "www.homegrown.co.uk"),
    new websiteName(5, "Realty Mogul", "https://www.realtymogul.com"),
];

var customerKey = process.env.API_KEY;
    secretPhrase = ''; //leave secret phrase empty, if not needed
    options = {
      //mandatory parameter
      url : 'https://planethome-invest.com/en/',
      // all next parameters are optional, see our website screenshot API guide for more details
      dimension : '1920x1080', // or "1366xfull" for full length screenshot
      format: 'jpg',
      cacheLimit: '0',
      delay: '200',
      zoom: '100'
    }

var apiUrl = screenshotmachine.generateScreenshotApiUrl(customerKey, secretPhrase, options);

// Screenshot + await function
const { dirname } = require('path');
var output = 'ID_name.jpg';
screenshotmachine.readScreenshot(apiUrl).pipe(fs.createWriteStream(output).on('close', async function() {
    console.log('Screenshot saved as ' + output);
    await uploadFile();
  }));
  
//Function that uploads file to Google Drive

const filePath = path.join(__dirname, 'ID_name.jpg')

 async function uploadFile(){
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'ID_name.jpg',
                mimeType: 'image/jpeg'
            },
            media: {
                mimeType: 'image/jpeg',
                body: fs.createReadStream(filePath)
            }
        })

        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}