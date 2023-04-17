# C# (C-Sharp) Language Key Points

## Resources

- https://docs.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/


## Keywords

---
| C# | JS Equivalent | Purpose |
| - | - | - |
| null | null | an intentionally empty value |
| class | class/object | used to define an object template |
| constructor | constructor | a special method in a class that returns a new object of class type |
| new | new | used to create an instance of a class (a new object) using its constructor method |
| member | object property | a variable scoped as a part of a class/object |
| method | object property/method | a function that is part of a class/object |
| model | -- | A class used primarly to represent data in the database |


---

## Return Types

All functions need to specify their `return type`. Because C# variable data types are static (unchanging), we are able to specifiy the kind of data any function is expected to return.

---
| Return Type | Meaning |
| - | - |
| void | the function does not return anything |
| int | returns an integer |
| string | returns a string |
| ClassName | returns an instance of some Class |

```cs
public class Example 
{
    // Mehods
    public void ThisFunctionReturnsNothing() {

    }

    public int Addinator(int firstNumber, int secondNumber) {
        // the returned value MUST be an int data type
        return firstNumber + secondNumber;
    }

    // return a Pizza object
    public Pizza GetNewPizza() {
        return new Pizza("pepperoni");
    }
}
```


## Access Modifiers

All classes, functions, types, and type members have an accessibility level. The accessibility level controls whether they can be used from other code in your assembly or other assemblies.

See: [https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers)