# Week 12 Overview

This week broadens SQL knowledge by adding in multiple tables and 1 to many and many to many joins. It also builds upon React-Redux by introducing Redux-Sagas for side-effects (async) management.

## Solo Project Set-up
This week each student needs to establish some ideas for their projects.

[See details here](./12-00_solo-project-activities.md)


## Week Objectives

- SQL
    - multiple tables
        - Primary/Foreign key references
    - 1 to many JOIN syntax
    - Many to many JOIN syntax
    - Use of aggregates, GROUP BY clause
    - Understand basic ERDs
- Sagas
    - understanding of JS Generator Functions
        - `yield` keyword and general flow as it pertains to practically using Sagas
    - usage of redux-sagas to manage asynchronous code flow within Redux architecture
    - `put` keyword to dispatch actions
    - `try/catch` blocks to handle happy/non-happy paths
- 3rd party Application Programming Interfaces (APIs)
    - making HTTP request with axios from the server
    - safely storing API credentials using `dot-env` in Node
- Preliminary solo project ideation and 1 on 1 with Instructors


### Vocabulary/Key Terms

- Normalization (data)
- Relational (DB)
- Entity Relationship Diagram (ERD)
- Application Programming Interface (API)
    - Web API
- Environment variable
- API Key
- Querystring (vs URL)
- Side Effect
- Recursion
- Model-View-Controller (MVC pattern)


## 1 on 1 Topics

[See Here](./12-00_solo-project-activities.md)


## Tech Culture Topic: Perspectives on Diversity II

These discussions are managed by the Student Life team. An assignment in the Portal will be assigned out Monday of this week.

[Discussion Guides](https://docs.google.com/document/d/16KGlg52cF0-cH3IdvGeDk2Gr3zLKhgHIB847h0oOfaM/edit)


## Speech Topics

Solo project pitch. [See Here](./12-00_solo-project-activities.md)


## Assignment Links

### Monday

### After SQL one to many
- [SQL Joins (1-m) - Population](https://github.com/PrimeAcademy/sql-join-1-m-challenge)
    - Added new assignment for 1-m lecture notes 3.13
    - List of questions about 1-m. They should use Postico to test their SQL and copy their final answer into the assignment.sql file.
- [SQL Joins Orders Peer Challenge (m-m)](https://github.com/PrimeAcademy/sql-join-challenge)
    - In this challenge, we’re going to practice performing SQL queries with multiple tables. This should help better solidify some concepts that were covered during lecture.

### After API Intro
- [Giphy API Project](https://github.com/PrimeAcademy/giphy-api-activity)
    - updated for 4.6.2 Hooks
    - For this project, the goal is to display a random image from Giphy along with a button that allows the user to see a new random image.
- [API Exploration Activity](https://github.com/PrimeAcademy/api-exploration)
    - Allow several nights for this as it's in addition to the above
    - Find a third party API, try it out, and share with your cohort
    - Practice research and reading external documentation. May give students ideas for solo projects

### Monday/Tuesday Homework
- Tied to an intro/lecture?
- [Solo Project Ideation](https://github.com/PrimeAcademy/solo-project-ideation)
    - asks students to submit up to 3 ideas for solo projects, short summaries/one liners
    - sets up 1 on 1s for this week
    - leads to speech topic

### After Generator Function Intro
- [Generator Function Practice](https://github.com/PrimeAcademy/generator-function-challenge)
    - Added new activity for generator functions 3.13
    - Modify the challenges.js file. Only add code where you see a //YOUR CODE HERE comment block. Test your code by running node challenges.js in terminal.

### After Saga Intro
- [Saga Fruit Basket](https://github.com/PrimeAcademy/saga-fruit-basket-activity)
    - updated for 4.6.2 Hooks
    - solo practice in class
    - Convert a working fullstack react app to use sagas
    - Setup Sagas in the index.js, Create a Saga that GETs fruit from the server, updating other code to dispatch actions to sagas. STRETCH - create saga for delete
- [Redux Saga Garden](https://github.com/PrimeAcademy/redux-saga-garden)
    - solo practice/homework
    - updated for 4.6.2 Hooks
    - Fully set-up redux logger, redux-sagas, students implement sagas to make an API request. C-R-D - gets an array of the garden items, create new items, delete. Serverside routes are already written.

### Group Project
- [Giphy Search Group Project](https://github.com/PrimeAcademy/group-giphy-saga-project)
    - [Solution Repo](https://github.com/PrimeAcademy/group-giphy-saga-project-solve) 
    - Main Group project for the week
    - updated for 4.6.2 Hooks
    - In this project the students will be building a Giphy searching and favoriting application which allows the user to save images and sort them into categories. They will need to create a DB and two views - Search View and Favorites View
    - Tech: React, Redux, Sagas and integrate them with a 3rd party API


## Solo Scoping Process
[Full Solo Scoping Process Description](/curriculum-content/supporting-documentation/solo-scoping-process.md)

## Challenges
- [Weekend Challenge Part 1: Movie Saga with Create and Junction Table](https://github.com/PrimeAcademy/weekend-movie-sagas)
    - updated for 6.3, move add form to stretch
    - updated for 5.1 to break SQL into its own assignment
- [Weekend Challenge Part 2: SQL JOIN Practice](https://github.com/PrimeAcademy/weekend-movies-sql-practice)
    - updated for 6.3 to add diagram (non graded). See assignment for directions.
        - expectations are low fidelity, non-digital
    - updated for 5.1 to break SQL into its own assignment
- [Code Challenge: JOIN and SAGA](https://github.com/PrimeAcademy/code-challenge-6-sagas)
    - updated for 4.6.2 Hooks


## Grading Rubrics
- Weekend Challenge Rubric [Movie List](/rubrics/weekend12-saga-movies.md)
- Weekend SQL Challenges [SQL Practice](/rubrics/weekend12-sql-challenge.md)
- Code Challenge Rubric [Redux-Saga Zookeeper](/rubrics/challenge-12-sagas.md)


## Activities
- [Heatmap](../classroom-activities/heatmap.md)
- [Physical Fullstack](../classroom-activities/physical-fullstack.md)
