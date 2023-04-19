const express = require("express");
const cors = require("cors");
const logger = require("./logger");
const quizes = require("./quiz.json");


const app = express();
app.use(cors());
app.use(express.json());

app.use(logger);

app.get('/', (req, res) => {
  res.send('Topic availables are: Music, Geography, History and Literature');
})

app.get('/:topic', (req, res) => {
  const topic =  req.params.topic.toLowerCase()

  const questions = quizes.topics[topic]

  if (!questions) {
    res.status(404).send({ error: `The topic ${topic} is invalid` })
  }

  res.send(questions)
})

app.get("/random", (req, res) => {
  res.send(createRandQuiz(quizes));
});

//return random number from 0 to numbs
let randomGenerator = (nums) => {
  return Math.floor(Math.random() * nums);
};

//gets random question and answer for each topic IN AN ARRAY

const getQandA = (quizes) => {
  //random question from the list
  randNum = randomGenerator(quizes.length);

  question = quizes[randNum];

  return question;
};

// get random topic's values and its name
const randTopic = (quizes) => {
  //array of quiz topics
  let quizTopics = Object.keys(quizes.topics);
  let topic = "";
  let randomTopicNum = randomGenerator(quizTopics.length);

  topicName = quizTopics[randomTopicNum];
  topic = quizes.topics[quizTopics[randomTopicNum]];

  //return the list of questions in the topic and the topic name
  return [topic, topicName];
};

// creating an array of quiz
const createRandQuiz = (quizes) => {
  questionArray = [];
  //all questions from one topic
  let oneTopic = "";
  // one question from the selected topic
  let oneQandA = "";
  for (let index = 0; index < 10; index++) {
    //get 1 random topic's q and a and its name
    const [oneTopic, topicName] = randTopic(quizes);

    oneQandA = getQandA(oneTopic);
    // loop to get a different question to the arraylist
    if (questionArray.includes(oneQandA)) {
      while (questionArray.includes(oneQandA)) {
        oneQandA = getQandA(oneTopic);
      }
    }
    oneQandA = Object.assign({ topic: topicName }, oneQandA);

    questionArray.push(oneQandA);
  }
  //return an array of questions
  return questionArray;
};

module.exports = app;
