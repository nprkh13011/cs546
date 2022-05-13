const axios = require('axios');

function checkId(id) {
    if (!id) throw 'Error: You must provide an id to search for';
    if (typeof id !== 'string') throw 'Error: id must be a string';
    id = id.trim();
    if (id.length === 0)
      throw 'Error: id cannot be an empty string or just spaces';
    return id;
  }

function checkSearchTerm(searchTerm) {
    if (!searchTerm) throw 'Error: You must provide a term to search for';
    if (typeof searchTerm !== 'string') throw 'Error: term must be a string';
    searchTerm = searchTerm.trim();
    if (searchTerm.length === 0) throw 'Error: term cannot be an empty string or just spaces';
    return searchTerm;
}

let exportedMethods = {
    async getShowsBySearchTerm(searchTerm){
        checkSearchTerm(searchTerm);
        const { data } = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
        return data.slice(0,5); // should return the top 5
    },
    async getShowsById(id) {
        checkId(id);
        const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
        return data;
    }
}

module.exports = exportedMethods;