const mongoose = require('mongoose');
console.log(typeof mongoose); //object

console.log(typeof mongoose.Schema) //!typeof function diya lakin eska matlab ye function nahi hai. Class ka typeof bhi function deta hai .

//Todo) Ex:- 
// class Car {
//   constructor(name, year) {
//     this.name = name;
//     this.year = year;
//   }
// }
// console.log(typeof Car); //o/p = function