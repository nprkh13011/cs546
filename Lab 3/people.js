const axios = require('axios');

function InputCheck_String(string){
    if (!string) {
        throw "INPUT MUST EXIST"
    }
    if (typeof string !== 'string'){
        throw "INPUT MUST BE A STRING!"
    }
    if (string.trim().length <= 0) {
        throw "INPUT MUST NOT BE EMPTY"
    }

}
function InputCheck_Num(num){
    if (!num) {
        throw "INPUT MUST EXIST!";
    }
    if (typeof num !== 'number'){
        throw "INPUT MUST BE A STRING!";
    }
    if (num < 0) {
        throw "INPUT MUST NOT BE EMPTY!";
    }

}

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data; // this will be the array of people objects
  }

async function getPersonById(id) { // doesnt work with person not found condition
    /*
    return the person given ID
    Note: id is case sensitive
    */
    InputCheck_String(id);
    const people = await getPeople();
    
    let result = [];
    let personFound = false;
    for (let i = 0; i< people.length; i++) {    
        if (id < 0) {
           throw "OUT OF BOUNDS";
        } 
        if (people[i]["id"] === id) {
            result = people[i];
            personFound = true
        }
    }
    if(!personFound) {
        throw "Person Not Found";
    }
    return result;
}
async function sameEmail(emailDomain){
    /*
    check emailDomain exists, proper type (string), < 2 - throw error,
    if its empty string or just spaces - error, no dots, 
    must have atleast 2 letters after dot, must be case in-sensitive 

    return array of objects of those with same email address domain
        - iterate through the array of objects, get the email for each object
        if each object matches including the dot, convert the string either Upper or lowercase
    */
    InputCheck_String(emailDomain); // first and third case
    const people = await getPeople();
    // let email_domain = null;
    let result = [];
    // let count = 0;
   // let email_domain = emailDomain.split('@');
   let split_dot = emailDomain.split("."); // split ->array of strings


    if (!emailDomain.includes(".")) { // dot error check
        throw "ERROR: NOT A VALID EMAIL DOMAIN!"
    }
    for (let j=0; j < split_dot.length; j++) {
        if (split_dot[j].length < 2) {
            throw "ERROR: MUST HAVE AT LEAST 2 LETTERS AFTER THE DOT!"
        }
    }
    for (let i = 0; i < people.length; i++) {
        let person_email = people[i]["email"].toLowerCase(); // get email
        if (person_email.includes(emailDomain.toLowerCase())) {// if it includes the input
             result.push(people[i]) // push into the list of objects with similar domain names
        } 
        
    }
    if (result.length < 2) {
        throw "ERROR: RESULTS MUST RETURN AT LEAST 2 PEOPLE!"
    }
    
    return result;
}
async function manipulateIp(){
    // get the data of each IP address
    // convert all IP addresses to numbers remove the dots 
    // average them after removing the dots
    // sort each IP field ascendingly,
    // contain person's first last name with highest, lowest number
    const people = await getPeople();
    let ip_address = null;
    let sum = 0;
    let max=0;
    let obj = {};
    let obj2 = {};
    let min= Number.MAX_VALUE;
    people.forEach((element) => {  
        ip_address = element["ip_address"]; // get data of the ip address
        let ip_address_num = parseInt(ip_address.split(".").join("").split("").sort().join("")); // remove the dots & sort 
        if (ip_address_num > max){ // highest
            max = ip_address_num; // set as the new 
            obj["first_name"] = element["first_name"]; 
            obj["last_name"] = element["last_name"];
        }
        if (ip_address_num < min){ //lowest
            min = ip_address_num; 
            obj2["first_name"] = element["first_name"]; 
            obj2["last_name"] = element["last_name"];
        }
        sum += ip_address_num; //sums all elements in object
    })
    let size = people.length;
    let result = Math.floor(sum/size);
    let final_result = {
        highest: obj,
        lowest: obj2,
        average: result
    }
    return final_result;
    }
    
async function sameBirthday(month, day){
    // return an array of of all people with the same birthday
    if ((!month) || (!day)) {
        throw "ERROR: MONTH OR DAY MUST EXIST!";
    }
    if (typeof month === 'string') {
        if (month.trim().length <= 0) {
            throw "ERROR: INPUT MUST NOT BE EMPTY"
        }
        month = parseInt(month);
    }
    if (typeof day === 'string') {
        if (day.trim().length <= 0) {
            throw "ERROR:INPUT MUST NOT BE EMPTY";
        }
        day = parseInt(day);
    }
    if ((typeof month !== 'number') || (typeof day !== 'number')){
        throw "ERROR: MONTH OR DAY MUST BE A NUMBER!";
    }
    if ((month < 1) || (month > 12)) {
        throw "ERROR: MONTH MUST BE 1-12!";
    }
    if ((month == 1) || (month == 3 ) || (month == 5) || (month == 7) 
    || (month == 8) || (month == 10) || (month == 12)) {
        if (day > 31) {
            throw "ERROR: THESE MONTHS MUST HAVE 31 DAYS!"
        }
    }
    if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
        if (day > 30) {
            throw "ERROR: THESE MONTHS MUST HAVE 30 DAYS!"
        }
    }
    if ((month == 2) && (day > 28)) {
        throw "ERROR: THIS MONTH MUST HAVE 28 DAYS!"
    }
    const people = await getPeople();
    let temp = [];
    for (let i = 0; i < people.length; i++) {
        let birthday = people[i]["date_of_birth"];
        let birthdayArr = birthday.split("/");
        let birthMonth = parseInt(birthdayArr[0]);
        let birthDay = parseInt(birthdayArr[1]);
        if (month == birthMonth && day == birthDay) {
            temp.push(people[i].first_name + " " + people[i].last_name);
        }
    }
    return temp;   
}


module.exports = {
    getPeople,
    getPersonById,
    sameEmail,
    manipulateIp,
    sameBirthday
}