# Edit Example using React and Redux

Starter repo with Sagas: https://github.com/PrimeAcademy/redux-edit-saga-example

## Set up Data

- database.sql file

## Run App

- npm install
- npm run server
- npm run client


---

# Lecture Outline

- start with working local state GitHub student list
- add in redux or start with it... prob start with it
- talk thru general flow of Update

## Editing Data

We're going to talk broadly about approaching an Edit feature and then move into a specific example that illustrates the main points and challenges an Edit can throw at you.

> The purpose of an Edit feature is to change some or all of a single row of data in the database (for a specific id). 

So if we have a list of students in our table, the idea of our Edit is to change some or all of the values for one specific student's row. In the end, this will essentally be running an `UPDATE` query, so our programmatic goal is to fill in a query similar to this:

`UPDATE students SET github_name = $1 WHERE id = $2`

We need to make a PUT request to our server that will supply both $1 (the new value) and $2 (which row to update).

---

## The Challenge

Edit features are complicated because they are as much a user interface challenge as a data or logic challenge. Often the data is the easiest part. It's managing and displaying the user interface that can quickly become overwhelming.

### Common Edit UI/Flow Considerations

1. Am I adding a new thing (POST)? or changing an existing thing (PUT)?
2. How will the user select the specific thing to edit?
3. How will the editing form/view be displayed? Does it have a route?
4. How much of that thing can the user edit?
5. Are the new changes validated at all?
6. How are the changes stored on the client side?
7. What does the user do to say they are done editing? How do they cancel?
8. What happens when the editing is done and the request is successful?


Our approach today will be to keep things straightforward. The UI will be simplistic and the flow will not be ideal. Our goal here is to get you thinking about how Edits work, snags you'll hit, and see a working practical approach.

---

## Let's Do This!

We're going to start with a working fullstack React application with Create and Read features. We'll take a look at how it's working and then work on adding in the Edit/Update code.

### Set-up

- see database.sql file
- npm install
- npm run server
- npm run client

### What's Here

This starter has:

- server has routes for GET and POST student to DB
- `App.jsx` route for Home component/page
- `Home` component loads list from server and displays on the DOM
- `index.js` has 2 reducers set up, one working for holding the student list and 1 empty, which will hold our object as we edit it

```js
// index.js

// all the students from the DB
const studentList = (state = [], action) => {
    if(action.type === 'SET_STUDENT_LIST') {
        return action.payload;
    }

    return state;
}

// hold only the single student object being edited
const editStudent = (state  = {}, action) => {

    return state;
}
```

## Approach

We're going to take this in steps and work toward a solution that has

- A clientside route with an Edit form
- We'll store the selected student data for editting in a reducer
- The edit form will update the reducer
- When editing is done (on submit), we'll PUT that new data to a route on the server


## Edit Route

We need a way to display a form and fill it with the selected student's data before we can worry about changing anything. For this we'll add a Route to the `App.jsx` clientside routes.

```js
// App.jsx

<Route exact path="/edit" component={EditForm} />
```

Be sure to import this component into `App.jsx`.

```js
// EditForm.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function EditForm(props) {
    return (
      <h2>Edit Student</h2>
    );
}

export default EditForm;

```

This is just basic stuff so we can go to the route and see something.

Go to `localhost:3000/edit` and you should see your lovely heading!

## Select a Student to Edit

We'll now need a way to pick a specific student from the list displayed on the DOM.

We'll add a button for this. When clicked, we'll store this student object in a reducer. Then in the `EditForm`, we'll use this object to display the data.

Note that we are getting the student object via `props` from the `StudentList`:

```js
// StudentList.jsx

<tbody>
    {studentList.map(student => {
        return <StudentDetail key={student.id} student={student} />
    })}
</tbody>
```

We need to send that very object to redux.

On click we will dispatch an action and payload to the `editStudent` reducer. This is the very object we will next be changing in our EditForm. For now, it stores it and we could display it on the DOM at `/edit`.

```js
// StudentDetail.jsx
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function StudentDetail(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  function handleEditClick() {
    // dispatch to store this student info in redux
    dispatch({ type: 'SET_EDIT_STUDENT', payload: props.student });

    // route to EditForm
    history.push('/edit');
  }

  return (
    <tr>
      <td>{props.student.github_name}</td>
      <td>
        <button onClick={handleEditClick}>Edit</button>
      </td>
    </tr>
  );
}

export default StudentDetail;

```
### The Edit Reducer

The `editStudent` reducer will take the updated student object provided by clicking on the Edit button and use it for the next `state` of this reducer.

```js
// index.js

// holds only the single student object being edited
const editStudent = (state  = {}, action) => {
    if(action.type === 'SET_EDIT_STUDENT') {
        // action.payload is the object from the DB
        return action.payload;
    }

    return state;
}
```

We then can use the reducer data we just set and see it on the DOM if we click the Edit button from the `Home` component list.

```js
// EditForm.jsx
// select and use just the reducer we need
const editStudent = useSelector((store) => store.editStudent);

return (
    <>
      <h2>Edit Student</h2>
      <p>We are editing this student: {editStudent.github_name} with id: {editStudent.id}</p>
    </>
  );
```

---

## EditForm onChange Handler

Next let's update the `EditForm` so we will actually manage the `onChange` events and keep the `<input>` up to date with redux.

One decision we need to make before this is all done is this:

What is our `payload` going to be? If we dispatch just the `github_name` string, it can seem simpler. But note we are actually dealing with an object from the database, so at some point we need to account for the `id` property as well. We'll need this for the PUT and eventual UPDATE query, so we can't lose it.

Here, we will dispatch the entire object with just the current value of the input field. 

For this to be accurate and up to date, we also must tie the `input`'s `value` attribute to the reducer. It may seem redundant, but it helps us keep up to date.

```js
// EditForm with onChange

// we need the redux hooks
const dispatch = useDispatch();
const history = useHistory();

// select and use just the reducer we need
const editStudent = useSelector((store) => store.editStudent);

function handleChange(event) {
    dispatch({ 
                type: 'EDIT_ONCHANGE', 
                payload: { property: 'github_name', value: event.target.value }
            });

  }

  return (
    <>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => handleChange(event)}
          placeholder='GitHub username'
          {/* editStudent IS the reducer state object */} 
          value={editStudent.github_name}
        />

        <input type='submit' value='Update Student' />
      </form>
    </>
  );

```

How the `EDIT_ONCHANGE` action works in the reducer depends very much on what we decided to use as our `payload`.

We are sending an object that will target only the `github_name` key on the reducer object. We will rely on the reducer to make sure the `id` stays unchanged. 

We could choose otherwise and it would still work. As long as the reducer `state` and this `payload` match up keys and doesn't lose any, we'd be fine.

```js
// EditForm onChange
dispatch({ 
            type: 'EDIT_ONCHANGE', 
            payload: { property: 'github_name', value: event.target.value }
        });
```

### Reducer ONCHANGE

To keep the `id`, the reducer uses `spread` to keep `id` and just change the given key of `github_name`. The `github_name` is provided on the payload object. We could hardcode `github_name: action.payload.value` if we wanted. 

This can work if our edit form only can change one thing, like our example. However, as soon as you add more editable fields, you'll need to selectively change them.

```js
const editStudent = (state  = {}, action) => {
    if(action.type === 'SET_EDIT_STUDENT') {
        // action.payload is the object from the DB
        return action.payload;
    } else if(action.type === 'EDIT_ONCHANGE') {
        return {
            // spread: give me all of the object (...state)
            ...state,
            // change this one in particular
            [action.payload.property]: action.payload.value,
        }
    }

    return state;
}
```

## Handle Submit/Done Editing

Lastly we need to actually make our PUT request and make that UPDATE query on the server. 

On click we'll take the current `editStudent` reducer value and send it to the server. When that's done, we'll clear our reducer and take the user back to the `Home` route.

```js
// EditForm JSX needs this
<form onSubmit={handleSubmit}>

// Called when the submit button is pressed
function handleSubmit(event) {
    event.preventDefault();

    // PUT REQUEST to /students/:id
    axios.put(`/students/${editStudent.id}`, editStudent)
        .then( response => {
            // clean up reducer data            
            dispatch({ type: 'EDIT_CLEAR' });

            // refresh will happen with useEffect on Home
            history.push('/'); // back to list
        })
        .catch(error => {
            console.log('error on PUT: ', error);
        })

};
```

The server `PUT` and `UPDATE` routes are the same as they have been.

## Finish and Redirect

After that request completes, we then clean up the edit reducer and redirect the user to the `Home` route.

```js
// EditForm
.then( response => {
        // clean up reducer data            
        dispatch({ type: 'EDIT_CLEAR' });

        // refresh will happen with useEffect on Home
        history.push('/'); // back to list
    })
```

Clearing the reducer/resetting it back to default values.

```js
// index.js
const editStudent = (state  = {}, action) => {
    if(action.type === 'SET_EDIT_STUDENT') {
        // action.payload is the object from the DB
        return action.payload;
    } else if(action.type === 'EDIT_ONCHANGE') {
        return {
            ...state,
            [action.payload.property]: action.payload.value,
        }
    } else if(action.type === 'EDIT_CLEAR') {
        return { github_name: '' };
    }

    return state;
}
```

## Refresh Data for StudentList

After clearing the reducer values, we use the `history` hook to redirect the user to the `/` url. The `App.jsx` routes will then load the `Home` component as directed.

```js
// EditForm.jsx
history.push('/'); // back to list

// App.jsx
<Route exact path="/" component={Home} />
```

Once the route is changed and we end up back in the `Home` component, this will very conveniently run our `useEffect()` function again, do our GET request, and update our list from the database. This list is then put back into the reducer and everything re-renders with our updated student!

```js
// Home.jsx
useEffect(() => {
    console.log('in useEffect')
    getStudents();
}, [])
```

## Conclusion

There are a number of challenges for Edit features. Note in this example we made a number of decisions which tie directly together. Our combination of routes, reducers, dispatches, and actions all play together and have ramifications for the user and the complexity of our code.

---

## EditForm Component End State

```js
// Complete EditForm.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function EditForm(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const editStudent = useSelector((store) => store.editStudent);

  function handleChange(event) {
    dispatch({ 
                type: 'EDIT_ONCHANGE', 
                payload: { property: 'github_name', value: event.target.value }
            });

  }

  // Called when the submit button is pressed
  function handleSubmit(event) {
    event.preventDefault();

    // PUT REQUEST to /students/:id
    axios.put(`/students/${editStudent.id}`, editStudent)
        .then( response => {
            // clean up reducer data            
            dispatch({ type: 'EDIT_CLEAR' });

            // refresh will happen with useEffect on Home
            history.push('/'); // back to list
        })
        .catch(error => {
            console.log('error on PUT: ', error);
        })
    
  };


  return (
    <>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => handleChange(event)}
          placeholder='GitHub username'
          value={editStudent.github_name}
        />
        <input type='submit' value='Update Student' />
      </form>
    </>
  );
}

export default EditForm;
```
