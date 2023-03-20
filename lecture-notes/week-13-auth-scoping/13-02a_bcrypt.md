# Salting & Hashing with bcrypt

[GitHub Repo](https://github.com/PrimeAcademy/psp_bcrypt)

> Note: This could be a lecture or students can explore using the above repo individually or in pairs/groups. The notes below are modified from the repo to support a lecture.

## Objectives

- Understand basic rules of password security
- Learn how salting & hashing work
- Investigate bcrypt, an adaptive, cryptographic hash
- Demonstrate how we will use bcrypt in our applications

## Storing user passwords 

The first rule of dealing with user passwords is that they should never be stored anywhere as plain text. Plain text is just ordinary, openly readable text - like the words on this page. If passwords are stored in plain text, anyone with access to the database containing them can read them. __Why would that be bad?__

Current best practices are to store user passwords salted & hashed. This conceals user passwords even from people with access to the database. Also, since a hash cannot be reversed, the actual password cannot be determined from the data stored.

### Hashing vs Encryption

Encryption, like hashing, usinges an alorithm to conceal text, however encryption is reversable while hashing is not. A string that has be encrypted may be decrypted to make it readable again. A hash however cannot be un-hashed. You can only know the original value by matching the hash with another hash of a value that you believe to be the same.


## Intro to bcrypt

Bcrypt is an algorithm for hashing passwords. It is currently the best algorithm we have for that. 

* It uses a salt and a hash
  - Salt - a unique, random string added to each password before it is hashed. By using a unique salt per password, common passwords that might be shared by many users, such as “password”, aren’t immediately obvious as being the same password because the stored salted and hashed values will look different.
  - Hash - text scrambled usinging an alorithm to conceal the actual value. A hash cannot be directly converted back to its original value, so to verify a user’s password is correct, the entered value is also hashed and then compared with the stored password.

* It is called adaptive because we can increase the number of iterations for more security
  - Increasing the iterations makes it more computationally intensive to crack the password
  - It also makes it slower to perform the hash

## Setup

Start with a new node project & install bcrypt:

```
mkdir bcrypt-intro
cd bcrypt-intro
npm init -y
npm install bcrypt
```

Make a new JavaScript file and bring in `bcrypt`:

```
const bcrypt = require('bcrypt');
```

## Salting & Hashing

To hash a value, we first need to generate our salt. This is the unique value added to the beginning to make the hash more secure. How secure that salt is will be determined by the `SALT_WORK_FACTOR`. The higher this value the more secure the salt, but the longer it will take to generate. The default value is `10`. 

```
  // This determines how secure the salt should be
  // Number of rounds (2^n) that it will go through to make a secure hash
  const SALT_WORK_FACTOR = 10; 


  // This generates a random salt
  let salt = bcrypt.genSaltSync(SALT_WORK_FACTOR); 
```

Next we can use bycrpt to generate a hash from the salt and our value:

```
  let password = 'myAwesomePassword';

  // Hash the user password and the random salt
  let output = bcrypt.hashSync(password, salt);
  console.log('Hashed password is', output);
```

There are a few different pieces embedded in the resulting hash:

- First 3 characters are the algorithm `$2b`
- Next 3 characters are the salt work factor, or number of rounds `$10`
- Next 22 are the salt
- Last 28 are the hash of the salt + the value

```
console.log(`The first part ${output.substr(0,3)} is the algorithm.`);
console.log(`The next part ${output.substr(3,3)} is the salt work factor, or number of rounds.`);
console.log(`The next part ${output.substr(6,22)} is the salt.`);
console.log(`The next part ${output.substr(28)} is the hash.`);
```

> Optional - Change the SALT_WORK_FACTOR from 10 to 12 to 15 and run the code. Notice that it is slower each time as you increase the value. 

Let's make a method to hash a user password. 

It's important to make a new salt for each password we want to hash. It makes salting more secure. Plus, if two users have the same password, the stored value is different for each of them.

```
// Method to hash a password with a random salt value
// The returned value can be stored securely in a database
const hashPassword = (password) => {
  // This generates a random salt
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR); 
  // This hashes the salt and the user password 
  return bcrypt.hashSync(password, salt);
};
```

Now let's try this out:

```
let hash1 = hashPassword(password);
console.log('First hash of password:', hash1);
let hash2 = hashPassword(password);
console.log('First hash of password:', hash2);
```

Notice that while the value we passed in was the same both times, the output is different. This is because we are generating a new salt for each value. 

## Checking the password

These hashed values are great, but how do we know if a user has the correct password when logging in?

If we just hash the input value with a new salt, it wouldn't match the stored value. We'd need to hash the input with the same salt value. While we *could* get the salt out of the stored value, we *shouldn't* do that and compare the values manaually. There's a special method provided by bcrypt to do the comparison for us. This compare function counters timing attacks (using a so-called 'constant-time' algorithm), so it's added security to use it.

To check a password against a stored hash:
```
let correct = bcrypt.compareSync('hello', output)
console.log('Is hello the password?', correct);

correct = bcrypt.compareSync('myAwesomePassword', output);
console.log('Is it myAwesomePassword?', correct);
```

Now let's make a method to do the check for us:
```
const comparePassword = (candidatePassword, storedPassword) => {
  return bcrypt.compareSync(candidatePassword, storedPassword);
};
```

Why make a method for one line of code? Why not just call the bcrypt method directly in our app?  

Keeping the details hidden for how we've implemented our password salting, hashing and checking makes it easy to change to later. For example we may want to change to a newer library if someone discovers a more secure method. 
