# Create-React-App and React Orientation


## Objectives

Make a CRA bootstrapped app
  - file structure, files provided
  - import/export syntax
  - components
  - JSX
  - compiling
  
  Make first component
  - render
  - extends
  

## Using the Create React App Tool

`create-react-app` is a script that we will use to create some of our react applications! (aptly named, no?)

It comes with a lot built in under the hood, some we dont need to worry about, and some we should at least be aware of!

Let's make our first react app!

`npx create-react-app@5.0 cra-orientation`

`create-react-app` is a script. Npx will run that script!

- Our project will be called `cra-orientation`
- It will create a new project, files, folders, and install react, among other libraries. 
- It will take a bit of time to run and to create your new project. There's a lot to get!

~ time passes ~

Once its ready, open in VSCode with `code cra-orientation`

## How to start

`npm start` will fire up webpack, node, and get your application running in the browser. There's a lot going on here, but the big thing to focus on is it should open up in Chrome automatically when ready.

## Folder Structure

 - `src` folder
    - this is where we'll do most of our work
    
 - `public` folder
    - this is where the index.html is, amongst other static things.

## Import/Export
Open up `App.js`

Look at the first lines. What does that look like?

Look at the last line. What does that look like?

Client | Server
import ... from | require()
export default ... | module.exports

Dont mix these. import/export is only client side.


## Hello Component
Find the text in the project that is being shown on the screen. Change it.

Questions: What happened? What did you not have to do? Did you notice anything when you finished typing in the terminal?

It restarts your client every time you change code, and refreshes the page!

## Compiling
Every time you make a change, we need to compile the code, as the stuff you are writing needs to be transformed into HTML, CSS, JS. Babel is what is making this happen. (babeljs.io) to show what compiling means. To inspect readable code, you have to access the webpack option in the browser sources.

## Build Tool
This is accomplished because, behind the scenes, we've got a build tool- This helps recombobulate our code! 
The build tool in use is Webpack. Others could be tools like Gulp, Grunt. They all are trying to make your life easier.

### Basic understanding of Webpack

React uses Webpack to copy, combine and convert our JavaScript files. We will be doing our work in the `src` folder. Webpack merges our code with the HTML in the `public` folder and produces output in the we see in the browser. Unlike jQuery, there is no **deployable** code until we run the `npm run build` command. This packages everything up for deployment and puts the files in a `build` folder.

## JSX
We need to compile because we're using JSX (JavaScript eXtenstion) which LOOKS like HTML, with some noticeable differences. 
JSX needs to compile into HTML -- even though it looks like HTML, its still in a .js file.

| JSX | HTML |
|--|--|
|className | class |
| htmlFor | for |

## Component syntax

Whats going on with our `function App (){...}` ? 
What do you think this function does?

App is our Component. It returns our JSX!

In React, everything we make is a function. It adheres to the concept of `functional programming` -- a paradigm, or a way of designing code. The main goal of functional programming is that our functions are `pure` -- meaning same input gives us same output. Progams are made by calling functions and composing others.

Our Component Functions here are what make our program. They call other Component Functions. 

## Install Dev Tools
Install the React Dev Tools Chrome extension to make debugging easier. [https://fb.me/react-devtools](https://fb.me/react-devtools)
