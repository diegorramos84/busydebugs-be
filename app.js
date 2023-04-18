const express = require('express');
const cors = require('cors');
const logger = require("./logger");

let quizes = require('./quiz.json')


const app = express();
app.use(cors());
app.use(express.json())

app.use(logger);


app.get('/', (req, res) => {
  res.send('Topic availables are: Music, Geography, History and Literature');
})

app.get('/:topic', (req, res) => {
  const topic =  req.params.topic.toLowerCase()

  const questions = quizes.topics[topic]

  res.send(questions)
})

module.exports = app
