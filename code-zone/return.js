// function myInfo(myAge) {
//     "use strict"
//     var myNmae = 'yakout'
//         // myAge = 22

//     return myAge * 365;
// }

// let myFunction = myInfo(32);

// document.getElementById('test').innerHTML = "your age in days " + myInfo(60) + " Days"

// function myInfo(sayName, myAge, jobTitle){
//     return "Hello " + `<b>${sayName}</b>` + " Welcome back " + "your Age " + myAge  
// }

// document.getElementById('test').innerHTML = myInfo("Mohamed",33, "engComputer")


// function makeDicscount(prodcut) {
//     "use strict"

//     let year = 365;
//     return prodcut * year;
// }

// // let inputUser = prompt('what your age')

// document.getElementById('test').innerHTML = makeDicscount(inputUser)


function calcNumber(a, b) {
    "use strict"

    return a + b
}

// let dyanmicNumber = prompt('put your numbers')

document.querySelector('#test').innerHTML = calcNumber(20, 20)