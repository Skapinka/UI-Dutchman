/** The main goal here is to load the menu and handle the
 * shopping cart
 */

// var userID = localStorage.getItem('id');
var currentTab = "all";

//Runs on website load
$(document).ready(function() {
    
    selectTab("all");    // highlight the all tab
    $('body').css("height", $(window).height()-10);

    // ALL currently loads beverages >=60% alc
    // On click
    $("#menu_all").click(function(){
        // Highlight tab
        selectTab("all");
        currentTab = "all";

        // Update the list of beverages (placeholder for 'all')
        beverageList = allBeverages();

        // Empty the beverage menu div
        $("#menuItems").empty();

        // Loop through each entry in 'beverageList' and create a menu card for it
        $.each(beverageList, function(element){
            printBeverage(this);

        });
    });

    $("#menu_beer").click(function(){
        selectTab("beer");
        currentTab = "beer";
        beverageList = getBeverageType('Beer');
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            printBeverage(this);

        });
    });

    $("#menu_wine").click(function(){
        selectTab("wine");
        currentTab = "wine";
        beverageList = getBeverageType('Wine');
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            printBeverage(this);
        });
    });


    $("#menu_spirits").click(function(){
        selectTab("spirits");
        currentTab = "spirits";
        beverageList = getBeverageType('Cocktail');
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            printBeverage(this);

        });
    });

    $("#menu_ecologic").click(function(){
        selectTab("ecologic");
        currentTab = "ecologic";
        beverageList = getBeverageEco();
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            printBeverage(this);
        });
    });

    $("#menu_koscher").click(function(){
        selectTab("koscher");
        currentTab = "koscher";
        beverageList = getBeverageKoscher();
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            printBeverage(this);
        });
    });

      $("#menu_gluten_free").click(function(){
        selectTab("gluten_free");
        currentTab = "gluten_free";
        beverageList = getBeverageGlutenFree();
        $("#menuItems").empty();
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

    // Change background
    $("#menu_" + prevTab).css("background", "#453838");
    $("#menu_" + targetTab).css("background", "#333");
}

// Function for printing a menu entry
// entry = [ID, Name, Type, Price, %alc, grape, serving size, producer, year, contents, special, typetype, country]

function printBeverage(entry) {
    // Append a new div containing beverage info
    $("#menuItems").append(
        '<div class="beverage" title='+ "'" + getBevInfo(entry) + "'" +  '>' +
        '<div class="addBeverage" onClick=\"doInit(\'addBeverageFun\', ' + entry[0] + ')\">+</div>' +
        '<b>' + entry[1] + '</b>'+
        '<br><i>' + entry[4] + '</i>' + 
        '<p class="beveragePrice">' + entry[3] + ' kr</p>' +
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

