const mongoCollections = require('../config/mongoCollections');
const bandData = require("./bands");
const bands = mongoCollections.bands;
const albums = mongoCollections.albums;
const { ObjectId } = require('mongodb');

const exportedMethods = {
    async create(bandId, title, releaseDate, tracks, rating) { 
        // error checking #1
        if ((!bandId) || (!title) || (!releaseDate) || (!tracks) || (!rating)) { // error check #1
            throw "ERROR: ALL FIELDS MUST HAVE AN INPUT!"
        }
        // error check #2
        if ((typeof bandId !== 'string') || (typeof title !== 'string') || (typeof releaseDate !== 'string')) {
            throw "ERROR: BANDID/TITLE/RELEASEDATE MUST BE A STRING!";
        }
        // error Check #2
        if ((bandId.trim().length === 0) || (title.trim().length === 0) || (releaseDate.trim().length === 0)) {
            throw "ERROR: BANDID/TITLE/RELEASEDATE MUST NOT BE EMPTY!"
        }
        // error check #3 
        bandId = bandId.trim();
        if (!ObjectId.isValid(bandId)) {
            throw "ERROR: NOT A VALID ID - DOESN'T EXIST!";
        }
        // error check #5
        if (!Array.isArray(tracks)) {
            throw "ERROR: TRACKS MUST BE AN ARRAY!";
        }
        if (tracks.length < 3) {
            throw "ERROR: ELEMENTS MUST BE ATLEAST 3";
        }
        for (let i= 0; i < tracks.length; i++) {
            if (typeof tracks[i] !== 'string') {
                throw "ERROR: EACH ELEMENT MUST BE A STRING!"
            }
        }
        // error check #6
        if ((typeof releaseDate !== 'string') || (releaseDate.trim().length === 0)) {
            throw "ERROR: RELEASE DATE MUST BE IN THE FORM OF A STRING"
        }
        //error check #7
        let dateFormat = releaseDate.split("/");
        if (dateFormat.length != 3) {
            throw "ERROR: DATE MUST BE IN 3 PARTS (IN ORDER): MONTH, DAY, YEAR!"
        }
        // mm/dd/yy --> 0 - MM, 1 - DD, 2 - YYYY
        let month = parseInt(dateFormat[0]);
        let day = parseInt(dateFormat[1]);
        let year = parseInt(dateFormat[2]);
        if ((month < 0) || (month > 12)) {
            throw "ERROR: INVALID MONTH!"
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
        if ((year < 1900) || (year > 2023)) {
            throw "ERROR: YEAR MUST BE BETWEEN 1900-2023"
        }
        //error check #8
        if (isNaN(rating) || rating < 1 || rating > 5) {
            throw "ERROR: RATING MUST BE A NUMBER BETWEEN 1-5"
        }

        const bandsCollection = await bands();
        let updatealbums = {
            _id: new ObjectId(),
            title: title,
            releaseDate: releaseDate,
            tracks: tracks,
            rating: rating
        } 
        let parseid = ObjectId(bandId.trim());
        //temp ratings to store overall rating
        let tempRatings = rating;
        let numRatings = 1;
        //to store Albums array
        const findBand = await bandsCollection.findOne({_id: parseid});
        if (!findBand) {
            throw "ERROR: ID NOT FOUND FOR BAND"
        }
        let tempTracks = findBand.albums;
        numRatings += tempTracks.length; // to sum up the number of ratings
        for (let i =0 ; i < tempTracks.length; i++) {
            tempRatings += tempTracks[i].rating;
        }
        let newOverallRating = (tempRatings/numRatings).toFixed(1); // find the average and set to 1 decimal place
        let RatingUpdate = {
            overallRating: parseFloat(newOverallRating) 
        }
        await bandsCollection.updateOne(
            {_id: parseid},
            {$set: RatingUpdate}
        )
        const insertInfo = await bandsCollection.updateOne(
            {_id: parseid},
            {$addToSet: {albums: updatealbums}}
        );
        const newId = insertInfo.insertedId;
        let stringifyId = updatealbums["_id"].toString();
        updatealbums["_id"] = stringifyId;
        return updatealbums;
    },

    async getAll(bandId) { 
        //error checking
        if (!bandId) {
            throw "ERROR: NEEDS AN INPUT!";
        }
        if (typeof bandId !== 'string') {
            throw "ERROR: MUST BE A STRING";
        }
        if (bandId.trim().length === 0) {
            throw "ERROR: MUST NOT BE EMPTY"
        }
        bandId = bandId.trim();
        if (!ObjectId.isValid(bandId)) {
            throw "ERROR: NOT A VALID ID";
        }
        const bandsCollection = await bands();
        const bands_albums = await bandsCollection.findOne(
            {_id: ObjectId(bandId)}
            );
        if (!bands_albums) {
            throw "ALBUM DOES NOT EXIST"
        }
        for (let i=0; i < bands_albums.albums.length; i++){
            bands_albums.albums[i]._id = bands_albums.albums[i]._id.toString();
        }
        
        return bands_albums.albums;

    },
    async get(albumId) { //return the object given the album id
        if (!albumId) {
            throw "ERROR: ID MUST BE PROVIDED!";
        }
        if (typeof albumId !== 'string') {
            throw "ERROR: ID MUST BE A STRING";
        }
        if (albumId.trim().length === 0) {
            throw "ERROR: ID CAN'T BE EMPTY STRING";
        }
        albumId = albumId.trim();
        if (!ObjectId.isValid(albumId)) {
            throw "ERROR: NOT A VALID ID - DOESN'T EXIST!";
        }
        const bandsCollection = await bands();
        const getAlbums = await bandsCollection.findOne(
            { 'albums._id' : ObjectId(albumId)},
            );
        if (!getAlbums) { //error check
            throw "ERROR: ALBUM NOT FOUND!";
        }
        for (let i = 0; i < getAlbums.albums.length; i++) {
            if (getAlbums.albums[i]._id.toString() === albumId.toString()){
                getAlbums.albums[i]._id = getAlbums.albums[i]._id.toString();
                
            }
            return getAlbums.albums[i];
        }


    },
    async remove(albumId) { //does not work - incomplete
        /* idea:
            error check
            find the bands collection
            loop through to get to albums collection
            remove a specific band
            update the bands collection
            recalculate the overall rating
        */
        if (!albumId) {
            throw "ERROR: ID MUST BE PROVIDED!";
        }
        if (typeof albumId !== 'string') {
            throw "ERROR: ID MUST BE A STRING";
        }
        if (albumId.trim().length === 0) {
            throw "ERROR: ID CAN'T BE EMPTY STRING";
        }
        albumId=albumId.trim();
        if (!ObjectId.isValid(albumId)) {
            throw "ERROR: NOT A VALID ID - DOESN'T EXIST!";
        }
        //find the collection
        const bandsCollection = await bands();
        const getAlbums = await bandsCollection.findOne({'albums._id' : ObjectId(albumId)}); 
        if (!getAlbums) {
            throw "ERROR: ALBUM NOT FOUND"
        }
       let newAlbumsList = [];
        for (let i = 0; i < getAlbums.albums.length; i++) {
            // if they don't match, push the doc into a new array
            if (getAlbums.albums[i]._id.toString() !== albumId.toString()){
                newAlbumsList.push(getAlbums.albums[i]);
            }
        }   
        const insertInfo = await bandsCollection.findOneAndUpdate(
            {'albums._id' : ObjectId(albumId)},
            { $set: {'albums' : newAlbumsList}},
            {returnNewDocument: true}
        )
        
        return insertInfo; 

    } 
}
module.exports = exportedMethods;