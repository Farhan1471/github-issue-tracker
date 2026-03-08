1️⃣ What is the difference between var, let, and const?
# var ---> when we declared using var, we can change or re-declare that value. It works inside the whole function.
var number = 13;
var number = 17;


# let ---> when we declare using let, we can change the value but we cannot re-declare that. It works only inside the block.
let number = 13;
number = 15;

# const ---> once we declare using const, we cannot change or re-declare that value. It works only inside the block.


2️⃣ What is the spread operator (...)?
# Spread operator is a way to expand the elements from an array or object.
const number = [1, 2, 3];
const number2 = [..., 4, 5];
console.log(number2);

output: [1, 2, 3, 4, 5]


3️⃣ What is the difference between map(), filter(), and forEach()?
# map() ---> It is used to transform each item in an array. It returns a new array with updated value.
# filter() ---> It is used to match/select specific items froma an array. It returns a new array with matched items.
# forEach() ---> It is used execute same code on every element of an array. It does not return any array.


4️⃣ What is an arrow function?
# Arrow function is shorter syntax of regular function. In arrow function, we use arrow sign (=>).
const sum = (number1, number2)=>{
    return number1 + number2;
}


5️⃣ What are template literals?
# Template literals are strings that allow us to write in multi-line text, embed varible inside the string. We need to use backticks(``) to write template literals.
const country = "Bangladesh"
console.log(`We love ${country}`);

output: We love Bangladesh