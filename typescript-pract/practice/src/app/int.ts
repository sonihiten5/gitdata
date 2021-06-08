interface Person 
{
    name:string;
    age:number;
    about(phrase:string):void;
}

let user:Person = {
    name:'Hiten Soni',
    age:    22,
    about(phrase:string)
    {
        console.log(`${phrase} ${this.name}and age is ${this.age}`);
    }
}

user.about("hello my name is");