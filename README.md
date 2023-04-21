# Backend for Busy-De-Bugs Quiz

This is the back end of our Quiz website

## Website link

https://brain-debug.onrender.com/ - link to api

## Introduction

The link above will take you to a page with our API.\
The front page will show the list of topics we have.\

## How to use

To get access to the topic, you have to type the following statement in URL:

- https://brain-debug.onrender.com/quiz/:topic
  - "topic" will be the topic you choose to access. E.g. Geography
  - https://brain-debug.onrender.com/quiz/geography

This will tkae you to a page with a json file of all the questions/answers of the topic of choice.
Here are the links to all the topics we currently have:

- [Geography](https://brain-debug.onrender.com/quiz/geography)
- [Music](https://brain-debug.onrender.com/quiz/music)
- [Literature](https://brain-debug.onrender.com/quiz/literature)
- [History](https://brain-debug.onrender.com/quiz/history)
- [Random](https://brain-debug.onrender.com/quiz/random)

To get access to the users, you have to type the following statement in URL:

- https://brain-debug.onrender.com/users

This link will take you to a page with a json file of all the users that is stored in the API.

## known bugs/Issues

- because we have the free version, sometimes the server sleeps and will take a while to load the data

## Future Features

- more topics
- more questions
- types of users stored. e.g admin
