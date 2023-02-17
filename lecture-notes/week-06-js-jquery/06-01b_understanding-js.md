# How does code even work?

**Goals**

- Be able to visualize how a computer executes code, line-by-line
- Understand how loops, functions, and conditionals effect code execution
- Understand the role of different data structure and types
- Build vocabulary to talk about code with your peers


## Variables: Computers Never Forget


A lot of what the computer is doing is remembering stuff for later:

```js
// Better not forget that!
let myAnniversary = 'June 16, 2011';
```

This bit of code has two parts:
- **Declaring** a variable
- **Assigning** a value to the variable

We can break this up:

```js
// Declare the variable
// "Hear ye, hear ye, for now and henceforward, 
//  there shall be a variable known in this kingdom as myAnniversary"
let myAnniversary;

// Assign a value of "June 16, 2011" to the variable
// The value is the actual *data* we want the computer to remember
myAnniversary = 'June 16, 2011'
```

**Metaphor:** A variables is like a box that we keep in storage. 

- The **variable name** is the **label** on the box,
- The **value** is what's **inside** the box. 
 
We can put whatever label we want on the box, but the _content_ is what really really matters. The label is just to help _us_ remember what's inside. 

So here we take that string -- `"June 16, 2011"` -- and put it inside the box. That's the **value**. Then we slap a label on the box, `myAnniversary`, to remember it later.

## Expressions: Computers Computing

Just storing values isn't that interesting. The fun part comes when we _do stuff_ with that data. eg, performing calculations to figure out what a value should be:

```js
// As long as the computer remembers what `month`, `date`, and `year` are
// it can figure the value of `myAnniversary` for us
let myAnniversary = month + date + year;
```

**Metaphor:** 

- We went back and found three boxes we packed earlier, with _labels_ of "month", "date", and "year". 
- We take out what's _inside_ those boxes (strings), and smoosh them together into a new string
- We take that new string, into a new box, labeled "myAnniversary"

This code is more flexible, as it can create an anniversary date out of _any_ `month`, `date`, or `year`, as opposed to **"hard-coding"** the value to one specific string.

Any code that asks the computer to do some work to get a value is called an **expression**. 

```js
//                  👇 this is an expression!
let myAnniversary = month + date + year;
```

We'll talk about computers **evaluating expressions**, meaning they're doing the work behind the scenes and figuring a new value:

```js
let mph = 60;
let distanceToTheMoon = 230940;

// When we run this code, the computer *evaluates* the expression
// (ie, it does the math, and comes up with a new value)
// 
// We can better understand our code if we imagine 
// the computer running the code,
// and thinking through what the new value will be:
let hoursToDriveToTheMoon = distanceToTheMoon / mph;

//  hoursToDriveToTheMoon = 230940            / 60;  // get the values from the variables
//  hoursToDriveToTheMoon = 3849;                    // Evaluate the expression 
```

The results of an expressions are often assigned to variables, so we can remember the results for later. But expressions can be used in other ways too:

```js
   if (hoursToDriveToTheMoon > 3) {
// if (230940 > 3) {       // Conditional expression. Evaulates to a boolean!
// if (true) {
      console.log("Long drive! Better download some podcasts.");
  }
```

Here, `hoursToDriveToTheMoon > 3` is an _expression_ that _evaluates_ to `true` or `false` (a boolean).


Anywhere we can use a _value_, we can also use an _expression_:

```js
// Bring a couple space suits, in case we want to go for a walk
// (passing two values as arguments: a string and a number)
packBag('space suit', 2);

// Always bring an extra pair!
// (passing a string and an expression as arguments)
packBag('underwear', hoursToDriveToTheMoon / 24 + 1);
```

Here, we are _evaluating_ `hoursToDriveToTheMoon / 24 + 1` to get a number, and then passing that number as an argument to the `packBag()` function

---

**Practice:** When you're writing and troubleshooting code, pretend you are the computer, and evaluate each line of code as you go:

```js
let distanceToDuluth = 150;
let hoursToDriveToDuluth = distanceToDuluth / mph;
// Let evaluate in our head! 
// Figure out the variable values, then do the calculation
//  hoursToDriveToDuluth = 150 / 60;
//  hoursToDriveToDuluth = 2.5

if (hoursToDriveToDuluth < hoursToDriveToTheMoon) {
// if (2.5 < 230940) {
// if (true) {
    console.log("Maybe let's take a weekend up north instead");
}
```

## Control Flow: Think like a the computer, be the computer

When we run a JS file in the browser, we're giving our computer a set of instructions to follow. The computer will run through our code line-by-line, and do each thing we tell it to, in order:

```js
// Step 1: Remember the number 5! We'll call it `weekNumber`
let weekNumber = 5;

// Step 2: Take that thing we called `weekNumber`, and add 1 to it.
//         take the result of that, and remember it now as `weekNumber`
weekNumber = weekNumber + 1;

// Step 3: Take the string "Week " and whatever `weekNumber` is, and combine them.
//         Take the result of that, and remember it as `weekName`           
let weekName = 'Week ' + weekNumber;

// Step 4: Take the string "Welcome to", and whatever `weekNumber` is
//         and display them both in the console.
console.log('Welcome to', weekName);
```

The default mode code is running one line after another. But we have some tools in javascript to make the computer **repeat certain lines of code:**

```js
// Step 1: Remember these piggies
let piggies = ['market', 'home', 'roast beef', 'none', '🤣🤣🤣🏠'];

// Repeat this block of code,
// once for every value in the `piggies` array
for (let piggy of piggies) {
    // Step 2: assign piggy "market", then log this string
    // Step 3: assign piggy to "home", then log this string
    // Step 4: assign piggy to "roast beef", then log this string
    // Step 5: assign piggy to "none", then log this string
    // Step 6: assign piggy to "🤣🤣🤣🏠", then log this string
    console.log('this little piggy when to ' + piggy);
}

// Step 7: Log "buh-bye piggies"
console.log('buh-bye piggies');
```

...or **skip certain lines of code**:

```js
// Step 1: Remember these piggies
let piggies = ['market', 'home', 'roast beef', 'none', '🤣🤣🤣🏠'];

// Step 2: Figure out how many piggies there are
if (piggies.length > 5) {
    // (the computer skips this line of code!)
    console.log("ERROR: Too many piggies!");
}
```


...or **jump to another part of your file, then come back**:

```js
// The code in this function doesn't run yet!
// We're just setting it up for later
function protectHome(home)  {
    // Step 3: how confident are we in our building materials?
    if (home === 'brick') {
        // (skip this step! home is not "brick") 
        return '🐷 Not by the hair of my chinny chin chin!';
    }
    else {
        // Step 4: return a string: "🐷 🤐"
        return '🐷 🤐'
    }
    
}

// Step 1: log "Let me in, let me in"
console.log('🦊 Let me in, let me in!');
// Step 2: Call the protectHome function
let pigsResponse = protectHome('straw'); 
// 👆 Step 5: pigsResponse is assigned to the return value: "🐷 🤐"

// Step 6: log the pig's response:
console.log(pigsResponse);
```

As your writing and debugging code, try to imagine what order the code is run in. 


## Talking about code

When you're learning to code, you are in fact learning a new **language**. In a way, Prime is a language immersion school: we talk in _code_ all day. Sometimes this is actually reading and writing javascript code, other times it's talking _about_ code in a technical way that other humans may not understand.

So imagine yourself back in that first Foreign Language 101 class in high school. You did you best to communicate, but you made _a lot_ of mistakes. That's ok here too! You're only going to learn by trying, making mistakes, and trying again.

And keep an eye out for that sneaky **impostor syndrome**: using the wrong word to describe a thing does not make you less of a "real programmer". The key thing is speaking in a language that your colleagues understand.

-----

Let's try talking through some code, so we can get used to the terminology.

_Instructor note:_ put this code up on the screen (without comments), or write it out on a whiteboard. Then follow the comments to talk through the code out loud, emphasizing some of the technical terminology we use to describe code.


**Without comments:**

```js
function isWordSilly(aWord) {
  let sillyWords = ['squeegee', 'barnacle', 'barbecue', 'quagmire', 'bog', 'loofah'];

  for (let oneSillyWord of sillyWords){
    if (oneSillyWord === aWord) {
      return true;
    }
  }
  
  return false;
} 
```

**With comments:**

```js
// Declare a function called "isWordSilly"
// This function takes a single argument named "aWord"
// and returns a boolean
function isWordSilly(aWord) {
 
  // Declare a variable named sillyWords
  // Assign the variable to an array of strings
  let sillyWords = ['squeegee', 'barnacle', 'barbecue', 'quagmire', 'bog', 'loofah'];

  // Loop (or "iterate") through the sillyWords array
  // assigning each string in the array
  // to the "oneSillyWord" variable
  for (let oneSillyWord of sillyWords){
    // Compare oneSillyWord to aWord to see if 
    // they are equal. This comparison is an expression
    // that resolves to a boolean
    if (oneSillyWord === aWord) {
      // If this comparison resolves to true, return true
      // This terminates execution of the function
      // (ie, the function stops here!)
      return true;
    }
  }
  
  // After we are done looping, return false
  return false;
} 
```

## Assignment

Practice reading, understanding, and talking about code with [What Is This Even Doing?](https://github.com/PrimeAcademy/what-is-this-even-doing)