/** The main goal here is to load the menu and handle the 
 * shopping cart
 */

var userID = localStorage.getItem('id');
var currentTab = "all";


/** Undo-redo stuff */

var undoStack = new Array(); // Fill this with past actions
var redoStack = new Array(); // Fill this with "future" actions

//Runs on website load

$(document).ready(function() {
    //loadDB();           // load database
    selectTab("all");    // highlight the all tab
    $('body').css("height", $(window).height()-10);
    

    // ALL currently loads beverages >=60% alc
    $("#menu_all").click(function(){
        selectTab("all");
        currentTab = "all";
        beverageList = allStrongBeverages(60);
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            // Print all beverages in list
            printBeverage(this);

        });
    });

    $("#menu_beer").click(function(){
        selectTab("beer");
        currentTab = "beer";
        beverageList = getBeverageType('Ã–l, Ale');
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            // Print all beverages in list
            printBeverage(this);

        });
    });

    $("#menu_wine").click(function(){
        selectTab("wine");
        currentTab = "wine";
        beverageList = getBeverageType('Vin av flera typer');
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            // Print all beverages in list
            printBeverage(this);

        });
    });

    $("#menu_spirits").click(function(){
        selectTab("spirits");
        currentTab = "spirits";
        beverageList = getBeverageType('okryddad sprit');
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            // Print all beverages in list
            printBeverage(this);

        });
    });

    $("#menu_spirits").click(function(){
        selectTab("spirits");
        currentTab = "spirits";
        beverageList = allStrongBeverages(40);
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            // Print all beverages in list
            printBeverage(this);

        });
    });

    $("#menu_ecologic").click(function(){
        selectTab("ecologic");
        currentTab = "ecologic";
        beverageList = getBeverageEco();
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            // Print all beverages in list
            printBeverage(this);
        });
    });

    $("#menu_koscher").click(function(){
        selectTab("koscher");
        currentTab = "koscher";
        beverageList = getBeverageKoscher();
        $("#menuItems").empty();
        $.each(beverageList, function(element){
            // Print all beverages in list
            printBeverage(this);
        });
    });


});

function selectTab(targetTab) {
    prevTab = currentTab;
    currentTab = targetTab;
    $("#menu_" + prevTab).css("background", "#555");
    $("#menu_" + targetTab).css("background", "#333");
}

function printBeverage(entry) {
    $("#menuItems").append(
        '<div class="beverage">' +
        '<b>' + entry[0] + '</b>'+
        '<p>' + entry[2] + ' kr</p>' +
        '</div>'
    )
}