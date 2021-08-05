const express = require("express");
const router = express.Router();
const db = require('../db')

async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection('./');
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  }
  quickstart();

router.get('/screenshot', (req, res) =>{
    try{
        console.log(process.env.LOCAL_URL)
        upload()
        //update enemy info here
        res.send({message:"kekw"})
    }
    catch (err){
        console.error(err.message)
    }
})


module.exports = router;