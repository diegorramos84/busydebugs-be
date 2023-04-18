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

app.get('/users', (req, res) => {

    res.send(users);

})

app.get('/users/:username', (req, res) => {
    const username = req.params.username;
    const user = users.find(user => user.username.toLowerCase() === username.toLowerCase());
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.status(200).send(user);
    }
});


app.post('/users', (req, res) => {
    const username = req.body.username;

    if (!username) {
        res.status(400).send({ error: "Username is required!" });
    } else {
        const newUser = {
            username: username,
            score: {
                music: req.body.score.music || 0,
                geography: req.body.score.geography || 0,
                literature: req.body.score.literature || 0,
                history: req.body.score.history || 0
            }
        };

        users.push(newUser);
        res.status(201).send(newUser);
    }

});

app.patch('/users/:username', (req, res) => {
    const username = req.params.username;
    let user = users.findIndex(user => user.username.toLowerCase() === username.toLowerCase());
    const { music, geography, literature, history } = req.body.score;
    console.log(music, geography, literature, history);

  
    if (user === -1) {
      return res.status(404).send({ error: "User not found" });
    }
  
    try {
        users[user].score.music = music;
        users[user].score.geography = geography;
        users[user].score.literature = literature;
        users[user].score.history = history;
    } catch (error) {
        res.status(400).send(error.message);
    }
    res.status(200).send(users[user]);
});

module.exports = app;
