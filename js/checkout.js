var persons = new Array();

// Create a jQuery 'click' event on the checkout button 
$(document).ready(function() {
    document.getElementById("priceTotal").innerHTML =  '0 kr';

    $("#proceedCheckout").click(function(){toggleCheckout();});
    $("#paymentWindowClose").click(function(){toggleCheckout();});
    $(".checkmark").click(function(){toggleTableCheck();})
});

var tableToggle = false;

function toggleTableCheck() {
    if (tableToggle) {
        $('#tableCheckmark').hide();
        tableToggle = false;
    } else {
        $('#tableCheckmark').show();
        tableToggle = true;
    }
    return 0;
}

var paymentToggle = false;

function toggleCheckout() {
    console.log('Checkout button pressed');
    if (paymentToggle) {
        $('#paymentWindow').hide();
        $('#proceedCheckout').show();
        $('#proceedPayment').hide();
        paymentToggle = false;
    } else {
        $('#paymentWindow').show();
        $('#proceedCheckout').hide();
        $('#proceedPayment').show();
        paymentToggle = true;
    }
}

function newPerson() {
    persons[persons.length]=[];
    renderCheckout(shoppingCart);

}

function removePerson(person){
    if (persons.length == 1){
        console.log("Cannot remove the only user!");
        return 0;
    }
    
    var bevs = persons[person];
    console.log(bevs);
    
    if (bevs == ''){
        persons.splice(person,1);
    } else {
        persons.splice(person,1);
        if (person == 0) {
            // loop through each item, add them individually
            // fixes a bug with creating multiple of the same entry
            // upon deletion

            for (k = 0; k < bevs.length; k++) {
                for (j = 0; j < bevs[k][1]; j++) {
                    addPersonItems(0, bevs[k][0]);
                }
            }
            //persons[1] = persons[1].concat(bevs);
        } else {
            for (k = 0; k < bevs.length; k++) {
                for (j = 0; j < bevs[k][1]; j++) {
                    addPersonItems(person-1, bevs[k][0]);
                }
            }
        }
    }

    renderCheckout();
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
            persons[person].push([item[0],1]);
            console.log(persons[0]);
            break;
        } else if (persons[person][i][0] == itemID) {
            // If item already exists in personal cart, +1 to it
            persons[person][i][1] += 1;
            break;
        }
    }
}

// bug: needs to only remove first item
function removePersonItems(itemID){
    console.log('removed ' + itemID);
    
    // loop through each person
    for (i = 0 ; i < persons.length ; i++){

        // loop through each item
        for (j = 0 ; j < persons[i].length ; j++) {

            // check for item id
            if (persons[i][j][0] == itemID){

                if (persons[i][j][1] == 1){
                    persons[i].splice(j, 1);
                } else {
                    persons[i][j][1] += -1;
                }
                return;
            }
        }
    }
}

function moveItem(person,bevID,bevindex){
    //todo: move "bev" from person to person + 1 (or loop over.)
    console.log(person + " --> " + bevindex);
    bev = getBevByID(bevID);
    

    // Case: last person in list
    if (persons[person+1] == null){
        // at bottom of the list
        // loop over and add bev to first person instead
        addPersonItems(0, bev[0]);
    } else {
        addPersonItems(person+1, bev[0]);
    }

    // If its just 1x beverage
    if (persons[person][bevindex][1] == 1) {
        persons[person].splice(bevindex, 1);
    } else {
        persons[person][bevindex][1] += -1;
    }

    renderCheckout(shoppingCart);
}

function renderCheckout(shoppingCart) {
    $("#selectedItemsCheckout").empty();

    if (persons.length == 0) {
        // First added item --> create a new person 0 
        addPersonItems(0, shoppingCart[0][0]);
    }

    for (var i = 0; i < persons.length; i++) {
        // create a "sub"-list for that person
        totalPerson = 0;
        for (p = 0; p < persons[i].length; p++){
            totalPerson += getBevByID(persons[i][p][0])[2]*persons[i][p][1];
        }
        
        $("#selectedItemsCheckout").append(
            // Person "0" is displayed as the first, and so on.
            // Just a bit of quality of life for the user
            '<div id="person' + i + '" class="personNum">'+
            '<span class="removePerson" onClick="removePerson('+i+')">[-]</span>'+
            '      '+( i+1 )+'  '+
            '<span class="totalPerson">  -->  '+totalPerson+' kr</span>'+
            '</div>'
        );

        // loop through each item for that person
        for (var j = 0; j < persons[i].length; j++){
            var bev = getBevByID(persons[i][j][0]);
            var amnt = persons[i][j][1];
            var name = bev[1];
            var tot = parseInt(persons[i][j][1])*bev[2];

            $("#person"+i+"").append(
                '<div class="checkoutItem" onClick="moveItem('+i+','+bev[0]+','+j+')">' +
                '<i>' + amnt + 'x </i>'+
                '<i>' + name + '</i>'+
                '<i class="checkoutItemPrice">' + tot + ' kr</i>'+
                '<br></div>'
            );
        }
    }

    $("#selectedItemsCheckout").append(
        '<div id="newPerson"><div>'
    );

    $("#newPerson").click(function(){newPerson();});

    update_view();
}

