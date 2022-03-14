// =====================================================================================================
// Some sample API functions for the Flying Dutchman data base.
// =====================================================================================================
// Author: Lars Oestreicher, 2018
//
// Adapted from a mySQL data base.
//
// We use (global) variables to store the data. This is not generally advisable, but has the
// advantage that the data is easy to access through simple APIs. Also, when storing as local storage,
// all data is stored as strings, which might be adding some complexity.
//

function allUserNames() {
    var nameCollect = [];
    for (i = 0; i < DB.users.length; i++) {
        nameCollect.push(DB.users[i].username);
    }
    return nameCollect;
}

// =====================================================================================================
// This is an example of a file that will return an array with some specific details about a
// selected user name (not the first name/alst name). It will also add details from another "database"
// which contains the current account status for the person.
//
function userDetails(userName) {
    var userCollect = [];
    var userID;
    var userIndex;
    var account;

    // First we find the user ID of the selected user. We also save the index number for the record in the JSON
    // structure.
    //
    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            userID = DB.users[i].user_id;
            userIndex = i;
        };
    };

    // We get the current account status from another table in the database, account. We store this in
    // a variable here for convenience.
    //
    for (i = 0; i < DB.account.length; i++) {
        if (DB.account[i].user_id == userID) {
            account = DB.account[i].creditSEK;
        }
    };

    // This is the way to add the details you want from the db into your own data structure.
    // If you want to change the details, then just add or remove items accordingly below.
    userCollect.push(
        DB.users[userIndex].user_id,
        DB.users[userIndex].username,
        DB.users[userIndex].first_name,
        DB.users[userIndex].last_name,
        DB.users[userIndex].email,

        account
    );

    return userCollect;
}

// =====================================================================================================
// This function will change the credit amount in the user's account. Note that the amount given as argument is the new
// balance and not the changed amount (± balance).
//
function changeBalance(userName, newAmount) {

    // We use this variable to store the userID, since that is the link between the two data bases.
    var userID;

    // First we find the userID in the user data base.
    //
    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            userID = DB.users[i].user_id;
        };
    };

    // Then we match the userID with the account list.
    // and change the account balance.
    //
    for (i = 0; i < DB.account.length; i++) {
        if (DB.account[i].user_id == userID) {
            DB.account[i].creditSEK = newAmount;   // This changes the value in the JSON object.
        };
    };
}

function getBalance(userName) {
    var userID;
    
    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            userID = DB.users[i].user_id;
        };
    };

    for (i = 0; i < DB.account.length; i++) {
        if (DB.account[i].user_id == userID) {
            return DB.account[i].creditSEK;
        };
    };
    
}

// =====================================================================================================
// Returns a list of all the names of the beverages in the database. This function can be used as a
// recipe for similar functions.
//


function allBeverages() {

    // Using a local variable to collect the items.
    var collector = [];

    // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
    // items, you may introduce filter functions in the loop... see the template within comments.
    //
    for (i = 0; i < DB2.spirits.length; i++) {
	if (DB2.spirits[i].special == 0 && DB2.spirits[i].hidden == 0){
            collector.push([DB2.spirits[i].artikelid, DB2.spirits[i].namn, DB2.spirits[i].varugrupp, DB2.spirits[i].prisinklmoms, DB2.spirits[i].alkoholhalt, DB2.spirits[i].druva, DB2.spirits[i].forpackning, DB2.spirits[i].producent, DB2.spirits[i].argang, DB2.spirits[i].innehall, DB2.spirits[i].special, DB2.spirits[i].varutyp, DB2.spirits[i].ursprunglandnamn]);
	};
    };
    //
    return collector;
}


// loads all the bevareges for the staff ( includes the specials)
function allBeveragesStaff() {

    // Using a local variable to collect the items.
    var collector = [];
    // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
    // items, you may introduce filter functions in the loop... see the template within comments.
    //
    for (i = 0; i < DB2.spirits.length; i++) {
        collector.push([DB2.spirits[i].artikelid, DB2.spirits[i].namn, DB2.spirits[i].varugrupp, DB2.spirits[i].prisinklmoms, DB2.spirits[i].alkoholhalt, DB2.spirits[i].druva, DB2.spirits[i].forpackning, DB2.spirits[i].producent, DB2.spirits[i].argang, DB2.spirits[i].innehall, DB2.spirits[i].special, DB2.spirits[i].varutyp, DB2.spirits[i].ursprunglandnamn, DB2.spirits[i].stock]);
    };
    //
    return collector;
}



// Should hopefully get all beverages of given type
function getBeverageType(type) {
    var collector = [];

    for (i = 0; i < DB2.spirits.length; i++) {
        if (DB2.spirits[i].varugrupp == type && DB2.spirits[i].special == 0 && DB2.spirits[i].hidden == 0){
            collector.push([DB2.spirits[i].artikelid, DB2.spirits[i].namn, DB2.spirits[i].varugrupp, DB2.spirits[i].prisinklmoms, DB2.spirits[i].alkoholhalt, DB2.spirits[i].druva, DB2.spirits[i].forpackning, DB2.spirits[i].producent, DB2.spirits[i].argang, DB2.spirits[i].innehall, DB2.spirits[i].special, DB2.spirits[i].varutyp,  DB2.spirits[i].ursprunglandnamn]);
        }
    };

    return collector;
}

// Get all ecologic beverages
function getBeverageEco() {
    var collector = [];

    for (i = 0; i < DB2.spirits.length; i++) {
        if (DB2.spirits[i].ekologisk == 1 && DB2.spirits[i].special == 0 && DB2.spirits[i].hidden == 0){
            collector.push([DB2.spirits[i].artikelid, DB2.spirits[i].namn, DB2.spirits[i].varugrupp, DB2.spirits[i].prisinklmoms, DB2.spirits[i].alkoholhalt, DB2.spirits[i].druva, DB2.spirits[i].forpackning, DB2.spirits[i].producent, DB2.spirits[i].argang, DB2.spirits[i].innehall, DB2.spirits[i].special, DB2.spirits[i].varutyp, DB2.spirits[i].ursprunglandnamn]);
        }
    };

    return collector;
}

// Get all koscher beverages
function getBeverageKoscher() {
    var collector = [];

    for (i = 0; i < DB2.spirits.length; i++) {
        if (DB2.spirits[i].koscher == 1 && DB2.spirits[i].special == 0 && DB2.spirits[i].hidden == 0){
            collector.push([DB2.spirits[i].artikelid, DB2.spirits[i].namn, DB2.spirits[i].varugrupp, DB2.spirits[i].prisinklmoms, DB2.spirits[i].alkoholhalt, DB2.spirits[i].druva, DB2.spirits[i].forpackning, DB2.spirits[i].producent, DB2.spirits[i].argang, DB2.spirits[i].innehall, DB2.spirits[i].special, DB2.spirits[i].varutyp, DB2.spirits[i].ursprunglandnamn]);
        };
    };

    return collector;
}


// get all special beverages
function getBeverageSpecial() {
    var collector = [];

    for (i = 0; i < DB2.spirits.length; i++) {
	if (DB2.spirits[i].special == 1 && DB2.spirits[i].hidden == 0){
	    collector.push([DB2.spirits[i].artikelid, DB2.spirits[i].namn, DB2.spirits[i].varugrupp, DB2.spirits[i].prisinklmoms, DB2.spirits[i].alkoholhalt, DB2.spirits[i].druva, DB2.spirits[i].forpackning, DB2.spirits[i].producent, DB2.spirits[i].argang, DB2.spirits[i].innehall, DB2.spirits[i].special, DB2.spirits[i].varutyp, DB2.spirits[i].ursprunglandnamn]);
        };
    };

    return collector;
}


function getBeverageGlutenFree() {
    var collector = [];

    for (i = 0; i < DB2.spirits.length; i++) {
	if(DB2.spirits[i].glutenfri == 1 && DB2.spirits[i].hidden == 0) {
	    collector.push([DB2.spirits[i].artikelid, DB2.spirits[i].namn, DB2.spirits[i].varugrupp, DB2.spirits[i].prisinklmoms, DB2.spirits[i].alkoholhalt, DB2.spirits[i].druva, DB2.spirits[i].forpackning, DB2.spirits[i].producent, DB2.spirits[i].argang, DB2.spirits[i].innehall, DB2.spirits[i].special, DB2.spirits[i].varutyp, DB2.spirits[i].ursprunglandnamn]);
        };
	
    };
    return collector;
}

// ======================================================================
// this function changes the stock of item item to newamount

function changeStock(itemID, newAmount) {

    // finds the item in the database
    // and updates the database
   
    for (i = 0; i < DB2.spirits.length; i++){
	if (DB2.spirits[i].artikelid == itemID) {
	    DB2.spirits[i].stock = newAmount;
	};
    };
    
}


// get the currect stock of product with id productID
function getStock(productID) {
    for (i = 0; i < DB2.spirits.length; i++) {
        if (DB2.spirits[i].artikelid === productID) {
            return DB2.spirits[i].stock;
        };
    };
    
}


// returns 1 if the item is hidden for customer or 0 if it is not
function getHidden(productID) {
    for (i=0; i<DB2.spirits.length; i++) {
	if (DB2.spirits[i].artikelid === productID) {
	    return DB2.spirits[i].hidden;
	}
    }

}

// changes wheather the product with id productID is hidden (newValue=1) or not (newValue =0)
function changeHidden(productID, newValue) {
    for(i=0; i<DB2.spirits.length; i++){
	if (DB2.spirits[i].artikelid == productID) {
	    DB2.spirits[i].hidden = newValue;
	}
    }

}

// =====================================================================================================
// This function returns the names of all strong beverages (i.e. all that contain a percentage of alcohol
// higher than the strength given in percent.
//
function allStrongBeverages(strength) {

    // Using a local variable to collect the items.
    //
    var collector = [];

    // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
    // items, you may introduce filter functions in the loop... see the template within comments.
    //
    for (i = 0; i < DB2.spirits.length; i++) {

        // We check if the percentage alcohol strength stored in the data base is lower than the
        // given limit strength. If the limit is set to 14, also liqueuers are listed.
        //
        if (percentToNumber(DB2.spirits[i].alkoholhalt) > strength && DB2.spirits[i].special == 0) {

            // The key for the beverage name is "namn", and beverage type is "varugrupp".
            //
            collector.push([DB2.spirits[i].artikelid, DB2.spirits[i].namn, DB2.spirits[i].varugrupp, DB2.spirits[i].prisinklmoms, DB2.spirits[i].alkoholhalt, DB2.spirits[i].druva, DB2.spirits[i].forpackning, DB2.spirits[i].producent, DB2.spirits[i].argang, DB2.spirits[i].innehall, DB2.spirits[i].special, DB2.spirits[i].varutyp, DB2.spirits[i].ursprunglandnamn]);
        };
    };

    // Don't forget to return the result.
    //
    return collector;
}

// =====================================================================================================
// Lists all beverage types in the database. As you will see, there are quite a few, and you might want
// select only a few of them for your data.
//
function beverageTypes() {
    var types = [];
    for (i = 0; i < DB2.spirits.length; i++) {
        addToSet(types, DB2.spirits[i].varugrupp);
    };
    return types;
}

// =====================================================================================================
// Adds an item to a set, only if the item is not already there.
// The set is modelled using an array.
//
function addToSet(set, item) {
    if (!set.includes(item)) {
        set.push(item);
    }
    return set;
}

// =====================================================================================================
// Convenience function to change "xx%" into the percentage in whole numbers (non-strings).
//
function percentToNumber(percentStr) {
    return Number(percentStr.slice(0,-1));
}

// =======================================================
// Get beverage information from beverage ID
// Name, price




// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================


