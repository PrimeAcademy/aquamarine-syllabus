# Deploying a Database with bit.io

bit.io is a cloud database service. Just as Heroku or AWS allow you to rent out web servers, bit.io lets you rent out database servers.


## Pricing and Registration

Register for an account at [bit.io](https://bit.io)

Pricing details are at https://bit.io/pricing, and may change from what is documented here.

**Free Tier:** 

- Limited to 3 databases
- Free! No credit card required.

**Pro:** 

- Requires a credit card to register
- Unlimited databases
- Free up to 1M rows queries
- Free up to 3GB data
  
## Create a database

In general, you will want to create a new database for every application you deploy.

- Click _Create Database_, or the _+ New_ button 
- Give your database a name. This should match your app name, eg `todo_list`
- Set the visibility to _Private_

## Connect to your database from Postico

You can use Postico to access your database, and run SQL queries against it.

- Go to your [account dashboard](https://bit.io/dashboard) 
- Select your database
- Click on the _Connect_ tab

This tab gives you all the information you need to connect to your database from Postico:

- Open the Postico app
- If you're already connected to a database, close your Postico window to disconnect
- Click _New Favorite_, to setup the new connection to bit.io
- Copy all the values from the bit.io _Connect_ page into the connection form in _Postico_:

![connection copy](../images/bit-io-postico-connection.png)

- Click _Connect_

You can now use _Postico_ as usual. All your SQL commands will be sent to  your `bit.io` database, instead of the one running on `localhost`.


## Setup your database

You have 2 options for setting up your database:

### Option 1: database.sql

Because you are a conscientious software engineer, you have kept all of your `CREATE TABLE` commands in a `database.sql` file, in your project repo. [Connect to your bit.io database in Postico](#connect-to-your-database), and run all those SQL commands, just as you have before.



### Option 2: Export / Import

> See [bit.io docs](https://docs.bit.io/docs/exporting-and-restoring-data-via-pg_dump-and-pg_restore) for details on exporting / importing your database

Use this option if:

- You do not have a `database.sql` that is in sync with your actual database
- You have a lot of data you want to copy from your local database into your bit.io database

The postgres CLI comes with tools to export and import entire database. So we can export our local database, and import it into our bit.io database.

To export your local database, run:

```
pg_dump -d NAME_OF_YOUR_DATABASE > ~/Downloads/dump.sql
```


> 💥 **Replace `NAME_OF_YOUR_DATABASE` with the actual name of your database!**

This will a create file in your _Downloads_ folder called `dump.sql`. This file contains all the SQL code needed to recreate your database!

> If you get an **error message** like `command not found: pg_dump`, it means that the postgres CLI commands are not properly installed. If you used Postgres.app to install postgres on your computer, run the following commands:
> ```
> # Only run these commands if pg_dump failed!!
> sudo mkdir -p /etc/paths.d &&
> echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /> etc/paths.d/postgresapp 
> ```



To import this data into your bit.io database, we need the _connection string_:

- Go to your bit.io dashboard
- Select your database
- Go to the _Connect_ tab
- Copy the _Postgres Connection_ value
    > This should look something like:
    > `postgresql://yourname:v2_3wYby_asdjfiuera348@db.bit.io/yourname/your-cool-app`

Now run in your terminal:

```
psql YOUR_DB_CONNECTION_STRING < ~/Downloads/dump.sql
```

> 💥 **Replace `YOUR_DB_CONNECTION_STRING` with the actual connection string you copied from bit.io!**

Your local database has now been copied to bit.io! You can use [Postico](#connect-to-your-database) to verify that all the tables and data are in there.


## Connect to your database from Heroku

Your Node.js app needs to know how to connect to your database. For this, we'll use a `DATABASE_URL` _environment variable_ when we configure our `pg.Pool`.

This is a two step process:

1. Set a `DATABASE_URL` environment variable on Heroku
2. Update `pool.js` to use that DATABASE_URL variable to connect to postgres

## 1. Set the `DATABASE_URL` on Heroku

> This setup assumes that your app is already [deployed to heroku.](./deploy-heroku.md)

Your app code will run on a server hosted by Heroku (or a similar cloud service). This server will needs to have the `DATABASE_URL` set, so that your Node.js app will know how to connect to your database.

To get the value for the `DATABASE_URL`

- Go to your [bit.io dashboard](https://bit.io/dashboard)
- Select your database
- Go to the _Connect_ tab
- Copy the _Postgres Connection_ value
    > This should look something like:
    > `postgresql://yourname:v2_3wYby_asdjfiuera348@db.bit.io/yourname/your-cool-app`

In a terminal, `cd` into your project folder. Then run:

```
heroku config:set DATABASE_URL=your_db_connection_string
```

> 💥 **Replace `your_db_connection_string` with the actual value you copied from bit.io!**

## Update `pool.js` to use `DATABASE_URL`

> **NOTE:** If you're using a repo from a Prime assignment, your `pool.js` may already be setup for you!

Your `pool.js` file should look something like this:

```js
// server/modules/pool.js
const pg = require('pg');
let pool;

// When our app is deployed to the internet 
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg: 
//  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
// When we're running this app on our own computer
// we'll connect to the postgres database that is 
// also running on our computer (localhost)
else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'prime_feedback', 
    });
}

module.exports = pool;
```

If you had to change this file, commit and push your changes to Heroku:

```sh
git add .
git commit -m 'Update pool.js'
git push origin main
git push heroku main
```

Your app should now be able to connect to your bit.io database. Open your app in a web browser to test it:

```
heroku open
```


## Troubleshooting

If your app failed to deploy, you will see error messages when running `git push heroku main`.

If your app is deployed to Heroku but not running, or running with errors, check your app logs on heroku:

```
heroku logs --tail
```

You can use `console.log`s to help troubleshoot your code. eg.

```js
// 💥 Remove this when you're done debugging! 
// 🔒 Logging secrets is a security risk.
console.log('What is my database URL?', process.env.DATABASE_URL);
```

Just remember to commit and push to heroku after writing your new `console.log`s.