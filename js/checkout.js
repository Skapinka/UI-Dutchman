var persons = new Array();

// Create a jQuery 'click' event on the checkout button 
$(document).ready(function() {
    document.getElementById("priceTotal").innerHTML =  '0 kr';

    $("#proceedCheckout").click(function(){toggleCheckout();});
    $("#paymentWindowClose").click(function(){toggleCheckout();});
});


var paymentToggle = 0;

function toggleCheckout() {
    console.log('Checkout button pressed');
    if (paymentToggle == 0) {
        $('#paymentWindow').show();
        $('#proceedCheckout').hide();
        $('#proceedPayment').show();
        paymentToggle = 1;
    } else {
        $('#paymentWindow').hide();
        $('#proceedCheckout').show();
        $('#proceedPayment').hide();
        paymentToggle = 0;
    }
}

function newPerson() {
    persons[persons.length]=[];
    renderCheckout(shoppingCart);
}

function addPersonItems(person, itemID) {
    // If person 'num' does not exist, create person
    console.log('added ' + itemID);

    item = getBevByID(itemID);

    if (persons[person] == null){
        persons[person] = new Array();

    }
    //check if already in list, then push the item
    for (i = 0; i <= persons[person].length; i++){
        if (i == persons[person].length) {
            persons[person].push([item[0], 1]);
            break;
        } else if (persons[person][i][0] == itemID) {
            // If item already exists in personal cart, +1 to it
            persons[person][i][1] += 1;
            break;
        }
    }
}

function removePersonItems(itemID){
    console.log('removed ' + itemID);
    
    // loop through each person
    for (i = 0 ; i < persons.length ; i++){
        for (j = 0 ; j < persons[i].length ; j++) {
            if (persons[i][j][0] == itemID){
                if (persons[i][j][1] == 1){
                    persons[i].splice(j, 1);
                } else {
                    persons[i][j][1] += -1;
                }
            }
        }
    }
}

function moveItem(person,bev){
    //todo: move "bev" from person to person + 1 (or loop over.)
    console.log(person + " --> " + bev);
}

function renderCheckout(shoppingCart) {
    $("#selectedItemsCheckout").empty();
    var priceTotal = 0;

    if (persons.length == 0) {
        // First added item --> create a new person 0 
        addPersonItems(0, shoppingCart[0][0]);
    }

    for (var i = 0; i < persons.length; i++) {
        // create a "sub"-list for that person
        $("#selectedItemsCheckout").append(
            // Person "0" is displayed as the first, and so on.
            // Just a bit of quality of life for the user
            '<div id="person' + i + '">#'+( i+1 )+'<div>'
        );

        // loop through each item for that person
        for (var j = 0; j < persons[i].length; j++){
            var bev = getBevByID(persons[i][j][0]);
            var amnt = persons[i][j][1];
            var name = bev[1];
            var tot = parseInt(persons[i][j][1])*bev[2];

            $("#person"+i+"").append(
                '<div class="checkoutItem" onClick="moveItem('+i+','+bev[0]+')">' +
                '<i>' + amnt + 'x </i>'+
                '<i>' + name + '</i>'+
                '<i class="checkoutItemPrice">' + tot + ' kr</i>'+
                '<br></div>'
            );
        }
    }

    $("#selectedItemsCheckout").append(
        '<div id="newPerson">(+)<div>'
    );

    $("#newPerson").click(function(){newPerson();});
}

