const express= require('express');
const router = express.Router();
// const session = require('express-session');
const { ObjectId } = require('mongodb');
// const bcrypt = require('bcrypt');
const users = require("../data/users");

router.get('/', async (req,res) => {
    //if a user is authenticated -- redirect to /private
    // else -- render to login page
    // let user = req.session.user;
    // console.log("hi");
    if (req.session.user) { // if user is authenticated
        res.redirect("/private");
    } else{ //  not authenticated
        // console.log("LOGIN")
        return res.status(403).render('login', {title: "Login"})
    }
})
router.get('/signup', async (req,res) => {
    //if a user is authenticated -- redirect to /private
    // else -- render to signup page
    // let user = req.session.user;
    // console.log("hi-signup");
    if (req.session.user) { // if user is authenticated
        res.redirect("/private");
    } else{ //  not authenticated
        return res.status(403).render('signup', {title: "Sign-Up"})
    }
});

router.post('/signup', async (req,res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
            //INPUT CHECKING
    // console.log("post-signup1")
    if ((!username) || (!password)){
        return res.status(400).render('error')
    }
    // console.log("post-signup2")
    username= username.trim();
    if(username.trim().length === 0){
        return res.status(400).render('error', 
        {class: "empty-spaces",
         error: "USERNAME CAN'T HAVE EMPTY SPACES"});
    }
    // console.log("post-signup3")

    if (username.trim().length < 4){
        return res.status(400).render('error', 
        {   class: "characters",
            error: "USERNAME MUST HAVE 4 OR MORE CHARACTERS"})
    }
    // console.log("post-signup4")

    if (password.trim().length === 0){
        return res.status(400).render('error', 
        {   class: "empty-spaces",
            error: "PASSWORD CAN'T HAVE EMPTY SPACES"})
    }
    // console.log("post-signup5")
    if (password.trim().length < 6){
        return res.status(400).render('error', 
        {   class: "characters",
            error: "PASSWORD MUST HAVE 6 OR MORE CHARACTERS"})
    }
    //https://stackoverflow.com/questions/15933727/javascript-regular-expression-for-usernames-no-spaces
    // console.log("post-signup6")

    let reUser = /^[a-zA-Z0-9]{4,}$/; // I did up to unlimited characters
    if (reUser.test(username) === false) {
        return res.status(400).render({error: "MUST BE A VALID USERNAME!"})
    }
    // console.log("post-signup7")
    let rePass = /^[ A-Za-z0-9_@.\#&+-]{6,}$/;
    //  /^[a-zA-Z0-9.\-_$#&@*!]{6,}$/; // I did up to unlimited characters
    if (rePass.test(password) === false) {
        console.log("post-signup7-ERROR")
        return res.status(400).render({error:"MUST BE A VALID PASSWORD!"})
    }
        // call the createUser function
        // console.log("post-signup8")
        const postUser = await users.createUser(username, password);
        if (postUser.userInserted === true){ // If -- userinserted: true
            res.redirect('/');
            // console.log("post-signup9")
        } else {
            // console.log("post-signup10")
            return res.status(500).render('error', {error: "Internal Server Error"});
        }
    } catch(e){
        return res.status(400).render('error', {error: e});
    }
    
})
router.post('/login', async (req,res) => {
   /*  
    get req.body username and password
    const { username, password } = req.body;
    here, you would get the user from the db based on the username, then you would read the 
    hashed pw and then compare it to the pw in the req.body
    let match = bcrypt.compare(password, 'HASHED_PW_FROM DB’);
    if they match then set req.session.user and then redirect them to the login page
    I will just do that here 
*/
    let username = req.body.username;
    let password = req.body.password;
    try {
        //INPUT CHECKING
        if ((!username) || (!password)){
            return res.status(400).render('error', {class: "invalid"});
        }
        username= username.trim();
        if(username.trim().length === 0){
            return res.status(400).render('error', 
            {class: "invalid",
             error: "USERNAME CAN'T HAVE EMPTY SPACES"});
        }
        if (username.trim().length < 4){
            return res.status(400).render('error', 
            {   class: "invalid",
                error: "USERNAME MUST HAVE 4 OR MORE CHARACTERS"});
            // throw "ERROR: MUST HAVE 4 OR MORE CHARACTERS"
        }
        if (password.trim().length < 6){
            return res.status(400).render('error', 
            {   class: "invalid",
                error: "PASSWORD MUST HAVE 6 OR MORE CHARACTERS"});
            // throw "ERROR: MUST HAVE 4 OR MORE CHARACTERS"
        }
        //https://stackoverflow.com/questions/15933727/javascript-regular-expression-for-usernames-no-spaces
        let reUser = /^[a-zA-Z0-9]{4,}$/; // I did up to unlimited characters
        if (reUser.test(username) === false) {
            // throw "ERROR: MUST BE A VALID STRING!";
            return res.status(400).render('error', 
            {   class: "invalid",
                error: "INVALID USERNAME"});
        }
        let rePass = /^[a-zA-Z0-9.\-_$#&@*!]{6,}$/; // I did up to unlimited characters
        if (rePass.test(password) === false) {
            // throw "ERROR: MUST BE A VALID STRING!";
            return res.status(400).render('error', 
            {   class: "invalid",
                error: "INVALID PASSWORD"});
        }

        // console.log("login-0")
        const checkLogin = await users.checkUser(username, password);
        // console.log("login-0-1")
        // console.log(username)
        // console.log(password);
        
        for (let i=0; i<users.length; i++){
            if (users[i].username === username && users[i].password === password) { // 
                return res.status(400).render('login', {
                    error: "duplicate user found"})
            }
        }
        // console.log("login-1")
        if (checkLogin.authenticated === true) {
            req.session.user = { 
                "username": username
            }
            res.redirect('/private');
        } else {
            return res.status(400).render('login', {
                error: "Username and/or password entered incorrectly"})
        }
    } catch (e) {
        // console.log("login-2")
        return res.status(400).render('login',{error: "Username and/or password not valid"})
    }
    
})
//get route /private - from professor's github
router.get('/private', async (req, res) => {
    let username = req.session.user.username;
    return res.render('private', {username: username});
    // res.json({route: '/private', method: req.method});
  });
router.get('/logout', async(req,res) => {
    req.session.destroy();
    // res.send('Logged out');
    res.render('logout', {});

})



module.exports = router;