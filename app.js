const express = require("express");
const cors = require("cors");
const logger = require("./logger");
const quizes = require("./quiz.json");

const app = express();
app.use(cors());
app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/random", (req, res) => {
  res.send(createRandQuiz(quizes));
});

//return random number from 0 to numbs
let randomGenerator = (nums) => {
  return Math.floor(Math.random() * nums);
};

//gets random question and answer for each topic IN AN ARRAY

const getQandA = (quizes) => {
  //topic.topics.geography returns the questions
  //random question from the list
  randNum = randomGenerator(quizes.length);

  question = quizes[randNum];

  return question;
};

//get 10 random topics
// append the q and a to an array

const randTopic = (quizes) => {
  //array of quiz topics
  let quizTopics = Object.keys(quizes.topics);
  let topic = "";

  let randomTopicNum = randomGenerator(quizTopics.length);

  topic = quizes.topics[quizTopics[randomTopicNum]];

  //   console.log(quizTopics[randomTopicNum]);
  return topic;
};

// creating an array of quiz
const createRandQuiz = (quizes) => {
  questionArray = [];
  let oneTopic = "";
  let oneQandA = "";
  for (let index = 0; index < 10; index++) {
    //get 1 random topic
    oneTopic = randTopic(quizes);
    oneQandA = getQandA(oneTopic);
    if (questionArray.includes(oneQandA)) {
      while (questionArray.includes(oneQandA)) {
        oneQandA = getQandA(oneTopic);
      }
    }
    console.log(oneQandA);
    questionArray.push(oneQandA);
  }
  //questionArray returns the array of questions
  //questionArray[1] returnst the second element of the array
  //questionArray[1].answers returns the object of all the answers
  //questionsArray[1].answers[3] gets the 4th element in the object of answers
  return questionArray;
};

module.exports = app;
