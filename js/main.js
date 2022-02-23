// update_view runs through the website and updates the view using a simple
// jQuery statement.

// Basically just helps the dictionary

function update_view() {
    keys = dict['keys'];
    for (idx in keys) {
        key = keys[idx];
        $("#" + key).text(get_string(key));
    };

    pics = dict['pics'];
    for (idx in pics) {
        pic = pics[idx];
        $("#" + pic).attr('src', get_string(pic));
    };
}

function initAll() {
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
}

// Do the first update once the website is ready loading.
$(document).ready(function() {
    
    initAll();

    update_view();
})