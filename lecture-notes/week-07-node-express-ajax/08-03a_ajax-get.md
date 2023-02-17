# AJAX

[AJAX](https://www.w3schools.com/xml/ajax_intro.asp) is a methodology which allows us to communicate between the client and the server through our JavaScript code. We can request information via HTTP from the server using a **GET** request or send data to the server using a **POST** request.

### Types of Requests

Method | a.k.a. | Description
--- | --- | ---
GET | READ | Requests data. This can be tested in the browser.
POST | CREATE | Send data to the server.

We'll be adding two more request types at a later point.


## Client setup

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Quotes</title>
  <script src="jquery.min.js"></script>
  <script src="client.js"></script>
</head>
<body>
  <h1>Quotes!</h1>
  <ul id="output"></ul>
</body>
</html>
```
**client.js**
```JavaScript
$(document).ready(onReady);

function onReady() {
  getQuotes();

}

function getQuotes() {
  // Get quotes from server - AJAX!
}
```

## Ajax with jQuery

We can call routes from the client side with AJAX!

jQuery has a method called `$.ajax()` (http://api.jquery.com/jquery.ajax/) which makes creating and controlling these requests easier. Remember, we can make these requests with vanilla JavaScript (see [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)). jQuery just makes it easier. 

### Example GET
Let's get our quote of the moment from the server:

```JavaScript
$.ajax({
    method: 'GET',
    url: '/quotes',
  }).then(function(response) {
      console.log("SUCCESS!!!", response);
      // TODO - append quotes to the dom
  }).catch(function(response) {
      // notify the user
      alert('Request failed. Try again later.');
    }
  );
```

The response has our quote in it... Let's render it to the DOM.

```JavaScript
function getQuotes() {
  $.ajax({
    method: 'GET',
    url: '/quotes',
  }).then(function(response) {
      console.log("SUCCESS!!!");
      // append quotes to the dom
      renderToDOM(response);
  }).catch(function(response) {
      // notify the user
      alert('Request failed. Try again later.');
    }
  );
}

function renderToDOM(quotes) {
  $('#output').empty();

  for (let quote of quotes) {
    $('#output').append(`
      <li>
        ${quote.text} by <i>${quote.author}</i>
      </li>
    `);
  }
}
```