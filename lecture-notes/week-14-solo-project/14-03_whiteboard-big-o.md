# Big O Notation


### Duplicate Finder

Write a function that takes in an array of strings and returns true if any string occurs twice, otherwise false.

	[‘green’, ‘red’, ‘blue’] would return false.
	[‘green’, ‘red’, ‘green’] would return true.

#### Example Solution:
```JavaScript
function findDupsArray(list) {
	
   let values = [ ];

   for (string of list) {
        for (val of values) {
            if (val === string) {
                return true;
            } 
        } 
        values.push(string);
   }  
   return false;
}
```

Once you find the Brute Force Method, can you do it faster using an object as a (`Map`)?

Using an object as a map:
```JavaScript
function findDups(list) {
	
   let values = { };

   for (string of list) {
      if ( values[string] ) {
         return true;
      } else {
         values[string] = 1;
      }
   }  
   return false;
}
```

## Two Numbers from Array Sum

Write a function that will take in two parameters - an array of numbers (the `array`) and a number (the `sum`). Your function should return true if two of the numbers in the array can add up to the sum.

Example clarifying questions:

- Will it always be an array of integers? Yes.
- Will the array of numbers be in order? Yes, from smallest to largest.

Example test cases:

```
sumChecker([1,2,3,4,8], 6) -> true
sumChecker([1,2,3,4,7], 9) -> true
sumChecker([1,2,3,7], 6) -> false
```

Example Solution:

```JavaScript
const sumChecker = (array, sum) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i+1; j < array.length; j++) {
      if (array[i] + array[j] === sum) {
        return true;
      }
    }
  }
  return false;
}
```

But there are better ways!

- Brute Force Solution: Brute Force Solution on JSFiddle to test performance: https://jsfiddle.net/3c4kyjkv/
- Here is an “N” solution: https://jsfiddle.net/afqs1q42/
- Here is an “N” example with recursion: https://jsfiddle.net/64fwsymt/
- Taken from this video: https://www.youtube.com/watch?v=XKu_SEDAykw

Lessons:

Big-O Notation is a way to measure the speed of an algorithm. Specifically it measures the worst-case complexity (efficiency) of an algorithm.

It is especially important for large data sets. This is where you can use the word “performance”.

- Detailed summary: https://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/
- With graph: https://medium.com/better-programming/understanding-big-o-notation-c3245b8112dc