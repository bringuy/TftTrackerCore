const express = require("express");
const router = express.Router();
const db = require('../db')
const upload = require('../screenshot/upload')
const analyzeImage = require('../screenshot/analyzeImage')

router.get('/screenshot', (req, res) => {
    try {
        upload()
        analyzeImage();
        //update enemy info here
        res.send({ message: "kekw" })
    }
    catch (err) {
        console.log(err)
    }

})


module.exports = router;