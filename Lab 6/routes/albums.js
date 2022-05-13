const express = require('express');
const { ObjectId } = require('mongodb');
const { bands } = require('../config/mongoCollections');
const router = express.Router();
const data = require('../data');
const albumsData = data.albums;
const bandsData = data.bands;

router.get('/:id', async(req, res) => { //return array of all albums given id
    try {
        const bandid = req.params.id;
        const albums = await albumsData.getAll(bandid); 
        if ((!bandid)) {
            return res.status(404).json({error: "ID MUST BE INPUTTED"});
        }
        if (!ObjectId.isValid(bandid)){
            return res.status(400).json({ error: "ID NOT VALID"});
        }
        if ((albums.length === 0)){
            return res.status(404).json({error: "NO ALBUMS IN THE BAND"});
        }
        res.json(albums);
        res.status(200);
    } catch (e) {
        return res.status(400).json({error: "ALBUM BY ID IS NOT FOUND"});
    }
})

router.post('/:id', async(req, res) => {
        const id = req.params.id;
        const albumsInfo = req.body;
        if (!albumsInfo.title || !albumsInfo.releaseDate || !albumsInfo.tracks){
            return res.status(400).json({error: "title/releaseDate/tracks MUST BE PROVIDED"})
        }
        if (typeof albumsInfo.bandId !== 'string'|| typeof albumsInfo.title !== 'string' || typeof albumsInfo.releaseDate !== 'string'){
            return res.status(400).json({error: "id/title/releaseDate MUST BE A STRING"})
        }
        if (albumsInfo.bandId.trim().length === 0 || albumsInfo.title.trim().length === 0 || albumsInfo.releaseDate.trim().length === 0){
            return res.status(400).json({error: "id/title/releaseDate STRINGS MUST BE NON-EMPTY"})
        }
        if (!ObjectId.isValid(albumsInfo.bandId)){
            return res.status(400).json({error: "NOT A VALID ID"})
        }
         if (!Array.isArray(albumsInfo.tracks)) {
            return res.status(400).json({error: "TRACKS NOT AN ARRAY"})
        }
        if (albumsInfo.tracks.length < 3) {
            return res.status(400).json({error: "ELEMENTS MUST BE AT LEAST 3"})
        }
        for (let i= 0; i < albumsInfo.tracks.length; i++) {
            if (typeof tracks[i] !== 'string') {
                return res.status(400).json({error: "EACH ELEMENT MUST BE A STRING"});
            }
        }
        if ((typeof albumsInfo.releaseDate !== 'string')) {
            return res.status(400).json({error: "RELEASE DATE MUST BE IN THE FORM OF A STRING"})
        }

        if (albumsInfo.releaseDate.trim().length === 0){
            return res.status(400).json({error: "STRING MUST BE NON-EMPTY"})
        }
        let dateFormat = albumsInfo.releaseDate.split("/");
        if (dateFormat.length != 3) {
            return res.status(400).json({error: "DATE MUST BE IN 3 PARTS (IN ORDER): MONTH, DAY, YEAR!"})
        }
        // mm/dd/yy --> 0 - MM, 1 - DD, 2 - YYYY
        let month = parseInt(dateFormat[0]);
        let day = parseInt(dateFormat[1]);
        let year = parseInt(dateFormat[2]);
        if ((month < 0) || (month > 12)) {
            return res.status(400).json({error: "INVALID MONTH!"})

        }  
        if ((month == 1) || (month == 3 ) || (month == 5) || (month == 7) 
        || (month == 8) || (month == 10) || (month == 12)) {
            if (day > 31) {
                return res.status(400).json({error: "THESE MONTHS MUST HAVE 31 DAYS!"})
            }
        }
        if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
            if (day > 30) {
                return res.status(400).json({error: " THESE MONTHS MUST HAVE 30 DAYS!"})
            }
        }
        if ((month == 2) && (day > 28)) {
            return res.status(400).json({error: "THIS MONTH MUST HAVE 28 DAYS!"})

        } 
        if ((year < 1900) || (year > 2023)) {
            return res.status(400).json({error: "YEAR MUST BE BETWEEN 1900-2023"})
        }
        //error check #8
        if (isNaN(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({error: "RATING MUST BE A NUMBER BETWEEN 1-5"})
        }
    
    try{//get the band by id --- if there is no band with that id throw
        await bandsData.get(id);
    } catch(e) {
        return res.status(400).json({error: "NO BAND WITH THAT ID FOUND"})
    }
    try{ //create new album
        const createAlbum = await albumsData.create(id, albumsInfo);
        res.json(createAlbum);
        res.status(200);
    }catch(e){
        return res.status(400).json({error: e});
    }
})


router.get('/album/:id', async(req,res) =>{
    try{
        const albumId = req.params.id;
        if (!ObjectId.isValid(albumId)){
            return res.status(400).json({error: "NO BAND WITH THAT ID FOUND"});
        }
        const getalbum = await albumsData.get(albumId);
        res.json(getalbum);
        res.status(200);
    } catch(e){
        return res.status(404).json({error: e})
    }
})

router.delete('/:id', async(req,res) => { //incomplete
    const albumid = req.params.id;
    if (!ObjectId.isValid(albumid)) {
        return res.status(400).json({error: e});
    }       
    try{ // remove
       await albumsData.remove(albumid);
       res.json({"albumid": albumid, "deleted": true});
       res.status(200)
    } catch(e){
        return res.status(404).json({error: e})
    }
})
module.exports=router;