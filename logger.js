console.log('this is logger file');


function log(message) {
    console.log("this is message " + message)
}

module.exports = log;


exports.add = (num1, num2) => {
    console.log(num1, num2)
}