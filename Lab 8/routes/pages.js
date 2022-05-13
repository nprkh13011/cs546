const express = require('express');
const data = require('../data');
const pagesData = data.pages;
const router = express.Router();

// GET http://localhost:3000/ - search form to start a search of shows for a keyword 
// render takes in 2 param, the file we wanna render, and the data we want to add
// render - showing the output in the browser
router.get('/', async(req, res) => { //getall?
    try {
        res.render('pages/showFinder');
    } catch (e) {
        return res.status(404).render({error: "SHOW FINDER CAN'T BE FOUND!"})
    }
})

// POST http://localhost:3000/searchshows/
// makes the axios call to the search endpoin
// return max 5 result that contain req form param 'showSearchTerm
router.post('/searchshows', async(req, res) => { 
    try{
        console.log(1);
        let searchTerm = req.body.showSearchTerm;
        console.log(searchTerm);        
    
        if (!searchTerm){
            console.log(2)
            return res.status(400).render('pages/showFinder', 
            {class: "empty-input",
            error: "Input must be inputted"});
        }

        if (searchTerm.trim().length === 0) {
            console.log(3)
            return res.status(400).render('pages/showFinder',
            {class: "empty-spaces",
            error: "Search term must not have empty spaces"});
        }

        const search = await pagesData.getShowsBySearchTerm(searchTerm);
        console.log(4)
        if (search.length === 0){
            return res.render('pages/error', {
                class: "show-not-found",
                showSearchTerm: searchTerm
            });
        }
        console.log(5)
        return res.render('pages/showsFound', {title: "Shows Found", shows: search, searchTerm: searchTerm});
    }
    catch(e){
        console.log(6)
        return res.status(404).render({error: e});
    }
})

//GET http://localhost:3000/show/:id
//using Id parameter in URL, respond with HTML document
router.get('/show/:id', async(req, res) => { //get
    let id = req.params.id;
    // console.log(1)
        if (!id) {
            // console.log(2)
            return res.status(400).render('pages/showNameByID',
            {class: "no-id",
            error: "ID must be inputted"});
        }
        if (isNaN(id)){
            return res.status(400).render('pages/showNameByID', {
            class: "not-a-number",
            error: "ID must be a number only"
            });
        }
        
        //filter pure string values and still not a number
        if (isNaN(parseInt(id)) || (parseInt(id) < 0)) {
            // console.log(3)
            return res.status(400).render('pages/showNameByID',
            {class: "not-a-number",
            error: "Id Must be a positive number"});
        }
    try {
        const showbyid = await pagesData.getShowsById(id);
        res.render('pages/showNameByID', {title: showbyid.name, show: showbyid});
    } catch (e) {
        return res.status(404).render({
            class: 'show-not-found',
            error: `We're sorry, but no results were found for ${id}.`
        });
    }
})

module.exports = router;
