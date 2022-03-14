

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
    loginContent(localStorage.getItem('credentials'));
    
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

    // sets login button and login forms to be changed based on language
    document.getElementById("loginButton").defaultValue = get_string("loginButton");
    document.getElementById("username").placeholder = get_string("username");
    document.getElementById("password").placeholder = get_string("password");

    // puts the image of the ship
    set_content(document.getElementById("ship"), shipContent);
    set_content(document.getElementById("ghost"), ghostContent);


    // changes colour of stock-text if the stock is < 5.
    var stocks = document.getElementsByClassName("stock");
    for (i = 0; i < stocks.length; i++) {
	var id = stocks[i].parentElement.id;
	var productStock = getStock(id);
	if (productStock < 5 && productStock != ""){
	    document.getElementById(id).style.color = "red";
	}	
    }

    //
    var hidden = document.getElementsByClassName("hideBeverage");
    for (i = 0; i < hidden.length; i++) {
	var productID = hidden[i].parentElement.id;
	if(getHidden(productID) == 1) {
	    
	    hidden[i].innerHTML = "show";
	    hidden[i].style.backgroundColor = "#489931";
	    hidden[i].setAttribute('onclick', 'showBeverage(' + productID + ')');
	} else {
	    hidden[i].innerHTML = "hide";
	    hidden[i].style.backgroundColor = "#e62315";
	    hidden[i].setAttribute('onclick', 'hideBeverage(' + productID + ')');
	}
    }
    
}

function initAll() {
    // Highlight tab
    selectTab("all");
    currentTab = "all";

    // Update the list of beverages (placeholder for 'all')
    beverageList = allBeveragesStaff();

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
