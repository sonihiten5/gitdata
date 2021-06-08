"use strict";
let user = {
    name: 'Hiten Soni',
    age: 22,
    about(phrase) {
        console.log(`${phrase} ${this.name}and age is ${this.age}`);
    }
};
user.about("hello my name is");
//# sourceMappingURL=int.js.map