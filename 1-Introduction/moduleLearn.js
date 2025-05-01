// import Sum from "./math.js"; //need :(type:module ) in package json

const Sum = require('./math');
const { mulFun, Sub} = require('./math2');
const { DivFun, Sqr } = require('./math3');

//create package json file:=>npm init ,npm init -y 
console.log('hello world !');
// console.log(window)        //window object is not available
// console.log(alert('hey'))   // window related not work that is :document related not working

let sum=Sum(4,5);
let sub=Sub(10,8);
let mul=mulFun(10,8);

let div=DivFun(4,2);
let sqr=Sqr(2)
console.log('sum=',sum);
console.log('sub=',sub);
console.log('mul=',mul);

console.log('div=',div);
console.log('sqr=',sqr);

