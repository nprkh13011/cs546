const arrays = require("./arrayUtils");
const strings = require("./stringUtils");
const objects = require("./objUtils");


// mean
try {
    // should pass
    const meanOne = arrays.mean([2,3,4,5,6,7,8]);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}

try {
    //should fail
    const meanTwo = arrays.mean(1234);
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

//medianSquared
try {
    //should pass
    const medianSquaredOne = arrays.medianSquared([0,1,2,3,4,5,6,7,8,9]);
    console.log('medianSquared passed successfully');
} catch (e) {
    console.error('medianSquared failed test case');
}

try {
    //should fail
    const medianSquaredTwo = arrays.medianSquared([]);
    console.error('medianSquared did not error');
} catch (e) {
    console.log('medianSquared failed successfully')
}


//maxElement
try {
    //should pass
    const maxElementOne = arrays.maxElement([0,1,2,3,4,5,8,7,9]);
    console.log('maxElement passed successfully');
} catch (e) {
    console.error('maxElement failed test case');
}

try {
    //should fail
    const maxElementTwo = arrays.maxElement(2,4,6,8);
    console.error('maxElement did not error');
} catch (e) {
    console.log('maxElement failed successfully')
}

//fill
try {
    //should pass
    const fillOne = arrays.fill(6, "Fun");
    console.log('fill passed successfully');
} catch (e) {
    console.error('fill failed test case');
}

try {
    //should fail
    const fillTwo = arrays.fill("Not fun");
    console.error('fill did not error');
} catch (e) {
    console.log('fill failed successfully')
}


//countRepeating
try {
    //should pass
    const countRepeatingOne = arrays.countRepeating([{1:2},7,13,13,7,{1:2},{1:2}]);
    console.log('countRepeating passed successfully');
} catch (e) {
    console.error('countRepeating failed successfully');
}

try {
    //should fail
    const countRepeatingTwo = arrays.countRepeating();
    console.error('countRepeating did not error');
} catch (e) {
    console.log('countRepeating failed successfully')
}

//isEqual
try {
    //should pass
    const isEqualOne = arrays.isEqual([1, 2], [1, 2, 3]);
    console.log('isEqual passed successfully');
} catch (e) {
    console.error('isEqual failed successfully');
}

try {
    //should fail
    const isEqualTwo = arrays.isEqual([0,4,2]);
    console.error('isEqual did not error');
} catch (e) {
    console.log('isEqual failed successfully')
}


//camelCase
try {
    //should pass
    const camelCaseOne = strings.camelCase("Horton   hears   a   Who!");
    console.log('camelCase passed successfully');
} catch (e) {
    console.error('camelCase failed successfully');
}

try {
    //should fail
    const camelCaseTwo = strings.camelCase(["Chips", "Chocolate", "Cherries", "Chives"]);
    console.error('camelCase did not error');
} catch (e) {
    console.log('camelCase failed successfully')
}

//replaceChar
try {
    //should pass
    const replaceCharOne = strings.replaceChar("Sally sells seashells by the seashore");
    console.log('replaceChar passed successfully');
} catch (e) {
    console.error('replaceChar failed successfully');
}

try {
    //should fail
    const replaceCharTwo = strings.replaceChar("");
    console.error('replaceChar did not error');
} catch (e) {
    console.log('replaceChar failed successfully')
}

//mashUp
try {
    //should pass
    const mashUpOne = strings.mashUp("Wanda", "Maximoff");
    console.log('mashUp passed successfully');
} catch (e) {
    console.error('mashUp failed successfully');
}

try {
    //should fail
    const mashUpTwo = strings.mashUp("w", "m");
    console.error('mashUp did not error');
} catch (e) {
    console.log('mashUp failed successfully')
}

//makeArrays
try {
    //should pass
    const makeArraysOne = objects.makeArrays([{x: "Wanda", y: "Maximoff"}, {a: "Peter", b: "Parker", c: "Tony", d: "Stark"}, {y: "Thor"}]);
    console.log('makeArrays passed successfully');
} catch (e) {
    console.error('makeArrays failed successfully');
}

try {
    //should fail
    const makeArraysTwo = objects.makeArrays([{}, {}]);
    console.error('makeArrays did not error');
} catch (e) {
    console.log('makeArrays failed successfully')
}

//isDeepEqual
try {
    //should pass
    const isDeepEqualOne = objects.isDeepEqual({a: {sA: "Hello", sB: "There", sC: "Class"}, b: {Sa: 7, Sb: "Fun"}, c: true, d: "Test"}, {c: true, b: {Sa: 7, Sb: "Fun"}, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}});
    console.log('isDeepEqual passed successfully');
} catch (e) {
    console.error('isDeepEqual failed successfully');
}

try {
    //should fail
    const isDeepEqualTwo = objects.isDeepEqual([1,2,3,4],[1,2,3,4]);
    console.error('isDeepEqual did not error');
} catch (e) {
    console.log('isDeepEqual failed successfully')
}


//computeObject
try {
    //should pass
    const computeObjectOne = objects.computeObject({ a: 3, b: 7, c: 5 }, n => n / 2);
    console.log('computeObject passed successfully');
} catch (e) {
    console.error('computeObject failed successfully');
}

try {
    //should fail
    const computeObjectTwo = objects.computeObject({x: "testing"}, n => n *2);
    console.error('computeObject did not error');
} catch (e) {
    console.log('computeObject failed successfully')
}


