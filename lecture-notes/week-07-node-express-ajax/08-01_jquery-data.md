# jQuery Review 3

## Starter Repo
https://github.com/PrimeAcademy/jquery-data-starter

We no longer want to display the employee number. How can we make our project still work?

- Add data to delete button and remove the employeeId column:
  ```    
    <tr>
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td>${employee.title}</td>
        <td>${employee.annualSalary}</td>
        <td>
            <button class="deleteButton" data-id="${employee.employeeId}">
                Delete
            </button>
        </td>
    </tr> 
  ```

- Remove this line:
  ```
  let employeeId = $(this).parent().prev().prev().prev().text();
  ```
- Replace with this line:
  ```
  let employeeId = $(this).data().id;
  ```


## Topics

- Iterating over data and placing it on the DOM
- Manipulating Classes
- Getters and Setters
- Data Binding

## Putting structured data on the DOM

A combination of things we know how to do:

- Loop over an array
- Access object properties
- Use jQuery to append data

### New

- `forEach` - a built-in array method; alternative to using a for loop

```JavaScript
let someArray = ['blue', 'yellow', 'red'];

someArray.forEach(logIt);

function logIt(someArrayElement, index) {
  console.log('element at index', index, someArrayElement);
}
```

### .data()

`.data()` allows us to add/retrieve data to/from an HTML element.

[Example Repo](https://github.com/PrimeAcademy/fomalhaut-jquery-data-lecture)

```JavaScript
let $div = $('<div>'); // create a div element
$div.data('code', '55678'); // add data to the element with a name of code and a value of 55678
```

We can get the data from an element like so

```JavaScript
let theData = $('div').data('code');
console.log('theData', theData); // theData 55678
```
