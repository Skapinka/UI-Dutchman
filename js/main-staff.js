

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

    // loads and displays all text and images from the dictionary
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

    // changes the names in the form for adding credit if the form exits (user is on the add credit page)
    if (document.getElementById("addCredit") != null){
    document.getElementById("usernameCredit").placeholder = get_string("username");
    document.getElementById("amount").placeholder = get_string("amount");
	document.getElementById("addCreditButton").defaultValue = get_string("addCreditButton");
    }

    
    // changes colour of stock-text if the stock is < 5.
    var stocks = document.getElementsByClassName("stock");
    for (i = 0; i < stocks.length; i++) {
	var id = stocks[i].parentElement.id;
	var productStock = getStock(id);
	stocks[i].innerHTML = get_string("stock") + ": " + productStock; 
	if (productStock < 5 && productStock != ""){
	    document.getElementById(id).style.color = "red";
	}	
    }

    // changes the hide/show button depending on the state of the beverage
    var hidden = document.getElementsByClassName("hideBeverage");
    for (i = 0; i < hidden.length; i++) {
	var productID = hidden[i].parentElement.id;
	if(getHidden(productID) == 1) {
	    hidden[i].parentElement.style.opacity = "0.6";
	    hidden[i].innerHTML = get_string("show");
	    hidden[i].style.backgroundColor = "#489931";
	    hidden[i].setAttribute('onclick', 'showBeverage(' + productID + ')');
	} else {
	    hidden[i].parentElement.style.opacity = "1";
	    hidden[i].innerHTML = get_string("hide");
	    hidden[i].style.backgroundColor = "#9b3028";
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
