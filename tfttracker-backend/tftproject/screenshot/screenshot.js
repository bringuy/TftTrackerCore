const screenshot = require('screenshot-desktop')
const fs = require('fs')

screenshot({format: 'png'}).then((img) => {
  // img: Buffer filled with jpg goodness
  fs.writeFile(`C:/Users/Brian/Desktop/TFTracker/TftTrackerCore/tfttracker-backend/tftproject/screenshot/image.png`, img, () =>
    console.log(''));
}).catch((err) => {
  // ...
})