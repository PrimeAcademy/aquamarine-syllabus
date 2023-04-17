# SQL Transactions

[Starter Code](https://github.com/PrimeAcademy/sql-transactions-intro)

A transaction, in the context of a database, is a logical unit that is independently executed for data retrieval or updates. 

Transactions are a way to ensure that multiple related database queries happen as a group. All or nothing. If one query fails, they will all fail. This help to keep your data clean in case of an error with one of the queries or even a hardware failure or power outage.


## ACID 
You might hear the acronym ACID applied to database transactions. 

- Atomicity - A transaction must be fully complete, saved (committed) or completely undone (rolled back). It's all or nothing.
- Consistency - The transaction must be fully compliant with the state of the database as it was prior to the transaction. (No breaking database constraints.) 
- Isolation - Transaction data is not be available to outside the original transaction until it is either committed or rolled back.
- Durability - Transaction data changes must be available, even in the event of database failure.


## Example
Imagine you have some tables for a bank account.

```SQL
CREATE TABLE account (
	id SERIAL PRIMARY KEY,
	name VARCHAR(80) NOT NULL
);

CREATE TABLE register (
	id SERIAL PRIMARY KEY,
	acct_id INTEGER REFERENCES account NOT NULL,
	amount MONEY NOT NULL
);
```

Let's create a new account with an initial balance of $1000. We need to do two inserts, one into each table to do this. 

```SQL
-- 1) Create account 
INSERT INTO account (name) VALUES('Abbey''s Savings Account');

-- 2) Add deposit of initial balance (Need acct_id for insert)
SELECT * FROM account;	
INSERT INTO register (acct_id, amount) VALUES (1, 1000);
```

Another way to get the acct_id is to have the first insert return it using `RETURNING`. In Postico, we still have to plug in this value ourselves, but we'll be able to do it programmatically in JavaScript.

```SQL
-- Return id of inserted row to use for next query
INSERT INTO account (name) VALUES ('Abbey''s Checking Account') RETURNING id;
INSERT INTO register (acct_id, amount) VALUES (2, 100);
```

Now let's say that Abbey wants to move $500 from checking to savings...

```SQL
-- Take 500 out of checking
INSERT INTO register (acct_id, amount) VALUES (2, -500);

-- Put 500 into savings
INSERT INTO register (acct_id, amount) VALUES (11, 500);

-- Get current balances
SELECT account.name, SUM(amount) FROM account 
JOIN register on account.id=acct_id
GROUP BY account.id;
```

Oh no! We got the account ID wrong, and now we've lost $500!!!

> Note if you are running both queries at the same time in Postico, you'll automatically get a transaction, but this won't happen in your JavaScript code!

The two queries to transfer money should be one logical unit, a single transaction. To keep our system data in a valid state, they must both happen or neither should happen. We want no disappearing money!

We can use a transaction to make sure this happens!

```SQL
-- Using database transactions it is all or nothing.
BEGIN;
INSERT INTO register (acct_id, amount) VALUES (2, -500);
INSERT INTO register (acct_id, amount) VALUES (11, 500);
COMMIT;

-- When the error occurs on the 2nd insert, the first is undone
SELECT account.name, SUM(amount) FROM account 
JOIN register on account.id=acct_id
GROUP BY account.id;
```


## JavaScript Example

> Check out the pg [docs](https://node-postgres.com/features/transactions)

Let's write some server side code to try this out. We'll start by setting up an express server with a router.

First let's add a GET route to see the current account balances:

```JavaScript
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// Setup a GET route to get all the accounts & balances
router.get('/', (req, res) => {
  const sqlText = `SELECT account.name, SUM(amount) FROM account 
                      JOIN register on account.id=acct_id
                      GROUP BY account.id ORDER BY account.name;`;
  pool.query(sqlText)
      .then((result) => {
          console.log(`Got account balances:`, result.rows);
          res.send(result.rows);
      })
      .catch((error) => {
          console.log(`Error making database query ${sqlText}`, error);
          res.sendStatus(500); // Good server always responds
      })
});

module.exports = router;
```

There are some important considerations using transactions with `pg`.

- Must use the same client connection from the connection pool.
- Start transaction with `BEGIN`
- Must say `ROLLBACK` (error) or `COMMIT` (success)
- Return the connection to the pool whether transaction fails or succeeds. 
- Syntax is easier using JavaScript async/await

### Async/Await
JavaScript's [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) behaves much like code using promises, but using try/catch syntax instead of then/catch with callback functions. This makes it easier if you need to do multiple things!

> More Examples in the [Asyn/Await Tutorial](https://javascript.info/async-await)


### Balance Transfer

Let's add a POST to do a transfer:

```JavaScript
// Setup route for money transfer 
// Need *async* function to *await* completion of each query
router.post('/transfer', async (req, res) => {
  const toId = req.body.toId;
  const fromId = req.body.fromId;
  const amount = req.body.amount;
  console.log(`Transfer ${amount} from acct ${fromId} to acct ${toId}`);

  // We need to use the same connection for all queries...
  const connection = await pool.connect()
    
  // Using basic JavaScript try/catch/finally 
  try {
    await connection.query('BEGIN');
    const sqlText = `INSERT INTO register (acct_id, amount) VALUES ($1, $2)`;
    // Use - amount & from account for withdraw
    await connection.query( sqlText, [fromId, -amount]);
    // Use + amount & to account for deposite
    await connection.query( sqlText, [toId, amount]);        
    await connection.query('COMMIT');
    res.sendStatus(200); 
  } catch ( error ) {
    await connection.query('ROLLBACK');
    console.log(`Transaction Error - Rolling back transfer`, error);
    res.sendStatus(500); 
  } finally {
    // Always runs - both after successful try & after catch
    // Put the client connection back in the pool
    // This is super important! 
    connection.release()
  }
});
```

Note that we must:
-  Start the transaction
- Do the things
- COMMIT when done
- ROLLBACK if there is an error


### New Account with initial Balance (Exercise)

Write a new post to add an account with a starting balance amount. This requires an INSERT into the `account` table that returns an id & an additional INSERT into the `register` table using the returned account id.

```SQL
-- Return back the generated id value
INSERT INTO account (name) VALUES ('Kyo''s Savings Account') RETURNING id;
-- Then we need to plug it into the next insert... How?
INSERT INTO register (acct_id, amount) VALUES (???, 1000);
```

```JavaScript
// Setup route for new account with balance
router.post('/', async (req, res) => {
  const name = req.body.name;
  const amount = req.body.amount;
  console.log(`Creating new account '${name}' with initial balance ${amount}`);

  const connection = await pool.connect()    
  try {
    await connection.query('BEGIN');
    const sqlAddAccount = `INSERT INTO account (name) VALUES ($1) RETURNING id`;
    // Save the result so we can get the returned value
    const result = await connection.query( sqlAddAccount, [name]); 
    // Get the id from the result - will have 1 row with the id 
    const accountId = result.rows[0].id; 
    const sqlInitialDeposit = `INSERT INTO register (acct_id, amount) VALUES ($1, $2);`  
    await connection.query( sqlInitialDeposit, [accountId, amount]); 
    await connection.query('COMMIT');
    res.sendStatus(200); 
  } catch ( error ) {
    await connection.query('ROLLBACK');
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500); 
  } finally {
    connection.release()
  }
});
```