const screenshot = require('screenshot-desktop')
const fs = require('fs');

const upload = () => {
  console.log('hi')
  screenshot({ format: 'png' }).then((img) => {
    fs.writeFile("screenshot/image.png", img, function (err) {
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