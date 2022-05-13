const bands = require("./data/bands");
const connection = require('./config/mongoConnection');

async function main() {
    const db = await connection.connectToDb();
    await db.dropDatabase();
    
    let pinkFloyd =undefined;
    let theBeatles = undefined;
    let linkinPark = undefined;

    //1+2 create band + log
    try {
        console.log("------Number 1 + 2------");
        pinkFloyd = await bands.create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
        "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965);
        console.log(pinkFloyd);
    } catch(e) {
        console.log(e);
    }
    // 3 create 2nd band
    try{
        console.log("------Number 3------");
        theBeatles = await bands.create("The Beatles", ["Rock", "Pop", "Psychedelia"],
        "http://www.thebeatles.com", "Parlophone", ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"], 1960);
    } catch(e) {
        console.log(e);
    }

    //4 query and log
    try {
        console.log("------Number 4------");
        const allBands = await bands.getAll();
        console.log(allBands);
    } catch(e) {
        console.log(e);
    }
    //5+6 third band and log
    try {
        console.log("------Number 5 + 6------");
        linkinPark = await bands.create("Linkin Park", ["Alternative Rock", "Pop Rock", "Alternative Metal"],
        "http://www.linkinpark.com", "Warner", ["Chester Bennington", "Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn"], 1996);
        console.log(linkinPark);
    }catch(e) {
        console.log(e);
    }
    //7+8 rename first band and log
    try {
        console.log("------Number 7 + 8------");
        const renamedFloyd = await bands.rename(pinkFloyd._id, "Floyd Pink"); 
        console.log(renamedFloyd);
    } catch (e) {
        console.log(e);
    }
    //9 remove second
    try {
        console.log("------Number 9------");
        const removeBeatles = await bands.remove(theBeatles._id); 
    // console.log(removeBeatles);
    } catch(e) {
        console.log(e);
    }

    //10 query and log
    try {
        console.log("------Number 10------");
        const allBands2 = await bands.getAll();
        console.log(allBands2);
    } catch (e) {
        console.log(e);
    }
    
    //11 ERROR - create a band with bad input parameters
    try{
        console.log("------Number 11------");
        const error1 = await bands.create("Imagine Dragons", [],  "https://www.imaginedragonsmusic.com", "Universal Music Group", 
        ["Dan Reynolds", "Daniel Wayne Sermon", "Daniel Platzman", "Ben McKee"], 2009);
    } catch (e) {
        console.log(e);
    }

    //12 bad input parameter - remove
    try {
        console.log("------Number 12------");
        const error2 = await bands.remove("620ab28ac03d08b87b8fb70");
        // console.log(error2);
    } catch (e) {
        console.log(e);
    }

    //13 bad input parameter - rename a band that doesn't exist
    try {
        console.log("------Number 13------");
        const error3 = await bands.rename("620ab28ac03d08b87b8fb70", "Gee Bees");
    } catch (e) {
        console.log(e);
    }

    //14 bad input parameter - rename a band passing invalid data
    try {
        console.log("------Number 14------");
        const error4 = await bands.rename("Bee Gees", 1232);
    } catch (e) {
        console.log(e);
    }

    //15 bad input parameter - get a band by id a band passing invalid data
    try {
        console.log("------Number 15------");
        const error5 = await bands.get("620ab28ac03d08b87b8fb70");
    } catch (e) {
        console.log(e);
    }

   
    await connection.closeConnection();
    
    
}

main();