function InputCheck(string) {
    if (!string) {
        throw "Error: String does not exist!";
    }
    if (typeof string !== 'string') {
        throw "Error: It is not a string!";
    }
    if (string.trim().length <= 0) {
        throw "Error: String is length 0!";
    }
    

}

function replaceUppercase(string) {
    return string.toUpperCase();
}
// Utilized https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
module.exports = { 
    camelCase: (string) => { 
        InputCheck(string);
        let re = /[^a-zA-Z0-9]+(.)/g; // regex
        let lowerString = string.toLowerCase();
        return lowerString.replace(re, replaceUppercase).split(" ").join("");
    },
    replaceChar: (string) => {
        InputCheck(string);
        let startChar = string.charAt(0);
        let replaceWith = '*';
        let result = string.split(''); // separate into arrays
        for (let i = 1; i < string.length; i++) {
            if (startChar.toLowerCase() === string.charAt(i).toLowerCase()) {
                result[i] = replaceWith; //in the result array, it replaces at i index 
                if (replaceWith === '*') {
                    replaceWith = '$';
                } else {
                    replaceWith = '*';
                }
            }
        }
        return result.join('');
    },

    //Utilized https://stackoverflow.com/questions/25345108/why-cant-i-swap-characters-in-a-javascript-string/25345144
    mashUp: (string1, string2) => { 
        if ((typeof string1 !== 'string') || (typeof string2 !== 'string')) {
            throw "Error: One of these inputs are not a string!";
        }
        if ((!string1) || (!string2)) { // both strings need exist
            throw "Error: Strings need to exist!";
        }
        if ((string1.trim().length < 2) || (string2.trim().length < 2)) {
            throw "Error: String1 and string2 both must be AT LEAST 2!";
        }
        
        let String1 = string1.split(''); // separate into arrays
        let String2 = string2.split('');
        let temp = String1[0]; // first character
        String1[0] = String2[0];
        String2[0] = temp;
        temp = String1[1];     // second character
        String1[1] = String2[1];
        String2[1] = temp;
        let concatenate = String1.concat(" ", String2);
        return concatenate.join('');

    }


}