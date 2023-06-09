const express = require("express");
const cors = require("cors");
const logger = require("./logger");
const quizes = require("./quiz.json");
const fs = require("fs");
const { readFileSync, writeFileSync } = require('fs')

// const users = require(__dirname + "/users.json");

// let users = readFileSync(__dirname + "/users.json")
// console.log(JSON.parse(users))

const app = express();
app.use(cors());
app.use(express.json());

app.use(logger);

// const userData = fs.readFileSync(__dirname + "/users.json");
let userData = readFileSync(__dirname + "/users.json");
const userString = JSON.parse(userData);

app.post("/users", async (req, res) => {
    const username = req.body.username;

    if (!username) {
         return res.status(400).send({ error: "Username is required!" });
    } else {
        const newUser = {
            username: username,
            score: {
                music: req.body.score.music || 0,
                geography: req.body.score.geography || 0,
                literature: req.body.score.literature || 0,
                history: req.body.score.history || 0,
            },
        };

        try {
          userString.push(newUser);
          console.log(userString)
          const newUserList = JSON.stringify(userString, null, 2)
          console.log(newUserList)
          writeFileSync(__dirname + "/users.json", newUserList)
          let userData = readFileSync(__dirname + "/users.json")
          console.log(JSON.parse(userData))
          return res.status(201).send(newUser);
        } catch (error) {
          console.log('An error has occured', error)
        }

        // fs.writeFile(__dirname + "/users.json", newUserList, (err) => {
        //   if (err) {
        //     console.log(err)
        //     return res.sendStatus(500)
        //   } else {
        //     console.log(newUser)
        //     return res.status(201).send(newUser);
        //   }
        // });
      }
});

app.get("/", (req, res) => {
    res.send("Topic availables are: Music, Geography, History and Literature");
});

app.get("/users", async (req, res) => {
    let users = readFileSync(__dirname + "/users.json")
    res.send(JSON.parse(users));
});

app.get("/users/:username", (req, res) => {
    let users = readFileSync(__dirname + "/users.json")
    const username = req.params.username;
    const user = users.find(
        (user) => user.username.toLowerCase() === username.toLowerCase()
    );
    if (!user) {
        res.status(404).json({ error: "User not found" });
    } else {
        res.status(200).send(user);
    }
});


app.patch("/users/:username", (req, res) => {
    const username = req.params.username;
    try {
        const user = userString.find(
            (user) => user.username.toLowerCase() === username.toLowerCase()
        );

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const { music, geography, literature, history } = req.body.score;
        user.score = { music, geography, literature, history };

        fs.writeFileSync("/users.json", JSON.stringify(userString, null, 2));
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get("/quiz/:topic", (req, res) => {
    const topic = req.params.topic.toLowerCase();

    if (topic === "random") {
        return res.send(createRandQuiz(quizes));
    }

    const questions = quizes.topics[topic];

    if (!questions) {
        res.status(404).send({ error: `The topic ${topic} is invalid` });
    }

    return res.send(questions);
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
    return topic;
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
        const oneTopic = randTopic(quizes);

        oneQandA = getQandA(oneTopic);
        // loop to get a different question to the arraylist
        if (questionArray.includes(oneQandA)) {
            while (questionArray.includes(oneQandA)) {
                oneQandA = getQandA(randTopic(quizes));
            }
        }

        questionArray.push(oneQandA);
    }
    //return an array of questions
    return questionArray;
};

module.exports = app;
