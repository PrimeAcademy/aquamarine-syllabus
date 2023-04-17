# OOP and Class Inheritance

- [Code from Lecture](https://github.com/PrimeAcademy/fomalhaut-oop-class-inheritence)
- [More on Object-Oriented Programming concepts](oop-concepts.md)
- [Video of Lecture](https://vimeo.com/album/4968405)
- In-class activity to practice: https://primeacademy.io/admin/assignments/fomalhaut-w7d3-oop-pizza-factory

We can extend the functionality from one class to the next by using the `extend` keyword. This will cause the `subclass` (or `child class`) to inherit its functionality from the `Super class` (or `Parent class`). 

Let's take a look at an example below:

```javascript 
// class is the template for Animal objects (and also our base class)
class Animal {
    constructor(color = 'yellow', weight = 2, noise = 'howl') {
        this.isAlive = true;
        this.color = color;
        this.weight = weight;
        this.noise = noise;        
    }

    makeNoise() {
        return this.noise;
    }
}

// Animal class is the Parent class of Bird
// Bird is a sublcass of Animal
class Bird extends Animal {
    constructor(weight = 10, color = 'purple') {
        console.log('hi from bird class');
        // super calls the constructor on the parent class
        // we can optionally send values up to the constructor method
        super(color);
        
        // could also override Animal.weight here
        this.weight = weight;

        // define bird properties        
        this.inFlight = false;
        this.hasFeathers = true;
    }

    // polymorphism
    // override of a parent's method definition
    makeNoise() {
        // console.log(super.makeNoise());
        return `${this.noise} is the bird noise`;        
    }
}

```