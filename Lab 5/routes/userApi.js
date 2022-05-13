const express = require("express");
const router = express.Router();
const axios = require("axios");
const userApi = require("../data");
const userApiData = userApi.user;
router
    .route('/people')
    .get(async (req,res) => {
        try {
            //const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
            const data = await userApiData.getPeople();
            res.json(data);
        } catch (e) {
            res.status(500).json(e);
        }
    });

router 
    .route('/people/:id')
    .get(async (req,res) => {
        try {
            //error checking
            /*
            if id is not found in data
            OR
            if URL param is any other data type besides a positive whole number
            (must convert from string to number)
                throw error
            return json format
            */
            let id = req.params.id;
            // trim any extra spaces
            id = id.trim();
            //filter pure string values and still not a number
            if (isNaN(parseInt(id)) || (parseInt(id) < 0)) {
                return res.status(400).json({ ERROR: "ID must be a valid positive whole number"});
            }

            // const { data } = await axios.get(`https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json`);
            // res.json(data);
            // console.log(id);
            const people = await userApiData.getPersonById(id);
            res.json(people);
        } catch (e) {
            return res.status(404).json({message: "Route Not Found"}); // 'return' --so it doesnt crash
        }
    });


//work
router
    .route('/work')
    .get(async (req,res) => {
        try {
            // const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json')
            const data = await userApiData.getWork();
            res.json(data);
        } catch (e) {
            res.status(500).json(e);
        }
    });
router 
    .route('/work/:id')
    .get(async (req,res) => {
        try {
            //error checking
            /*
            if id is not found in data
            OR
            if URL param is any other data type besides a positive whole number
            (must convert from string to number)
                throw error
            return json format
            */
            let id = req.params.id;
            id = id.trim(); // trim any extra spaces
            //filter pure string values and still not a number
            if (isNaN(parseInt(id)) || (parseInt(id) < 0)) {
                return res.status(400).json({ ERROR: "ID must be a valid positive whole number"});
            }
            const work = await userApiData.getWorkById(id);
            res.json(work);
        } catch (e) {
            return res.status(404).json({message: "Route Not Found"}); // 'return' --so it doesnt crash
        }
    });

module.exports = router;

