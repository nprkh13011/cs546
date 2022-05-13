const people = require("./people");
const stocks = require("./stocks");

async function main(){
    console.log("getPersonById:")
    try{
        console.log("id is: 7989fa5e-8f3f-458d-ad58-23c8d9ef5a10")
        let ans = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10"); 
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{ // its not the same
        console.log("id is: 7989Fa5e-8f3f-458d-ad58-23c8d9ef5a10")
        await people.getPersonById("7989Fa5e-8f3f-458d-ad58-23c8d9ef5a10"); 
    }catch(e){
        console.log(e)
    }
    try{
        await people.getPersonById("    ");
    }catch(e){
        console.log(e);
    }   
    try{
        await people.getPersonById();
    }catch(e){
        console.log(e);
    }
    try{
        await people.getPersonById(-45);
    }catch(e){
        console.log(e);
    }
    try{
        await people.getPersonById("hfakshjkafhjkahfjk");
    }catch(e){
        console.log(e);
    }

    console.log("sameEmail:")
    try{
        console.log("emailDomain is: 'harvard.edu'")
        let ans1 = await people.sameEmail("harvard.edu"); 
        console.log(ans1);
    }catch(e){
        console.log(e);
    }
    try{
        console.log("case insensitve check - emailDomain is: 'hArVArd.eDu")
        let ans2 = await people.sameEmail("hArvArd.eDu"); 
        console.log(ans2);
    }catch(e){
        console.log(e);
    }   
    try{
        await people.sameEmail();
    }catch(e){
        console.log(e)
    }
    try{
        await people.sameEmail(123); 
    }catch(e){
        console.log(e)
    }
    try{
        await people.sameEmail("   "); 
    }catch(e){
        console.log(e)
    }
    try{
        await people.sameEmail("noDotInSight"); 
    }catch(e){
        console.log(e)
    }
    try{
        await people.sameEmail("website.q"); 
    }catch(e){
        console.log(e)
    }
    try{
        await people.sameEmail("website.qee.q"); 
    }catch(e){
        console.log(e)
    }
    try{
        await people.sameEmail("google.com.hk"); 
    }catch(e){
        console.log(e)
    }
    try{
        await people.sameEmail(".com");
    }catch(e){
        console.log(e)
    }
    try{
        await people.sameEmail("com.");
    }catch(e){
        console.log(e)
    }
    try{
        await people.sameEmail("foobar.123");
    }catch(e){
        console.log(e)
    }

    console.log("manipulateIp:");
    try{
        let ans = await people.manipulateIp();
        console.log(ans);
    }catch(e){
        console.log(e);
    }

    console.log("sameBirthday");
    try{
        console.log("should be: ['Khalil Ovitts', 'Erny Van Merwe', 'Emanual Saben', 'Iorgos Tembridge']")
        let ans = await people.sameBirthday(9, 25);
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        console.log("should be: ['Khalil Ovitts', 'Erny Van Merwe', 'Emanual Saben', 'Iorgos Tembridge']")
        let ans = await people.sameBirthday("09", "25");
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await people.sameBirthday(9, 31);
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await people.sameBirthday(13, 25);
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await people.sameBirthday(2, 29);
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await people.sameBirthday("09", "31");
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await people.sameBirthday("   ", "25");
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await people.sameBirthday();
        console.log(ans);
    }catch(e){
        console.log(e);
    }

    console.log("listShareholders");
    try{
        let ans1 = await stocks.listShareholders("Aeglea BioTherapeutics, Inc.");
        console.log(ans1);
    }catch(e){
        console.log(e);
    }
    try{ 
        console.log("case sensitive");
        let ans1 = await stocks.listShareholders("Aeglea BiotheraPeutics, Inc.");
        console.log(ans1);
    }catch(e){
        console.log(e);
    }
    try{
        console.log("should have no shareholders")
        let ans = await stocks.listShareholders("Powell Industries, Inc.");
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await stocks.listShareholders();
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await stocks.listShareholders(123);
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await stocks.listShareholders("     ");
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await stocks.listShareholders("RandOmstOcknOtinJSONfile");
        console.log(ans);
    }catch(e){
        console.log(e);
    }

    console.log("totalShares:")
    try{
        console.log("5 shareholders, 663 shares");
        let ans = await stocks.totalShares('Aeglea BioTherapeutics, Inc.');
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        console.log("1 shareholder, 285 shares");
        let ans = await stocks.totalShares('Nuveen Preferred and Income 2022 Term Fund');
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        console.log("no shareholders");
        let ans = await stocks.totalShares('Powell Industries, Inc.');
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await stocks.totalShares();
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await stocks.totalShares(123);
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await stocks.totalShares("    ");
        console.log(ans);
    }catch(e){
        console.log(e);
    }
    try{
        let ans = await stocks.totalShares("testest");
        console.log(ans);
    }catch(e){
        console.log(e);
    }

    console.log("listStocks");
    try{
        let ans = await stocks.listStocks("Grenville", "Pawelke");
        console.log(ans);
    }catch(e){
        console.log(e);
    }
   
    try{
        let ans = await stocks.listStocks(true, 123);
        console.log(ans);
    }catch(e){
        console.log(e);
    }

    try{
        let ans = await stocks.listStocks("    ", "    ");
        console.log(ans);
    }catch(e){
        console.log(e);
    }

    console.log("getStockById");
    try{
        let ans = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log(ans);
    }catch(e){
        console.log(e);
    }
 
    try{
        let ans = await stocks.getStockById(-1);
        console.log(ans);
    }catch(e){
        console.log(e);
    }

    try{
        let ans = await stocks.getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log(ans);
    }catch(e){
        console.log(e);
    }
}

main();

