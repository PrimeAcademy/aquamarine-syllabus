# More PG

## Review
What is PG?

 - [PG](https://www.npmjs.com/package/pg) is a node module that allows us to communicate with PostgreSQL
 - Provides a pool of shared connections to the database 

What does CRUD stand for?

 - Create
 - Read
 - Update
 - Delete

How do these relate to SQL queries? 
 - Create: INSERT statement and POST request 
 - Read: SELECT statement and GET request
 - Update: UPDATE statement and PUT request 
 - Delete: DELETE statement and DELETE request
 
How do these relate to HTTP requests (express routes)?
 - Create: POST request 
 - Read: GET request
 - Update: PUT request (new, not covered yet)
 - Delete: DELETE request (new, not covered yet)

If we have a 404 error, what does this mean & where should we look to fix it?
 - Requested URL is not found 
 - Fix in one of two places: 
   1) client ajax request URL
   2) server route URLs (there isn't one to match request)

If we have a 500 error, what does this mean & where should we look to find more information and fix it?
 - Internal server error
 - The error is on the server side, so look at the server console (Terminal - not the browser) for more information
 - The fix will be in the server code, so the server.js or a file that it requires
 - Look for a specific error or line number in the error message


## Express Routes

Method | Purpose | Example | Query
--- | --- | --- | ---
GET | Retrieve a resource | *GET /students* would likely return a list of students | SELECT
GET | Retrieve a specific resource | *GET /students/7* would likely return a student with an id of 7 | SELECT WHERE
POST | Create a new resource | *POST /students* would create a new student | INSERT INTO
PUT | Update an existing resource | *PUT /students/4* would update a student with an id of 4 | UPDATE WHERE
DELETE | Delete a resource | *DELETE /students/10* would delete student with an id of 10 | DELETE WHERE

Previously our GET request just brought everything back from our database:

**server.js**
```JavaScript
app.get('/songs', (req, res)=> {
  // When you fetch all things in these GET routes, strongly encourage ORDER BY
  // so that things always come back in a consistent order 
  const sqlText = `SELECT * FROM songs ORDER BY published, artist, track DESC;`;
  pool.query(sqlText)
    .then( (result) => {
      console.log(`Got stuff back from the database`, result);
      res.send(result.rows);
    })
    .catch( (error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500); // Good server always responds
    })
})
```

We may not always want to get all of the data.  When there is a HUGE amount of data, this just isn't practical. We need to limit our results. In SQL we do this with WHERE.

In order to do this through express, we need a way to get the additional data needed to put into the WHERE statement. This is done by using route parameters.

### Route Parameters
In Express, [route parameters](http://expressjs.com/en/guide/routing.html#route-parameters) allow us to get additional data on the request URL.  Instead of a fixed value, this part of the URL can be variable. (It can change!) 

We can use route parameters to get additional information needed to handle the request. 

For example, if we only want to get one joke from our database, we might use a route parameter to send the joke id. We can then add that into our SQL SELECT to get back only that specific joke.

```JavaScript
app.get('/songs/:id', (req, res) => {
  const idToGet = req.params.id;
  const sqlText = `SELECT * FROM songs WHERE id=$1`;
  pool.query(sqlText, [idToGet])
  .then( (result) => {
    console.log(`Song with id ${idToGet}`, result.rows);
    res.send(result.rows);
  })
  .catch( (error) => {
    console.log(`Error making database query ${sqlText}`, error);
    res.sendStatus(500); // Good server always responds
  })
})
```

IMPORTANT:  The name of route parameters must be made up of only letters and digits ([A-Za-z0-9_]).  No underscores, dashes, dots or other special characters. These are interpreted as literal values in the URL.

What if we want to get all the songs from a specific artist?

Just add another route URL with a parameter.

```JavaScript
// READ - get all of a person's jokes
app.get('/songs/artist/:artist', (req, res) => {
  const artistToGet = req.params.artist;
  const sqlText = `SELECT * FROM songs WHERE artist=$1`;
  pool.query(sqlText, [artistToGet])
  .then( (result) => {
    console.log(`Songs for artist ${artistToGet}`, result.rows);
    res.send(result.rows);
  })
  .catch( (error) => {
    console.log(`Error making database query ${sqlText}`, error);
    res.sendStatus(500); // Good server always responds
  })
})
```

## DELETE - SQL Delete
A request to delete data is very similar to a GET with an id, but instead of a GET request, we use a DELETE request.

```JavaScript
app.delete('/songs/:id', (req, res) => {
  let reqId = req.params.id;
  console.log('Delete request for id', reqId);
  let sqlText = 'DELETE FROM songs WHERE id=$1;';
  pool.query(sqlText, [reqId])
    .then( (result) => {
      console.log('Song deleted');
      res.sendStatus(200);
    })
    .catch( (error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500); // Good server always responds
    })
})
```

**client.js**
```JavaScript
function deleteSong(songId) {
  $.ajax({
    method: 'DELETE',
    url: `/songs/${songId}`
  })
  .then(function(response){
    console.log('Deleted it!');
    getAllSongs();
  })
  .catch( function(error) {
    alert('Error on delete line 49', error);
  })
}
```
How do we get the id of the thing to delete?  
Use jQuery data!

```
  // Create the HTML row using jQuery
  let $newRow = $(`
      <tr>
        <td>${aSong.artist}</td>
        <td>${aSong.track}</td>
        <td>${aSong.published}</td>
        <td>${aSong.rank}</td>
        <td>
          <button class="btn-delete">Delete</button>
          <button>Edit</button>
        </td>
      </tr>
      `);

  // Put data on the row to save the id from the database
  newRow.data('id', aSong.id);

  // Append the row to the DOM
  $('#songs').append(newRow);
```  