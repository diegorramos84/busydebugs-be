const express = require('express');
const cors = require('cors');
const logger = require("./logger");

const users = require('./users.json');

const app = express();
app.use(cors());
app.use(express.json())

app.use(logger);


app.get('/', (req, res) => {
    res.send('hi');
})

app.get('/users' , (req , res)=>{

   res.send(users)

})

app.get('/users/:username', (req, res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.json(user);
    }
});

module.exports = app
