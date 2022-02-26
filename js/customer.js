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
        beverageList = allStrongBeverages(60);

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
        beverageList = getBeverageType('Ã–l, Ale');
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            printBeverage(this);

        });
    });

    $("#menu_wine").click(function(){
        selectTab("wine");
        currentTab = "wine";
        beverageList = getBeverageType('Vin av flera typer');
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            printBeverage(this);
        });
    });

    $("#menu_spirits").click(function(){
        selectTab("spirits");
        currentTab = "spirits";
        beverageList = getBeverageType('okryddad sprit');
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            printBeverage(this);
        });
    });

    $("#menu_spirits").click(function(){
        selectTab("spirits");
        currentTab = "spirits";
        beverageList = allStrongBeverages(40);
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

});



// Function for switching between different tabs
function selectTab(targetTab) {
    // Update previous and current tabs
    prevTab = currentTab;
    currentTab = targetTab;

    // Change background
    $("#menu_" + prevTab).css("background", "#555");
    $("#menu_" + targetTab).css("background", "#333");
}

// Function for printing a menu entry
function printBeverage(entry) {
    // Append a new div containing beverage info
    $("#menuItems").append(
        '<div class="beverage">' +
        '<div class="addBeverage" onClick=\"addBeverage(\'' + entry[0] + '\')\">+</div>' +
        '<b>' + entry[0] + '</b>'+
        '<p class="beveragePrice">' + entry[2] + ' kr</p>' +
        '</div>'
    )
}


// This is the function that should add stuff to the shopping cart (the "selectedItems" div)
function addBeverage(bevName) {
    alert('Added ' + bevName + ' to the shopping cart!')
    $("#selectedItems").append(
    '<div class="beverage">' +
    '<b>' + bevName + '</b>'+
    '</div>'
    )


}
