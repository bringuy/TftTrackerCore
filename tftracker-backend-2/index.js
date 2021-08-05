const express = require('express')
const app = express()
const cors = require('cors')

//activate environment
const dotenv = require('dotenv');
dotenv.config();

const enemyRouter = require('./routes/enemies')
const playerRouter = require('./routes/player')

const port = 3001

//middleware
app.use(cors())
app.use(express.json());


//ROUTES//
app.use("/enemies", enemyRouter)
app.use("/player", playerRouter)

app.listen(port, () => console.log(`App listening on port ${port}!`))