# Week 10 Overview

This weeks transitions students from building jQuery client side applications to using React for the same purpose.

## Week Objectives

- Understand and demonstrate usage of `create-react-app` as a starting point for React-based applications
- Destructuring objects
- Arrow functions
- Understand high level concept of transpiling JSX into HTML/CSS
    - Webpack import/export
    - introducing a "build process" to our workflow
- Understand and demonstrate usage of React Components
    - Functions returning JSX, to render to the DOM
    - JSX vs HTML
    - Basic styling/CSS in React
- Demonstrate the ability to apply logic to rendering using conditional rendering techniques
- Be able to utilize common App -> List -> Item Component architecture
- Demonstrate getting an array of data onto the DOM using React components
    - using `.map()` array method
- Demonstrate usage of controlled inputs within forms in React
- Demonstrate the usage of local state in a React Functional Component
    - using `useState()`
    - using `useEffect()`
- Demonstrate passing data and methods between Components using `props`
- Demonstrate usage of Axios HTTP library to make HTTP Requests from React

### Deploy Heroku + DB

If students have not done so already, [deploy a full stack app to Heroku with a Postgres database](../week-09-bridge-week/09-01_heroku.md)

### Vocabulary/Key Terms

- Build Tool
- Functional Programming
- Transpile
- Compile
- Lifecycle
- Props
- Conditional Rendering
- State
- Component
- Instance
- Proxy


## 1 on 1 Topics

The goal of this 1 on 1 is to check in on technical understanding, stress levels. This is React week and is technically a huge shift for most students. Avoid re-teaching React content in the 1 on 1.

If the student is struggling academically (lots of 1s), you'll likely talk about that.

- How's React feeling so far?
- How are the group projects going?
- Have you been to a meetup?
- How's your LinkedIn profile?

## Tech Culture

- [Cohort Norms](https://github.com/PrimeAcademy/tech-culture-classroom-norms)
- Discussion Guide
    - Process (optional, could be done differently)
        1. Ask students for norms they have observed and would like to see (write them on the whiteboard)
        2. After collecting ~20 and asking if others have more to add, start voting.
            - Read all, allow voting for as many as they would like
            - Remove all below a certain threshold
            - Repeat until ~10 norms are left
        3. Find a volunteer to create the norms board. The norms can be displayed in any format the cohort deems appropriate (a list, a random smattering, a long-form poem, a JavaScript object, etc.)

## Speech Topiscs

Taking a look back at how far the cohort has come.

Recommended topics:
> If you could give yourself some advice before starting Prime, what would it be?

or
> Tell us about a time you overcame a challenge/accomplished something

or
> Growth (open-ended, talk about change)

[Additional Speech Topic Options](/curriculum-content/speech-topics.md)

## Assignment Links

### CRA Orientation, Components

- [Rocket React Rascal](https://github.com/PrimeAcademy/rocket-react-rascal)
    - updated for v4.6 Hooks
    - In-class, solo
    - React components bug hunt to practice importing, exporting, and render
    - Monday, after [React Intro](10-01b_react-intro-components.md) Lecture (or video)


### Local State

- [React Rock Pickers](https://github.com/PrimeAcademy/react-rock-pickers)
    - updated for v4.6 Hooks
    - In-class, solo/peer
    - Practice component reuse where each component has local state
    - Monday, after [React Interaction & State](10-01c_react-innteraction-state.md) Lecture

- [React Track Runner](https://github.com/PrimeAcademy/react-track-runner)
    - updated for v4.6 Hooks
    - In-class, solo/peer
    - React local state practice (single input base, multiple input stretch)
    - Tuesday, after [React Inputs & Change](10-02b_react-inputs-change.md) Lecture


### Forms, Lists, and Axios

- [Famous People List](https://github.com/PrimeAcademy/react-famous-people-list)
    - updated for v4.6 Hooks
    - In-class, solo/peer
    - React list practice with `.map` , GET POST
    - Tuesday, after Both [Lists](10-02b_react-lists.md) and [HTTP](10-02c_react-server-client.md)

### Using Props to Modularize a Full-Stack App w/ EntityList, EntityItem, AddEntityForm

- [Prim Proper Props](https://github.com/PrimeAcademy/prim-proper-props)
    - In-class, solo
    - Extracting pieces of working application (App.jsx) to components
    - Wednesday, after [Props](10-03a_react-props.md) Lecture

- [React GitHub Student List](https://github.com/PrimeAcademy/react-student-list)
    - updated for v4.6 Hooks
    - Homework/In-class, best in pairs
    - Reinforcing all of the content from the week
    - Conditional Rendering (stretch)
    - Lots of stretch goals, including Github API request
    - Thursday or Friday, after all lectures (will take a few hours)

### Conditional Render
    - No Assignment
    - Practiced in Weekend Challenge

### Group Project
- [Shopping List](https://github.com/PrimeAcademy/group-fs-react-shopping-list)
    - Full Stack, Full Crud
    - Conditional Rendering
    - Added new for v4.6 Hooks

## Challenges

- Weekend Challenge: [Gallery](https://github.com/PrimeAcademy/weekend-react-gallery)
    - **NOTE Requires Conditional Rendering**
    - updated for v6.5 changed uppy to multer stretch goals
    - updated for v4.6 Hooks
- Code Challenge: [Month List](https://github.com/PrimeAcademy/code-challenge-4)
    - updated for v4.6 Hooks

## Grading Rubrics

- Weekend Challenge Rubric [Gallery](/rubrics/weekend-10-react-gallery)
    - updated for v4.6 Hooks
- Code Challenge Rubric [React Month List](/rubrics/challenge-10-react.md)
    - updated for v4.6 Hooks

## Activities

- [Physical Fullstack](../classroom-activities/physical-fullstack.md)
