const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const bcrypt = require("bcrypt");
const { query } = require('express');


function InputCheck(user, pass) {
    if ((!user) || (!pass)){
        throw "ERROR: USERNAME AND PASSWORD MUST BE INPUTTED";
    }
    if (typeof user !== "string") {
        throw "ERROR: USERNAME MUST BE A STRING";
    }
    user = user.trim();
    if(user.trim().length === 0){
        throw "ERROR: USERNAME CAN'T HAVE EMPTY SPACES";
    }
    if (user.trim().length < 4){
        throw "ERROR: MUST HAVE 4 OR MORE CHARACTERS"
    }
    //https://stackoverflow.com/questions/15933727/javascript-regular-expression-for-usernames-no-spaces
    let reUser = /^[a-zA-Z0-9]{4,}$/; // I did up to unlimited characters
    if (reUser.test(user) === false) {
        throw "ERROR: MUST BE A VALID STRING!";
    }
    if (typeof pass !== "string") {
        throw "ERROR: PASSWORD MUST BE A STRING!"
    }
    let rePass = /^[a-zA-Z0-9.\-_$#&@*!]{6,}$/; // I did up to unlimited characters
    if (rePass.test(pass) === false) {
        throw "ERROR: MUST BE A VALID STRING!";
    }

    
}

async function createUser(username, password) {
    const UsersCollection = await users();
    InputCheck(username, password); // making sure the elements arent empty string
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);
    //duplicate
    let duplicateUser;
    //insert username and password
    let insertData;
    try { //try catch for mongodb works
        // console.log("createUser-1")
        duplicateUser = UsersCollection.findOne({username: username});
        // console.log("duplicateUser "+JSON.stringify(duplicateUser))
        if (Object.keys(duplicateUser).length === 0){ // if there is no user like this 
            // console.log("createUser-2")
            insertData = UsersCollection.insertOne({
                username: username,
                password: hash
            }) 
           return {userInserted: true};
        } else {
            if (duplicateUser) {
            // console.log("createUser-3");
            throw "ERROR: DUPLICATE USER FOUND";
            }
        }
    } catch (e){
        // console.log("createUser-4")
        throw e;
    }
    // try{
    //     console.log("createUser-3")
    //     insertData = UsersCollection.insertOne({
    //         username: username,
    //         password: hash
    //     }) 
    //    return {userInserted: true};
    // } catch(e){
    //     console.log("createUser-4")
    //     throw e;
    // }
}

async function checkUser(username, password) {
    const UsersCollection = await users();
    InputCheck(username, password); // making sure the elements arent empty string
    
    let Query; // query the db
    let compareFoundUser; // compare the passwords
    try { //try catch for mongodb works
        // console.log("checkUser-0")
        Query = await UsersCollection.findOne(
            {username: username}
        );
        // console.log("query "+JSON.stringify(Query))
        // if (!Query){ // if there is a username not found
        if (Object.keys(Query).length === 0) {
            // console.log("checkUser-1")
            throw "Either the username or password is invalid";
        }
        else { // if username found 
            // password - plaintext
            // query - is hashed 
            // console.log("checkUser-2")
            compareFoundUser = await bcrypt.compare(password, Query.password)
            console.log(compareFoundUser);
            if (!compareFoundUser){
                // console.log("checkUser-3")
                throw "Either the username or password is invalid"; 
            } else{
                // console.log("checkUser-5")
                return {authenticated: true};
            }
        }
    } catch(e){
        throw e;
    }

}


module.exports = {
    createUser,
    checkUser
}  
