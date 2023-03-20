# Redux Saga Intro

## Starting Repo
https://github.com/PrimeAcademy/redux-saga-starter

## Finished Repo
https://github.com/PrimeAcademy/redux-saga-starter/tree/finish

## React & Redux Fundamentals Refresher 

Q&A time -- React, Redux

Look the starter app over, see if people have questions about it.
Review of Redux terms, concepts, life cycle, functions.

Hit hard the cycle.

What was the glaring thing redux doesn't do?

Async.

## How to handle Async?

- We could use Promises, on .then, dispatch an action

    Pros -- no additional library
    Cons -- no real way to handle side effects, like loading spinners

- A better option could be to use Redux-Saga, a side effect middleware redux helper library
    Intercepts actions and make a flow of events

    Pros -- can handle side effects
            easy to read and manage
    Cons -- less straightforward syntax

    
Side Effects, conceptually, are the things that are triggered but that you dont have control over when they fire or complete.
Common things that are side effects that sagas make easy:

- loading spinners showing and hiding
- displaying and hiding error messages, toasts, etc
- scheduling api calls (though it doesn't actually make the call)

## redux-saga conceptual

redux-saga could be called redux-process-manager
Redux-saga offers an ES6 generators interpreter that permits you to easily write async code that looks like synchronous code
![redux life cycle](../images/redux-cycle.png)

Sagas listen, like Reducers, for `actions`. Sagas will intercept actions BEFORE the reducer. Sagas can do many things. Common things are dispatching other actions, and triggering HTTP calls. Usually, the end of the saga dispatches a new action that sends info to the reducer to be saved in the store.


The life cycle diagram is now :
![redux-saga-flow](../images/react-redux-saga-flow.JPG)

If you don't have a saga intercept an action, it still can be used by the reducer.

## Make axios requests from App.js

Typically, the most important Async thing we do on the client side is api calls. Let's show one of these in action.

Here we have a functioning client side (`localhost://3000`) and a functioning server (`localhost://5000`).

Here is our current `handleClick`.

```JSX
const handleClick = () => {
    axios.post('/api/element', {newElement}).then(() => {
        getElements();
        setNewElement('');
    })
    .catch(error => {
        console.log('error with element get request', error);
    });
}
```
 Just like before with jQuery, we want to replace our list with the list from the server. Our Reducer does that.

```JSX
const elementListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ELEMENTS':
            return action.payload;
        default:
            return state;
    }
};
```

But this is already getting gross! This is a pretty trivial example, but imagine if we had a lot of this code (http requests back to back or triggering spinners). This would get really awful. (This is referred to as `callback hell`).

What if we wanted to be able to post from multiple different components? We would have to write this code in multiple places! EW!

## Creating our first Redux saga

Redux Saga has a fair amount of overhead. For this lecture, we have the saga setup already done for you. Later, [we'll come back and talk through this setup](./12-03c-redux-saga-setup.md).

Here's what our code looks like, with the saga middleware already setup:

```JSX
// bringing redux-saga into our project
import createSagaMiddleware from 'redux-saga';

// this is a special generator function
// sagas are generator functions
// we'll talk about how they work later
// for now, know that they let us run code synchronously
function* watcherSaga() {

}

const sagaMiddleware = createSagaMiddleware();

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        firstReducer,
        secondReducer,
        elementListReducer,
    }),
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(watcherSaga);
```

Great! `redux-saga` is a part of our project. Like other middleware, redux-saga has access to every dispatched action. It's also special, because it's a middleware that can dispatch other actions.

If we want it to listen for specific actions. We need to use the `takeEvery` effect in our `watcherSaga`. Let's bring that in from `redux-saga/effects`

```JSX
import { takeEvery } from 'redux-saga/effects';
```

and then we can use it in our generator function:

```JSX
function* watcherSaga() {
    yield takeEvery('SET_ELEMENTS', firstSaga);
}
```

Here we are saying, every time our action has a type of `SET_ELEMENTS`, we will run `firstSaga`. We don't have a `firstSaga`, so let's create one:

```JSX
function* firstSaga(action) {
    console.log('firstSaga was hit with action:', action);
}
```

Take a minute to look at the code and what it is doing so far. Follow the path.

1. `App.js` dispatches an action
2. Since it is a middleware, our `rootSaga` picks up all actions.
3. `watcherSaga` (almost like server-side routing) acts as the traffic cop. It says "I see this action, should I do something with it?" If it matches, it runs the corresponding saga. In this case, `takeEvery` matches with `SET_ELEMENTS` and runs `firstSaga`
4. `firstSaga` runs our console log.

## Move Get Request to Redux saga

> Note: this could be a good break for the generator functions lecture

Admittedly, this is pretty ridiculous. All the work for a console log? This is not where `redux-saga` shines. It shines with treating async things like synchronous things (the road out of callback hell).

Let's remove our absurd `firstSaga` and move our GET request to a saga!

We're going to need another effect to send data to redux from our saga. Its called `put`.

```JSX
import { takeEvery, put } from 'redux-saga/effects';
```

It behaves the same as Redux's `dispatch()`: It sends an action.

```JSX
import { takeEvery, put } from 'redux-saga/effects';
```

```JSX
function* fetchElements() {
    try {
        const elementsResponse = yield axios.get('/api/element');
        yield put({ type: 'SET_ELEMENTS', payload: elementsResponse.data });
    } catch (error) {
        console.log('error fetching elements', error);
    }
}

function* watcherSaga() {
    yield takeEvery('FETCH_ELEMENTS', fetchElements);
}
```

And update your `handleClick` method to match:

```JSX
const handleClick = () => {
    axios.post('/element', {newElement: newElement}).then(() => {
        dispatch({ type: 'FETCH_ELEMENTS' });
        setNewElement('');
    })
    .catch(error => {
        console.log('error with element get request', error);
    });
    
}
```

So much prettier! Let's go further!

## Move post to redux saga

Take a minute to try doing this with this `post`.

`App.js`

```JSX
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const reduxState = useSelector(reduxState => reduxState)
  const [newElement, setNewElement] = useState('');


  const handleChange = (event) => {
    setNewElement(event.target.value);
  }

  const getElements = () => {
    axios.get('/api/element').then(response => {
      dispatch({ type: 'SET_ELEMENTS', payload: response.data });
    })
      .catch(error => {
        console.log('error with element get request', error);
      });
  }

  useEffect(() => {
    getElements();
  }, []);

  const handleClick = () => {
    axios.post('/api/element', {newElement}).then(() => {
      getElements();
      setNewElement('');
    })
      .catch(error => {
        console.log('error with element get request', error);
      });

  }


  return (
    <div>
      <button onClick={() => dispatch({ type: 'BUTTON_ONE' })}>Button One</button>
      <button onClick={() => dispatch({ type: 'BUTTON_TWO' })}>Button Two</button>
      <input value={newElement} onChange={handleChange} />
      <button onClick={handleClick}>Add Element</button>
      <pre>{JSON.stringify(reduxState)}</pre>
    </div>
  );
}


export default App;


```

and `index.js` looks like this:

```JSX
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { put, takeEvery } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

const elementListReducer = (state = [], action) => {
    // if (action.type === 'ADD_ELEMENT') {
    //     console.log(`The element was ${action.payload}`);
    // }
    switch (action.type) {
        // case 'ADD_ELEMENT':
        //     return [ ...state, action.payload ];
        case 'SET_ELEMENTS':
            return action.payload;
        default:
            return state;
    }
};

function* postElement(action) {
    try {
        yield axios.post('/api/element', action.payload);
        yield put({ type: 'FETCH_ELEMENTS' });
    } catch (error) {
        console.log('error posting an element', error);
    }    
}

function* fetchElements() {
    try {
        const elementsResponse = yield axios.get('/api/element');
        yield put({ type: 'SET_ELEMENTS', payload: elementsResponse.data });
    } catch (error) {
        console.log('error fetching elements', error);
    }
}

function* watcherSaga() {
    yield takeEvery('FETCH_ELEMENTS', fetchElements);
    yield takeEvery('ADD_ELEMENT', postElement);
}

const sagaMiddleware = createSagaMiddleware();

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        firstReducer,
        secondReducer,
        elementListReducer,
    }),
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(watcherSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
        <App />
    </Provider>
  </React.StrictMode>
);
```

Exercises

1. Our reducers are taking up a lot of space in our `index.js`. Inside of the `src` folder, create a `reducers` folder. Move each reducer to its own file, and then import them into `index.js`.
2. Our sagas are starting to take up a lot of space. Inside of the `src` folder, create a `sagas` folder. Move each reducer to its own file, and then import them into `index.js`.
3. Great! Let's try these skills out again with `redux-saga-garden`! https://github.com/PrimeAcademy/redux-saga-garden
