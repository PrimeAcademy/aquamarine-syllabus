# Redux Saga Setup

Now that we've seen how sagas work, let's come back and through the initial setup for sagas.

## Starting Lecture Code
https://github.com/PrimeAcademy/redux-saga-setup

## Middleware

Sagas are a type of middleware!

Middleware is the idea of code that is put in the middle of executing your code, without interrupting it.
We've used `redux-logger` middleware. What does that do for us?

Redux Saga is also a middleware. Up until now, we've been focusing on writing of the actual sagas -- but this doesn't happen because of magic! 

## Redux Saga from Scratch

Redux Saga has a fair amount of overhead. Here's the setup to add the saga middleware:

```
npm install redux-saga
```

Then update our `index.js`

```JSX
// bringing redux-saga into our project
import createSagaMiddleware from 'redux-saga';

// This makes a middleware for us to use.
const sagaMiddleware = createSagaMiddleware();

// watcher sagas will watch for actions. If they match, they fire off other sagas.
function* watcherSaga() {

}



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
    // This adds middlewares. Logger should be last!
    applyMiddleware(sagaMiddleware, logger),
);

// This allows the watcherSaga to start watching for actions
sagaMiddleware.run(watcherSaga);
```

Great! `redux-saga` is a part of our project. 
Like other middleware, redux-saga has access to every dispatched action. 
It's also special, because it's a middleware that can dispatch other actions.

