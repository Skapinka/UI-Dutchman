/** The main goal here is to load the menu and handle the
 * shopping cart
 */

// var userID = localStorage.getItem('id');
var currentTab = "all";

//Runs on website load


$(document).ready(function() {
    
    selectTab("all");    // highlight the all tab
    $('body').css("height", $(window).height()-10);

    
    $("#menu_all").click(function(){
        // Highlight tab
        selectTab("all");
        currentTab = "all";

        // Update the list of beverages
        beverageList = allBeveragesStaff();
	

        // Empty the beverage menu div
        $("#menuItems").empty();

        // Loop through each entry in 'beverageList' and create a menu card for it
        $.each(beverageList, function(element){
            printBeverage(this);

        });
    });
});



// Function for switching between different tabs
function selectTab(targetTab) {
    // Update previous and current tabs
    prevTab = currentTab;
    currentTab = targetTab;

    // Reset the already clicked tab background,
    // and update the newly selected one
    $("#menu_" + prevTab).css("background-color", "");
    $("#menu_" + targetTab).css("background-color", "#382f2f");
}

// Function for printing a menu entry
// entry = [ID, Name, Type, Price, %alc, grape, serving size, producer, year, contents, special, typetype, country, stock]

function printBeverage(entry) {
    // Append a new div containing beverage info
    $("#menuItems").append(
        '<div class="beverage" id=' + entry[0] + ' title='+ "'" + getBevInfo(entry) + "'" +  '>' +
        '<div class="hideBeverage" onClick=\"hideBeverage(' + entry[0] + ')\">hide</div>' +
        '<b>' + entry[1] + '</b>'+
        //'<br><i>' + entry[4] + '</i>' + 
        '<p class="beveragePrice">' + entry[3] + ' kr</p>' +
	'<p class="stock">Stock: ' + entry[13] + '</p>' +
        '</div>'
    )

    
}


// function for loading the mouseover text for a menu item
// displaying different information depending on what type of bevarage it is
function getBevInfo(entry){
    type = entry[2];
    info = "";
    
    if (type == "Beer"){
	producer = entry[7];
	country = entry[12];
	typetype = entry[11];
	servingSize = entry[6];
	content = entry[9];
	info = typetype + "\n" + servingSize + "\n" + producer + "\n" + country + "\n" + content;

    } else if (type == "Wine"){
	typetype = entry[11];
	year = entry[8];
	producer = entry[7];
	grape = entry[5];
	servingSize = entry[6];
	content = entry[9];
	info = typetype + ", " + grape + "\n" + servingSize + "\n" + year + "\n" + producer + "\n" + content;

    } else if (type == "Cocktail") {
	servingSize = entry[6];
	content = entry[9];

	info = servingSize + "\n" + content;
    } else {
	info = "No Info Avaliable";
    };

    return info;
}


// hides the beverage with ID from the users.
// sets the "hidden" field of the database to 1 for this beverage
function hideBeverage(ID) {
    changeHidden(ID, 1);
    update_view();
}


// Shows the beverage with ID from the users
// sets the hidden field of the database to 0 for this beverage
function showBeverage(ID) {
    changeHidden(ID, 0);
    update_view();

}

