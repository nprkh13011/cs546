/*
Nidhi Parekh
I Pledge my Honor that I have abided by the Stevens Honor System
*/

const questionOne = function questionOne(arr) { //sum of squares
    // Implement question 1 here
    let sum = 0;
    for (let i of arr) {
        sum = (i * i) + sum;
    }
    return sum;
}

const questionTwo = function questionTwo(num) {  //Fibonacci
    // Implement question 2 here
    if (num < 1) {
        return 0;
    } else if ((num == 1) || (num == 2)) {
        return 1;
    } else {
        let fibonacci = questionTwo(num-1) + questionTwo(num-2);
        return fibonacci;
    }
}

const questionThree = function questionThree(text) { //vowels
    // Implement question 3 here
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;
    for (let letter of text) {
        if (vowels.includes(letter.toLowerCase()) == true) {
            count+=1;
        }   
    }
    return count;
}

const questionFour = function questionFour(num) { //factorial
    // Implement question 4 here
    if (num < 0) {
        return NaN;
    } else if (num == 0) {
        return 1;
    } else {
        let factorial = num * questionFour(num-1);
        return factorial;
    }
}

module.exports = {
    firstName: "Nidhi", 
    lastName: "Parekh", 
    studentId: "10452568",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};