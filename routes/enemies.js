const express = require("express");
const router = express.Router();
const db = require('../db')


router.get('/', (req, res) => res.json({ message: 'Hello World' }))


module.exports = router;