require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');

// Google OAuth2Client

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
class websiteName {
    constructor(id, name, url) {
      this.id = id
      this.name = name
      this.url = url
    }
  }

const websites = [
    new websiteName(1, "iFunded", "https://ifunded.de/en/"),
    new websiteName(2, "Property Partner", "www.propertypartner.co"),
    new websiteName(3, "Property Moose", "propertymoose.co.uk"),
    new websiteName(4, "Homegrown", "www.homegrown.co.uk"),
    new websiteName(5, "Realty Mogul", "https://www.realtymogul.com"),
];


var customerKey = process.env.API_KEY;
    secretPhrase = ''; //leave secret phrase empty, if not needed
    websites.forEach(website => {
    const options = {
      //mandatory parameter
      url : website.url,
      // all next parameters are optional, see our website screenshot API guide for more details
      dimension : '1920x1080', // or "1366xfull" for full length screenshot
      format: 'jpg',
      cacheLimit: '0',
      delay: '200',
      zoom: '100'
    };


var apiUrl = screenshotmachine.generateScreenshotApiUrl(customerKey, secretPhrase, options);

// Screenshot + await function
var output = `${website.id}_${website.name}.jpg`;

screenshotmachine.readScreenshot(apiUrl).pipe(fs.createWriteStream(output).on('close', async function() {
    console.log('Screenshot saved as ' + output);
    await uploadFile(output);
  }));
});

const folderId = process.env.FOLDER_ID;

//Function that uploads file to Google Drive
 async function uploadFile(output){
    const filePath = path.join(__dirname, output)
    const fileMetadata = {
        name: output,
        parents: [folderId],
        mimeType: 'image/jpeg'
      };
    try {
        const response = await drive.files.create({
            resource: fileMetadata,
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