# Node Introduction

## Intro to Node

* What is Node?
* How we will use Node
* Modules

### What is Node?

Node.js is a JavaScript runtime environment (i.e. a running program) built on Chrome's V8 JavaScript
engine (i.e. a program or library that executes JavaScript code).

[Read more at the Node website.](https://nodejs.org/en/)

### How we will use Node

We will use Node to handle HTTP requests. We'll accept requests, do some logic, and return an HTTP response to our client (e.g. the browser).


### Example

Create a new folder and add a file named `intro.js`. Add some JavaScript code to the file. Log something to the console. Keep in mind that we do not have a DOM on the server!

Run the file by typing the following into terminal:

```
node intro.js
```

### What's NOT in Node?

We do not have a DOM in Node. This means that jQuery will not work in our server side code. We will still continue to use jQuery in code that we run on the client.

## Node Modules

On the server, we don't have a DOM. That means we don't have an index.html to use for sourcing multiple JS files. 

Node modules are a way for us to break out code out into multiple files. It allows us to organize our code and utilize third party libraries. Without modules, our code would quickly become unmanageable (hundreds or thousands of lines of code in a single file). When you have more than ~200 lines of code in a single file, consider breaking it down into modules.

Many languages have the ability to connect multiple source files together for better organization. Modules is how we do this with Node.

**index.js**

```JavaScript
// Assign whatever is exported in the module to a variable named arrayOfPeople
let arrayOfPeople = require('./people.js');

console.log(arrayOfPeople); // logs out ['Ally', 'Chris', 'Dane'];
```

**people.js**

```JavaScript
let people = ['Ally', 'Chris', 'Dane'];

// export is similar to a function return, it's what is returned from the module.
module.exports = people;
```

### What can I import/export?

You can import lots of things! Each file only gets ONE export. Not everything in the file needs to be exported, though!

For example you can declare variables in a module, use them, but not export them.

```js

const SECRET_CODE = 123;

function generateNewSecret(numberIn) {
  return SECRET_CODE * numberIn;
}

module.exports = generateNewSecret;
```

`SECRET_CODE` is not exported, only the function is. Whatever imports it only knows about the function, not the value of the code!

NOTE:
If you forget to use `module.exports` your code will behave oddly and probably error. The default is an empty object `{}`, so you'll likely get errors around that. Feel free to console log what you import!

`let codeGenerator = require('./modules/secret.js')`
`console.log(codeGenerator) // hoping for a function, not an object.


### Objects

You can also export an object, which itself can contain multiple keys/values.

```js

let pet = {
  type: 'dog',
  age: 4,
  breed = 'collie'
}

module.exports = pet;
```
