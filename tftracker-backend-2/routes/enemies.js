const express = require("express");
const router = express.Router();
const db = require('../db')
const enemiesServices = require('../services/enemies_services')

router.get('/screenshot', (req, res) => {
    try {
        res.send(enemiesServices.screenshot())
    }
    catch (err) {
        console.log(err)
    }

})


module.exports = router;