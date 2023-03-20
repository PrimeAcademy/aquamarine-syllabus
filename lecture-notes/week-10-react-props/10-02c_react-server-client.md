# Server and Client with React

Let's start with our mythical creatures for our front end... but let's add a backend!

Starting Repo: https://github.com/PrimeAcademy/react-server-client

## Database
Make sure your database is running!
Make a database called `full-stack-react`, and run the commands found in the `database.sql` file to setup your database.

## Getting Started

Typically we use `npm start` to startup our apps. With our full-stack react apps we are going to do things a little differently.

So previously, when we ran `npm start` the command that was actually run for us was `react-scripts start`. This starts the React process that makes our client available on port 3000 and watches our `src` files to do the auto-refresh when they change. 

When we add server side code, we also need another port listening for our server requests. If you look at the starter code provided you'll see the following scripts in `package.json`:
```
  "scripts": {
    "start": "node server/server.js",
    "build" : "react-scripts build",
    "client": "react-scripts start",
    "server": "nodemon  --watch server server/server.js",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
```

The `client` script is now setup to run the same process we were running earlier this week. To run this script, open terminal and enter `npm run client`. This will start the create-react-app development server on 3000.

BUT we also need to kick off the server.  We're gonna need more terminal tabs!
In a new terminal tab enter `npm run server` to start our node server listening on 5000. 

So what's up with `npm start`?
The create-react-app development server is for just that - development. It is not part of the final product. When we eventually get to Heroku, everything will be served from our node/express server and `npm start` is setup to do that.

> Note the only thing changing here is how we are starting the React app for development. State, Components, and our react knowledge is the same. Everything we already know about our server remains the same. Routers, Modules, databases, etc don't change.


## Axios

Now that we have things up and running, let's get our client talking to our server!

React is a front-end framework. Let's hook it up to the back end! Unlike jQuery, React doesn't have a way to make HTTP (AJAX) requests out of the box. We need an additional library to make HTTP requests.

We'll be using `axios` as that library to make requests to our server for data. 

```
npm install axios
```

https://www.npmjs.com/package/axios


Top level component should be responsible for fetching data. In our case, this is the `App` Component, So we need to import axios into that component.

```JSX
import axios from 'axios';
```

## React Client GET Creatures 

Our Node server has a `/creature` route -- Let's make a function that requests our creatures so we can show them on the DOM! We're going to have to call it for now.

Add the following function to your `App` component:
```javascript
const fetchCreatures = () => {
  axios({
    method: 'GET',
    url: '/creature',
  }).then( (response) => {
    console.log(response)
    console.log(response.data)
  }).catch( (error) => {
    console.log(error)
  });
}

// for now, lets call it right away.
fetchCreatures();
```

Axios looks pretty similar to jQuery `$.ajax()`, BUT it's a little different... We get back more info! Look at response. We get a lot more back -- our data that we sent is on the key `data`. So when you want to gain access to it, you have to use `response.data`.

### Proxy
Our client is looking at port 3000. Our server is on port 5000. 

How does the axios request which is made from port 3000 know to go to 5000??? 

BLACK MAGIC.... Or not. We setup a `proxy` for our call in the `package.json`. Notice the line:
```
"proxy" : "http://localhost:5000"
```

Basically, create-react-app is being told that if anyone comes knocking at door for port 3000 with an Ajax request, it should send them to port 5000 instead. 


## React Lifecycle & useEffect

OK, so when do we call our `fetchCreatures` function? In jQuery, we had `$(document).ready()`, but in React, that's not a thing...

We know that we want to do the GET request once at load. Not repeatedly, but also after a POST. (Or DELETE or PUT)

React has a regular order of events, called a lifecycle. Basically, what happens and triggers the next thing.  

Basic Lifecycle
Mount -> Render (return) -> effects
Update State or Props -> Render (return) -> effects


To hook into that lifecycle, we need a new hook, called `useEffect`.




`useEffect` hook is a function to initiate our call to our server when the component loads for the first time, for starters. It can do more, but that will be the most common thing.

Add a `useEffect` to your import, and  have it call your `fetchCreatures`:
```JSX
  // This gets called when the component loads
  // React equivalent of jQuery's `$( document ).ready()`
  useEffect(() => {
    fetchCreatures()
  }, [])
```

The way to think about this is that useEffect will run when we first render our component. The empty array is a funky bit, but that is responsible for when the effect will rerun. 
In this case, it's empty, so it will only run at load! If you forget the array, you could end up with infinite loops!


## Alternate syntax for Axios

Axios also allows you to use methods that specify the request method:
```jsx
  const fetchCreatures = () => {
    // Optionally the request above could also be done as
    axios.get('/creature')
      .then( (response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
```

You could similarly use this syntax for post, put or delete.



### Saving in State

- How will we use `response` in the .then? What do we need to do to see it on the DOM?
    ```JSX
        setCreatureList(response.data);
    ```

>>Probably good time for a break

## POST, Form, etc

Now for the full circle part -- lets add forms and buttons to help create a new creature! We'll need two inputs -- one for name and origin, and two pieces of state that correspond, and a button!


```jsx
  const [newCreatureName, setNewCreatureName] = useState('');
  const [newCreatureOrigin, setNewCreatureOrigin] = useState('');

const addCreature = (event) => {
  event.preventDefault();
  console.log('submitted!')
  //time for POST
}


 {/* */}
<h2>Add Creature</h2>
<form onSubmit={addCreature}>
  <label htmlFor="name">Name:</label>
  <input id="name" onChange={ (event) => setNewCreatureName(event.target.value) } />
  <label htmlFor="origin">Origin:</label>
  <input id="origin" onChange={ (event) => setNewCreatureOrigin(event.target.value) } />
  <button type="submit">Add New Creature</button>
</form>
```


   
How would you write a POST with axios? Data has to be an object, so we'll need to assemble our data a bit.

```JSX
    const addCreature = () => {
      axios({
        method: 'POST',
        url: '/creature', 
        data: {
          name: newCreatureName,
          origin: newCreatureOrigin
        }
      })
      .then( (response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
        // Optionally the request above could also be done as
      axios.post(`/creature`, {name : newCreatureName, origin: newCreatureOrigin})
      .then( (response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });    
```

And then, call your fetchCreatures in the `.then`!

