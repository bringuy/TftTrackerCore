const dotenv = require('dotenv');
dotenv.config({path: "../.env"});

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

const analyzeImage = () => {

    // Creates a client
    const client = new vision.ImageAnnotatorClient({ keyFileName: "ServiceAccountToken.json" });

    // Performs label detection on the image file
    client.textDetection("screenshot/image.jpg")
    .then((results) => {
        const result = results[0].textAnnotations;
        console.log(`Text Annotations Result: ${JSON.stringify(result, null, 2)}`);
    })
}

module.exports = analyzeImage;