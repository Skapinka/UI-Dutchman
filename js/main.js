

// doInit
function doInit(fun, entry) {
    if (fun == 'addBeverageFun'){
        doFunc(addBeverageFun(entry));
    }
    if (fun == 'removeBeverageFun'){
        doFunc(removeBeverageFun(entry));
    }

    update_view();
}


// update_view runs through the website and updates the view using a simple
// jQuery statement.

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
    set_content(document.getElementById("ship"), shipContent);
    set_content(document.getElementById("ghost"), ghostContent);
}

function initAll() {
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
}

// Do the first update once the website is ready loading.
$(document).ready(function() {
    initAll();

    update_view();
})
