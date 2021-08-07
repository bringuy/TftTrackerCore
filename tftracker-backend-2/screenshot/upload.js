const screenshot = require('screenshot-desktop')
const fs = require('fs');

const upload = () => {
  screenshot().then((img) => {
    fs.writeFile("screenshot/image.jpg", img, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
      return;
    });

  }).catch((err) => {
    console.log(err)
  })
  return;
}

module.exports = upload;