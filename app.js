const express = require('express');
const cors = require('cors');
const logger = require("./logger");

const app = express();
app.use(cors());
app.use(express.json())

app.use(logger);


app.get('/', (req, res) => {
    res.send('hi');
})



module.exports = app
