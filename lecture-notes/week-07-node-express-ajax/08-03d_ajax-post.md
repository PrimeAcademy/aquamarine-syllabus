# AJAX

[AJAX](https://www.w3schools.com/xml/ajax_intro.asp) is a methodology which allows us to communicate between the client and the server through our JavaScript code. We can request information via HTTP from the server using a **GET** request or send data to the server using a **POST** request.

### Types of Requests

Method | a.k.a. | Description
--- | --- | ---
GET | READ | Requests data. This can be tested in the browser.
POST | CREATE | Send data to the server.

We'll be adding two more request types at a later point.



### Example POST
We've already done the GET portion on our client. Now for the POST.
Let's setup a form to enter a new quote!

When we click submit, we'll make an Ajax POST request to the server, sending the new quote as data.

```JavaScript
$('#newQuoteButton').on('click', addQuote);

function addQuote() {
  // Make a POST request to the server
  $.ajax({
    method: 'POST', // Type of request
    url: '/quotes', // Route that we will match on
    // Must be an object - will be available as req.body
    data: { 
      quoteToAdd: { 
        text: 'hello', 
        author: 'me',
      }
    } 
  }).then(function(response) {
      console.log("SUCCESS!!!");
      // refresh quotes
      getQuotes();
  }).catch(function(response) {
      // notify the user
      alert('request failed');
  });
}
```

> The name `quoteToAdd` is not significant -- you can call it whatever you want, so long as it matches what the server is looking for on `req.body`!
> You should always send an object on data -- other data types sometimes have issues

This practice of calling a `POST` (or `UPDATE` or `DELETE` for that matter) and then immediately calling our `GET` request again is going to be a standard procedure for us to update our client with the data from the server. 

The `WHY` behind this will become clearer when we add our database, but essentially, having one `GET` request instead of returning data on every `POST`, `PUT`, and `DELETE` makes the server-side code much cleaner.
