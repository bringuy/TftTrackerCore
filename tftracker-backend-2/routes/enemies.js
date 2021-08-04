const express = require("express");
const router = express.Router();
const db = require('../db')
const upload = require('../screenshot/upload')


router.get('/screenshot', (req, res) =>{
    try{
        upload()
        //update enemy info here
        res.send({message:"kekw"})
    }
    catch (err){
        console.error(err.message)
    }
})


module.exports = router;