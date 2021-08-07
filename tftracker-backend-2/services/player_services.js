const db = require('../db')

const loadUser = async (req) => {
    const { username, resolution } = req.body
    const newUser = await db.query("INSERT INTO player (username, resolution) VALUES($1, $2)", [username, resolution])
    return newUser
}


module.exports = { loadUser }