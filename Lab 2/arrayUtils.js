function InputCheck(array) {
    if (!array) {
        throw "Error: Array does not exist!";
    }
    if (!Array.isArray(array)) {
        throw "Error: It is not an array!";
    }
    if (array.length === 0) {
        throw "Error: Array should not be empty!";
    }

} 


module.exports = {
    mean: (array) => {
        InputCheck(array);
        let sum = 0;
        array.forEach((element) => { // cant break out of a forEach 
            if (typeof element !== 'number') { // if element is not a number
                throw "Error: Array Element is not a number!";
            }
            sum += element; //sums all elements in array
        })
        let size = array.length;
        let result = sum/size;
        return result;
    },
    medianSquared: (array) => {
        InputCheck(array);
        array.forEach((element) => { 
            if (typeof element !== 'number') { 
                throw "Error: Array Element is not a number!";
            }
        })
        let sorted = array.sort();
        let median = 0;
        if (sorted.length % 2 == 1) {
            median = sorted[(array.length-1)/2];
        }
        if (sorted.length % 2 == 0) {
            let num1 = sorted[(array.length)/2];
            let num2 = sorted[((array.length)/2) - 1];
            median = (num1 + num2)/2;
        }
        return median ** 2;
    },
    maxElement: (array) => {
        InputCheck(array);
        array.forEach((element) => { 
            if (typeof element !== 'number') { // if element is not a number
                throw "Error: Array Element is not a number!";
            }
        })
        let max = 0;
        let index = 0;
        for (let i = 0; i < array.length; i++) { //accessing index, bounds, increment
            if (array[i] > max) { // take max as the already iterated element
                max = array[i];
                index = i;
            }
        }
        let result = {};
        result[max] = index;
        return result;
    },
    fill: (end, value) => { //range
        if (end === undefined) {
            throw "Error: End param does not exist!";
        }
        if (typeof end !== 'number') { // if end is not a number
            throw "Error: End param is not a number!";
        }
        if ((end < 0) || (end == 0)) {
            throw "Error: End param must be positive!";
        }
        let newArray = [];
        if (value) {
            for (let i = 0; i < end; i++) {
                newArray.push(value);
            }
        } else {
            for (let i = 0; i < end; i++) { //end is not included 
                newArray.push(i); //push(append) value of current index
            }
        }
        return newArray;
        
    },
    countRepeating: (array) => { //range
        if (!array) {
            throw "Error: Array does not exist!";
        }
        if (!Array.isArray(array)) {
            throw "Error: It is not an array!";
        }
        let object = {};
        if (array.length === 0) { // if empty array
            return object;
        } 
        for(i of array){
            if(!object[i]) { //setting the count
                object[i]=1; 
                continue;     
            }
            else {
                object[i]+=1;
            }  
        }
        let listOfKeys = Object.keys(object);
        for (j of listOfKeys) { // delete keys that == 1
            if (object[j] ==1){
                delete object[j];
            }
        }
        return object;
    },
    isEqual(arrayOne, arrayTwo) {
        if ((!arrayOne) || (!arrayTwo)) {
            throw "Error: Array does not exist!";
        }
        if ((!Array.isArray(arrayOne)) || (!Array.isArray(arrayTwo))) {
            throw "Error: It is not an array!";
        }    
        let result = true;
        if (arrayOne.length !== arrayTwo.length) {
            result = false;
        } else { 
            //https://stackoverflow.com/questions/16437307/javascript-compare-two-multidimensional-arrays
            for (let j = 0; j < arrayOne.length; j++) { // also accounts for nested arrays
                if (Array.isArray(arrayOne[j]) && Array.isArray(arrayTwo[j])) {
                    //recursion
                    if (!module.exports.isEqual(arrayOne[j], arrayTwo[j])) {//if arrays are not equal
                        result=false;
                        } 
                    }
                    
                else if (arrayOne[j] !== arrayTwo[j]) {
                    result = false;
                }
                if (Array.isArray(arrayOne[j]) != Array.isArray(arrayTwo[j])){
                    return false
                }
            }
            let sorted1 = arrayOne.sort().toString();
            let sorted2 = arrayTwo.sort().toString();
            if (sorted1 === sorted2) {
                result = true;
            }
            //in the case that the array contains string form of number
            for (let i = 0; i < arrayOne.length; i++) {
                if (((typeof arrayOne[i] !== 'string') &&  (typeof arrayTwo[i] === 'string')) 
                || ((typeof arrayOne[i] ==='string') && (typeof arrayTwo[i] !== 'string'))) { 
                        result = false;
                    }
            }
           //console.log(sorted1, sorted2, result)
        }
        return result;   
    } 
}
                    