const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const data = require('../data');
const bandsData = data.bands;

router.get('/', async(req, res) => { //getAll
    try {
        const bands = await bandsData.getAll();
        let result = [];
        for (let i = 0; i < bands.length; i++){
            let obj = {
                _id : bands[i]._id,
                name: bands[i].name
            }
            result.push(obj);
        }
        return res.json(result);
    } catch (e) {
        return res.status(500).json({error: e})
    }
})

router.post('/', async(req, res) => { 
    // const bands = await bandsData.create
    let bandsInfo = req.body;
    if (!bandsInfo.name || !bandsInfo.genre || !bandsInfo.website || !bandsInfo.recordLabel ||  !bandsInfo.bandMembers || !bandsInfo.yearFormed) {
        return res.status(400).json({error: "All fields must be inputted"});
    }
    if (typeof bandsInfo.name !== 'string' || typeof bandsInfo.website !== 'string' || typeof bandsInfo.recordLabel !== 'string') {
        return res.status(400).json({error: "name/website/recordlabel must be a string"});
    }
    if (bandsInfo.name.trim().length === 0 || bandsInfo.website.trim().length === 0 || bandsInfo.recordLabel.trim().length === 0) {
        return res.status(400).json({error: "name/website/recordlabel must be NON EMPTY string"});
    }
     if ((bandsInfo.website.includes("http://www.") && (bandsInfo.website.includes(".com")))) {
        let split = bandsInfo.website.split("."); // split at the dot
        if (split[1].length < 5) { // if there are less than 5 character -- [1] being in
           return res.status(400).json({error: "Website must be valid"});
        }
    }
    if (!Array.isArray(bandsInfo.genre) || !Array.isArray(bandsInfo.bandMembers)) {
        return res.status(400).json({error: "genre/bandmembers must be stored in arrays"});
    }
    if ((typeof bandsInfo.yearFormed !== 'number') || (bandsInfo.yearFormed < 1900) || (bandsInfo.yearFormed > 2022)) {
        return res.status(400).json({error: "yearformed must be valid"});
    }
    try { 
        bandsInfo.albums = []
        bandsInfo.overallRating = 0;
        const band = await bandsData.create(
            bandsInfo.name, 
            bandsInfo.genre,
            bandsInfo.website,
            bandsInfo.recordLabel,
            bandsInfo.bandMembers,
            bandsInfo.yearFormed
        );
        res.status(200).json(band);
    } catch (e) {
        return res.status(400).json({error: e});
    }
})

router.get('/:id', async(req, res) => { //get
    try { 
        let Id = req.params.id;
        if (!ObjectId.isValid(Id)){
            return res.status(400).json({error: "ID not valid"});
        }
        const bands = await bandsData.get(Id);
        res.status(200).json(bands);
    } catch (e) {
        return res.status(400).json({error: e});
    }
})

router.put('/:id', async(req, res) => { //get
    const Id = req.params.id;
    const updatedBands = req.body;
    try { //get the data of the band
        
        if (!ObjectId.isValid(Id)){
            return res.status(400).json({error: "ID not valid"})
        }
        if (!bandsInfo.name || !bandsInfo.genre || !bandsInfo.recordLabel ||  !bandsInfo.bandMembers || !bandsInfo.yearFormed) {
            return res.status(400).json({error: "All fields must be inputted"});
        }
        if ((bandsInfo.website.includes("http://www.") && (bandsInfo.website.includes(".com")))) {
            let split = bandsInfo.website.split("."); // split at the dot
            if (split[1].length < 5) { // if there are less than 5 character -- [1] being in
                return res.status(400).json({error: "Website must be valid"});
            }
        }
        if (!Array.isArray(bandsInfo.genre) || !Array.isArray(bandsInfo.bandMembers)) {
            return res.status(400).json({error: "genre/bandmembers must be stored in arrays"});
        }
        if ((typeof bandsInfo.yearFormed !== 'number') || (bandsInfo.yearFormed < 1900) || (bandsInfo.yearFormed > 2022)) {
            return res.status(400).json({error: "yearformed must be valid"});
        }
        const bandsId = await bandsData.get(Id);
        res.json(bandsId);
    } catch (e) {
        return res.status(404).json({error: e});
    }
    try { //update the band
        const updateBand = await bandsData.update(Id, updatedBands);
        res.json(updateBand);
        res.status(200);
    } catch(e) {
        return res.status(500).json({error: e});
    }
})

router.delete('/:id', async(req,res) => {
    const Id = req.params.id;
    if(!ObjectId.isValid(Id)) {
       return res.status(400).json({error: 'Not Valid Id'});
    }
    try{// get the data
        await bandsData.get(Id);
    } catch(e) {
        return res.status(404).json({error: 'Band not Found'});
    }

    try { // delete the specific
        await bandsData.remove(Id);
        res.status(200).json({bandId: Id, deleted: true});
    } catch (e) {
        return res.status(404).json({error: e});
    }

})

module.exports= router;