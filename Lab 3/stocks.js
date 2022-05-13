const people = require("./people");
const axios = require('axios');

function InputCheck_String(string){
    if (!string) {
        throw "INPUT MUST EXIST!"
    }
    if (typeof string !== 'string'){
        throw "INPUT MUST BE A STRING!"
    }
    if (string.trim().length <= 0) {
        throw "INPUT MUST NOT BE EMPTY!"
    }

}

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data;
}
async function getStocks() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data;
}

async function listShareholders(stockName) {
    // return an object that has the stock data for the stockName
    // use userid's in people.json and return the user's first name and last 
    InputCheck_String(stockName);
    const stocks = await getStocks();
    let result = {}; // stores the whole
    let shareHolders = [];
    for (let i = 0; i< stocks.length; i++) {    
        if (stocks[i]["stock_name"] === stockName) { // got the object from stocks
           result = stocks[i];
           break;
        }
    } 
    if (Object.keys(result).length === 0){ // if it doesn't exist
        throw "ERROR: STOCK NAME DOES NOT EXIST"
    }
    for (let j = 0; j < result.shareholders.length; j++) {
        let person = await people.getPersonById(result.shareholders[j].userId);
        let obj = {
            first_name : person.first_name,
            last_name : person.last_name,
            number_of_shares : result.shareholders[j].number_of_shares 
        };
        shareHolders.push(obj);
    }
    let final_result = {
        id : result.id,
        stock_name: result.stock_name,
        shareholders: shareHolders 
    }
    return final_result;

}

async function totalShares(stockName) {
    /*
    error check
    find the company from stocks.json
    calculate how many shareholders that company has
    calculate how many total shares people own
    */
    InputCheck_String(stockName);
    const stocks = await getStocks();
    let result_of_objects = {};
    let total_shares =0;
    for (let i = 0; i< stocks.length; i++) {    
        if (stocks[i]["stock_name"] === stockName) {
            result_of_objects = stocks[i]; // gets all the info from the stockName
            break;
        }
    }
    if (Object.keys(result_of_objects).length === 0){ // if it doesn't exist
        throw "ERROR: STOCK NAME DOES NOT EXIST";
    }
    if (result_of_objects.shareholders.length === 0){ // if there aren't any shareholders
        return `${stockName} currently has no shareholders.`;
    }
    let totalshareholders = result_of_objects["shareholders"].length;
    //loop through total number of shares
        /* alternative:  result_of_objects.shareholders.forEach(element =>{
            total_shares += element.number_of_shares})*/
    for (let j = 0; j < totalshareholders; j++){
        total_shares += result_of_objects.shareholders[j].number_of_shares; // for each obj inside shareholders
        if (totalshareholders === 1) {
            return (`${stockName} has ${totalshareholders} shareholder that own a total of ${total_shares} shares.`)
        }  
    }
    return (`${stockName} has ${totalshareholders} shareholders that own a total of ${total_shares} shares.`);
}
async function listStocks(firstName, lastName) {
    /*
    error check
    find the person in people.json
    if found, get their id
    find out number of stocks and number of shares
    return array of objects
    */
   const stocks = await getStocks();
   const people = await getPeople();
    if (!firstName || !lastName) {
        throw "ERROR: FIRST AND/OR LAST NAME MUST EXIST!";
    }
    if (typeof firstName !== 'string' || typeof lastName !== 'string') {
        throw "ERROR: FIRST AND/OR LAST NAME MUST BE A STRING!"
    }
    if ((firstName.trim().length === 0) || (lastName.trim().length === 0)){
        throw "ERROR: FIRST AND/OR LAST NAME MUST NOT BE EMPTY!"
    }
    let id_people = "";
    let result_stocks = [];
    let final_result = [];
        // iterate through people to get the id
    
    for (let i=0; i < people.length; i++){
        // if either first name or last name matches
        if (people[i]["first_name"] === firstName && people[i]["last_name"] === lastName) {
            id_people = people[i]["id"]; // get their id
            // console.log(people[i]["id"]);
            break;  
        }   
    }
    if(id_people.length === 0) { //in the case that the id is empty/not valid
        throw "ERROR: DOES NOT EXIST IN PEOPLE.JSON"
    }
        // iterate through stock to find shareholders
    for (let j =0; j <stocks.length; j++) {
        result_stocks = stocks[j]; // gets all the info from stocks
        let shareHolders = result_stocks.shareholders;
        for (let k = 0; k <shareHolders.length; k++) {
            if (id_people === shareHolders[k].userId) {
                // save # of stocks this person has
                let obj = {
                    stock_name: stocks[j]["stock_name"],
                    number_of_shares : shareHolders[k]["number_of_shares"]
                };
                // obj.stock_name = obj[stocks[j].stock_name] 
                // obj.shareHolders =shareHolders[k].number_of_shares;
                final_result.push(obj) 
            }
        }
    }
    return final_result;
    }


async function getStockById(id){
    /*
    return the stock given ID
    Note: id is case sensitive
    */
    InputCheck_String(id);
    const stocks = await getStocks();

    let result = [];
    let stockFound = false;
    if (id < 0) {
        throw "OUT OF BOUNDS";
    } 
    for (let i = 0; i< stocks.length; i++) {    
        if (stocks[i]["id"] === id) {
           result = stocks[i];
           stockFound = true;
        }
    }
    if(!stockFound) {
        throw "Stock Not Found";
    }

    return result;
}

module.exports ={
    listShareholders,
    totalShares,
    listStocks,
    getStockById
}

