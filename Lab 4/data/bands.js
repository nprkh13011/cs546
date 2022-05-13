const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');
// const { ObjectID } = require('bson');

function InputCheckArray(array) {
    if (array.length === 0) {
        throw "ERROR: ARRAY SHOULD NOT BE EMPTY"
    }
    for (let i = 0; i < array.length; i++) {
        if ((typeof array[i] != 'string') || (array[i].trim().length === 0)) {
            throw "ERROR: ARRAY SHOULD NOT HAVE EMPTY STRING ELEMENTS";
        }
    }
}

async function create(name, genre, website, recordLabel, bandMembers, yearFormed) {
    const bandsCollection = await bands();

    InputCheckArray(genre);
    InputCheckArray(bandMembers); // making sure the elements arent empty string

    // error checking
    if ((!name) || (!genre) || (!website) || (!recordLabel) || (!bandMembers) || (!yearFormed)) { // error check #1
        throw "ERROR: ALL FIELDS MUST HAVE AN INPUT!"
    }
    // error check #2
    if ((typeof name !== 'string') || (typeof website !== 'string') || (typeof recordLabel !== 'string')) {
        throw "ERROR: NAME/WEBSITE/RECORD_LABEL MUST BE A STRING!";
    }
    // error Check #2
    if ((name.trim().length === 0) || (website.trim().length === 0) || (recordLabel.trim().length === 0)) {
        throw "ERROR: NAME/WEBSITE/RECORD_LABEL MUST NOT BE EMPTY!"
    }
    // error check #3 -- incomplete
    if ((website.includes("http://www.") && (website.includes(".com")))) {
        let split = website.split("."); // split at the dot
        if (split[1].length < 5) { // if there are less than 5 character -- [1] being in
            throw "ERROR: MUST HAVE AT LEAST 5 CHARACTERS IN BETWEEN WWW. & .COM!";
        }
    }
    // error check #4
    if (!Array.isArray(genre) || !Array.isArray(bandMembers)) {
        throw "ERROR: GENRE/BAND_MEMBERS MUST BE AN ARRAY!"
    }
    // error check #5
    if ((typeof yearFormed !== 'number') || (yearFormed < 1900) || (yearFormed > 2022)) {
        throw "ERROR: YEAR MUST BE A NUMBER - BETWEEN 1900 AND 2022!"
    }
    // let newID
    let newBands = {
        name: name,
        genre: genre,
        website: website,
        recordLabel: recordLabel,
        bandMembers: bandMembers,
        yearFormed: yearFormed
    }
    const insertInfo = await bandsCollection.insertOne(newBands);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw "ERROR: COULD NOT ADD BAND";
    }
    const newId = insertInfo.insertedId.toString();
    const band = await get(newId);
    band._id = band._id.toString();
    return band;
}

async function getAll() {
    const bandsCollection = await bands();
    const bandsList = await bandsCollection.find({}).toArray();
    if (!bandsList) {
        throw "ERROR: COULD NOT GET ALL BANDS";
    }
    for (let i = 0; i < bandsList.length; i++) {
        bandsList[i]["_id"] = bandsList[i]["_id"].toString();
    }
    return bandsList;

}

async function get(id) {
    const bandsCollection = await bands();

    if (!id) {
        throw "ERROR: ID MUST BE PROVIDED!";
    }
    if (typeof id !== 'string') {
        throw "ERROR: ID MUST BE A STRING";
    }
    if (id.trim().length === 0) {
        throw "ERROR: ID CAN'T BE EMPTY STRING";
    }
    id = id.trim();
    if (!ObjectId.isValid(id)) {
        throw "ERROR: NOT A VALID ID - DOESN'T EXIST!";
    }
    const band_music = await bandsCollection.findOne({ _id: ObjectId(id) });
    
    if (band_music === null) {
        throw "ERROR: NO BAND WITH THAT ID";
    }
    for (let i = 0; i < band_music.length; i++) {
        band_music[i]["_id"] = band_music[i]["_id"].toString();
    }
    band_music._id = band_music._id.toString();
    return band_music;
}

async function remove(id) {
    const bandsCollection = await bands();
    const band = await get(id);
    if (!id) {
        throw "ERROR: ID MUST BE PROVIDED!";
    }
    if (typeof id !== 'string') {
        throw "ERROR: ID MUST BE A STRING";
    }
    if (id.trim().length === 0) {
        throw "ERROR: ID CAN'T BE EMPTY STRING";
    }
    id=id.trim();
    if (!ObjectId.isValid(id)) {
        throw "ERROR: NOT A VALID ID - DOESN'T EXIST!";
    }
    const deleteId = await bandsCollection.deleteOne({_id: ObjectId(id)});
    if (deleteId.deletedCount === 0) { // if band can't be removed
        throw `ERROR: CAN'T DELETE BAND WITH ID OF ${id}`;
    }

    return band.name + " has been successfully deleted!";
}

async function rename(id, newName) {
    const bandsCollection = await bands();
    // const bands = await get(id);
    if (!id) {
        throw "ERROR: ID MUST BE PROVIDED!";
    }
    if (typeof id !== 'string') {
        throw "ERROR: ID MUST BE A STRING!";
    }
    if (id.trim().length === 0) {
        throw "ERROR: ID CAN'T BE EMPTY STRING!";
    }
    id=id.trim();
    if (!ObjectId.isValid(id)) {
        throw "ERROR: NOT A VALID ID - DOESN'T EXIST!";
    }
    if (!newName) {
        throw "ERROR: newName MUST BE PROVIDED!"
    }
    if (typeof newName !== 'string') {
        throw "ERROR: newName MUST BE A STRING!"
    }
    if (newName.trim().length === 0) {
        throw "ERROR: newName CANNOT BE EMPTY STRING!"
    }

    const updatedBand = {
         name : newName, 
    }
  
    const updatedInfo = await bandsCollection.updateOne(
        {_id: ObjectId(id)},
        { $set: updatedBand}
    )

    if (updatedInfo.modifiedCount === 0) {
        throw "ERROR: COULD NOT UPDATE BAND SUCCESSFULLY"
    }
    return await this.get(id);
}

module.exports = {
    create,
    getAll,
    get,
    remove,
    rename
}
