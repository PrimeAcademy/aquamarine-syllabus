# Using jQuery

## `$(document).ready()`

Before we can do anything with jQuery, we need to call `$(document).ready()`

```js
// When the HTML document (DOM) has loaded, call the onReady function
$(document).ready(onReady);

// ❌ This won't work, because the DOM is not yet loaded into the browser!
const allTheDivs = $('div');

function onReady() {
    // jQuery code goes here!
    console.log('I am so ready 🐧');

    // ✅ Now we're ready to access elements on the DOM
    const allTheDivs = $('div');
}
```

It takes only a split-second for the browser to load up all the elements in your `index.html` file. But we need to wait until that loading is complete, before trying to access elements on the DOM.

### Event driven programming

Because we need to _wait_ for the DOM to be loaded, code may not always run in the order you expect:

```js
$(document).ready(onReady);

function onReady() {
  console.log('2. The DOM is ready! We can select elements with jQuery');
});

console.log('1. Still loading the document (DOM)... jQuery selectors will not work here!');
```

We can think of our code executing in three different phases:

1. When the page loads the script
2. When the browser has loaded the DOM
3. When a user interacts with the page (aka "events", covered later)

## Selectors

Once the DOM is loaded, we can select elements with the `$()` function. When we do this, we get back a jQuery object (one or more HTML elements).

* select by ID - `$('#some-id')`
* select by class - `$('.some-class')`
* select descendants - `$('ul li')`
* select multiple elements - `$('.mic, .check')`
* find elements within a selection - `$('#solid').find('.rock')`

**Selectors** return an **Element Object** that has properties and functions we can call. Note that selectors can select **multiple elements**, and operate on all of them at once!

## Event handlers

Applications are all about letting the user _do stuff_ with your app. Things a user might do:

- Click a button
- Type into a form field
- Press enter to submit a form
- Hover their mouse over an element
- Drag and drop elements

We call each of these user actions an **event**. We work with events in javascript via event handlers:

```js
function onReady() {
    // When the user clicks on <button id="funBtn">
    // call the doFunThings function
    $('#funBtn').on('click', doFunThings);

    // 👆 We call this "registering an event handler"
}

// This function is called an "event handler"
// It's called when you click the <button id="funBtn">
function doFunThings() {
    console.log(`I've been clicked 💥`);
}
```

### What is `$(this)`?

Remember that jQuery can work with multiple events at a time. If we register `click` event handlers for multiple elements, how do know which one was actually clicked?

```html
<ul>
    <li>
        Thing 1
        <button class=".deleteMe">Delete this thing</button>
    </li>
    <li>
        Thing 2
        <button class=".deleteMe">Delete this thing</button>
    </li>
    <li>
        Thing 3
        <button class=".deleteMe">Delete this thing</button>
    </li>
</ul>
```

```js
function onReady() {
    // Handle click events for *all* the <button class=".deleteMe"> elements
    $('.deleteMe').on('click', onDelete);
}

function onDelete() {
    // Which button did we click?!
    // We clicked $(this) one!
    console.log('$(this) is', $(this));

    // Now we can do stuff with that button:
    $(this).css('outline', '3px solid red');

    // Or, remove the parent <li> element from the DOM
    $(this).parent().remove();
}
```

## jQuery Tricks

jQuery can do lots of things! We don't have time to teach them all to you: **you will need to do your own research to complete some assignments!** But here are a few:


### DOM Traversal

Once we select an element, we can navigate to other elements in the DOM tree.

* navigate to parent element - `$('.some-child').parent()`
* get the first-level children of an element - `$('ul').children()`
* find all matching elements, instead of an element - `$('table').find('td:first-child')`

### DOM Manipulation

Once we select an element, we can change how that element appears on the DOM.

```js
// change an element's text color
$('#once-blue').css('color', 'blue');

// disable a form field 
$('#nameInput').prop('disabled', true);

// set the text of a form field
$('#nameInput').val('Primey McPrimester');
```



### Getters and Setters

Some manipulation methods that allow us to **set** (i.e. change or update) properties for jQuery objects, can also be used to **get** the current properties of that object.

```JavaScript
$('#an-element').text('Hello World!'); // Setter: sets the text in the element to Hello World!

let elementText = $('#an-element').text(); // Getter: returns the value "Hello World!"

let inputValue = $('#an-input').val(); // Getter: returns the value of the input field

$('#an-input').val(''); // Setter: clears input text (sets the value to empty)
```

### Manipulating CSS Classes

When we call `.css()`, it changes the `style=` attribute on an element:

```js
$('#someDiv').css('color', 'red');
```

```html
<div style="color: red">
```

It's often better to rely on existing CSS styles, instead of changing element styles directly:

```js
$('#someDiv').addClass('errorMessage');
```

```html
<div class="errorMessage">
```

```css
.errorMessage {
    color: red;
}
```

This keeps your styling separate from your application logic, making your code easier to read and maintain.

----

You can also remove classes with jQuery:

```js
$('#someDiv').removeClass('errorMessage');
```

Or "toggle" classes (switch back and forth):

```js
$('#someDiv').toggleClass('errorMessage');
```


### Appending/Removing from DOM

- `.append()`
- `.remove()`
- `.empty()`

```js
function onSubmit() {
    // Get the value from a form field
    let name = $('#nameInput').val();
    let cohort = $('#cohortInput').val();

    // You can append whole blocks of HTML to the DOM!
    // Template strings make this much easier
    $('table').append(`
        <!-- Keep that HTML nicely formatted! -->
        <tr>
            <td>${name}</td>
            <td>${cohort}</td>
            <td>
                <label>
                    <input type="checkbox" />
                    Knows jQuery
                </label>
            </td>
        </tr>
    `);
}
