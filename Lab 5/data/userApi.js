const axios = require('axios');

function checkId(id) {
    if (!id) throw 'Error: You must provide an id to search for';
    if (typeof id !== 'string') throw 'Error: id must be a string';
    id = id.trim();
    if (id.length === 0)
      throw 'Error: id cannot be an empty string or just spaces';
    return id;
  }

let exportedMethods = {
    async getPeople(){
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
        return data; // this will be the array of people objects
      },
    async getWork() {
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json')
        return data;
    },
    async getPersonById(id) { 
        checkId(id); 
        const people = await exportedMethods.getPeople();

        let result = [];
        let personFound = false;
        for (let i = 0; i< people.length; i++) {    
            if (id < 0) {
                throw "OUT OF BOUNDS";
            } 
            
            if (people[i]["id"] == id) {
                result = people[i];
                personFound = true
            }
        }
        if(!personFound) {
            throw "Error: Person Not Found";
        }
        return result;
    },
    async getWorkById(id){
        checkId(id); 
        const work = await exportedMethods.getWork(); 

        let result = [];
        let workFound = false;
        for (let i = 0; i< work.length; i++) {    
            if (id < 0) {
            throw "OUT OF BOUNDS";
            } 
            
            if (work[i]["id"] == id) { //== consider a string of int and int as equal, but === considers data type as equal
                result = work[i];
                workFound = true
            }
        }
        if(!workFound) {
            throw "Work id Not Found";
        }
        return result;
    }
}

module.exports = exportedMethods;