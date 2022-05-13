function InputCheck(array) {
    if (!array) {
        throw "Error: Array does not exist!";
    }
    if (!Array.isArray(array)) {
        throw "Error: It is not a array!";
    }
    if (array.length == 0) {
        throw "Error: array is length 0!";
    }

}

// //Utilized https://stackoverflow.com/questions/11108877/typeof-function-fix-alternative
// let toType = function(obj) {
//     return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
//   }

function InputCheck_obj(object) {
    if ((!object)) {
        throw "Error: Object does not exist!"
    }
    if (Array.isArray(object)) {
        throw "Error: It should not be a array!";
    }
    if (object === null) {
        throw "Error: Should not be null!"
    }
    if (typeof object !== 'object') { // have all keys you need
        throw "Error: It is not an object!"; 
    }

}


module.exports = {
    makeArrays: (objects) => { 
        InputCheck(objects); // error check
        let result = [];
        for(elements of objects) {
            if (typeof elements !== 'object') { 
                throw "Error: Element is not a object!";
            }
            if (Object.keys(objects[0]).length == 0) {
                throw "Error: Object in array should not be an empty object!";
            }
            if (elements.length < 2) {
                throw "Error: Must have AT LEAST 2 objects in array";
            }
            let tempArr = Object.entries(elements);
            result = result.concat(tempArr);   
        }
        return result;

    },
    isDeepEqual: (obj1, obj2) => {
        //error check
        InputCheck_obj(obj1);
        InputCheck_obj(obj2);
        let result = true;
        let obj1length = Object.keys(obj1).length;
        let obj2length = Object.keys(obj2).length;
        if (obj1length !== obj2length) {
            result = false;
        } else { // make an array of object keys - iterate - match?
                //if result leads == an obj - recurse
            let keys1 = Object.keys(obj1);
            // let keys2 = Object.keys(obj2);
            for (key of keys1) {
                if ((typeof obj1[key] === 'object') && (typeof obj2[key] === 'object')) {
                    //recursion 
                    if (!module.exports.isDeepEqual(obj1[key], obj2[key])) {
                        return false;
                    }
                }
                if (obj1[key] !== obj2[key]) {
                    return false;
                }
            }
        }
        return result;
    },
    computeObject: (object, func) => {
        //error check
        InputCheck_obj(object);
        if (!func) {
            throw "Error: Function does not exist!";
        }
        if (typeof func !== 'function') {
            throw "Error: Type is not a function!"
        }   
        let keys = Object.keys(object);
        for (key of keys) {
            if (typeof object[key] !== 'number') {
                throw "Error: Value is not a number!";
            }

            object[key] = func(object[key]);
            
        }
        return object;
    }
}