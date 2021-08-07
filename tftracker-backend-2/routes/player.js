const express = require("express");
const router = express.Router();
const db = require('../db');
const playerServices = require('../services/player_services')

//ROUTES- '/user' + 

router.post('/', async (req, res) => {
    try {
        res.json(playerServices.loadUser(req))
    }
    catch (err) {
        console.error(err.message)
    }
})


module.exports = router;