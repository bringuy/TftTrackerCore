const express = require("express");
const router = express.Router();
const db = require('../db');

//ROUTES- '/user' + 

router.post('/', async (req, res) => {
    try{
        const { username, resolution } = req.body
        const newUser = await db.query("INSERT INTO player (username, resolution) VALUES($1, $2)", [username, resolution])
        res.json(newUser)
    }
    catch (err){
        console.error(err.message)
    }
})


module.exports = router;