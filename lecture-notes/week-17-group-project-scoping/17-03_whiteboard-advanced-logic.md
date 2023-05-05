# Logic Problems with Multiple Steps

### Palindrome

A palindrome is a string that is the same when read forward and backwards.  Write a function that takes in a string and returns a boolean indicating if the string is a palindrome.

Clarifications (only if asked):

JavaScript has a `.reverse()` method do not use for this problem
Can assume input will be a string, but may include numbers

Example test cases:

- cat -> false
- tacocat -> true
- anna -> true
- blue -> false


#### Example solution:

```JavaScript
function isPalindrome(string)  {
   index1 = 0;
   index2 = string.length - 1;

   while (index1 <= index2) {
      if ( string[ index1] != string[ index2 ] ) {
         return false;
      }
      index1++;
      index2--;
   }
   return true;
}
```

Note that there is no need to loop across the full length of the string, as you would re-check characters that you have already established match.


 
### DNA Verify & Clean

Write a function that takes in an array that should contain DNA base values and returns a string with any non-canonical bases removed. Canonical base values are 'C', 'T', 'A', and 'G'.

Clarifications (only if asked):
- You can assume the array will only contain strings
- The canonical DNA bases are fixed single character values that will not change
- Case insensitive - 'a' should be treated the same as 'A', but return only capitals
- If the array is empty, return an empty string

Example test cases:

- `[ 'A', 'H', 'T', 'C' ] -> 'ATC'`
- `[ 'hmC', 'T', 'G', 'A', 'aC' ] -> 'TGA'`
- `[ 'a', 'G', 't', 'c' ] -> 'AGTC'`
- `[ ] -> ''`


#### Example solution:

```JavaScript
function dnaVerify(array) {
    let canonicalBases = ['C', 'T', 'A', 'G'];
    let result = '';
    
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < canonicalBases.length; y++) {
            if (array[x].toUpperCase() === canonicalBases[y]) {
                result += canonicalBases[y];
            }
        }
    }
    return result;
}
```