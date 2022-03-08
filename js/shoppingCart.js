//Function to add and remove beverages from the shopping cart

// Should contain for each item:
// ID, amount

var shoppingCart = [];

// total cost of order
var currentTotal = 0;

// Add a bevereage to the shopping cart


//// TODO: Find some way to unexecute. My idea was to always just save the 
// previous cart, but that didn't work as i thought. theres probably some smart way
// to utilize the undostack that i just haven't thought of yet.
function addBeverageFun(ID) {
    // not actually that fun, contrary to the function name

    var tempFunObject = {
        bevID: ID,
        bev: getBevByID(ID),
        cart: shoppingCart,

        execute: function() {
            for (i = 0; i <= this.cart.length; i++) {
                if (i == this.cart.length) {
                    this.cart.push([this.bev[0], 1]);
                    break;
                } else if (this.cart[i][0] == this.bev[0]) {
                    this.cart[i][1] += 1;
                    break;
                }
            }
            addPersonItems(0, this.bevID);
            renderCart(this.cart);
        },

        unexecute: function() {
            removeBeverageFun(this.bevID).execute();
        },

        reexecute: function() {
            addBeverageFun(this.bevID).execute();
        }
    }
    return tempFunObject
}

function removeBeverageFun(ID) {
    var tempFunObject = {
        bevID: ID,
        cart: shoppingCart,

        execute: function() {
            for(i=0 ; i < this.cart.length ; i++) {
                if (this.cart[i][0] === this.bevID){
                    if (this.cart[i][1] == 1) {
                        this.cart.splice(i, 1);
                    } else {
                        this.cart[i][1] += -1;
                    }
                }
            }
            removePersonItems(this.bevID);
            renderCart(this.cart);
        },

        unexecute: function() {
            addBeverageFun(this.bevID).execute();
        },

        reexecute: function() {
            removeBeverageFun(this.bevID).execute();
        }
    }

    return tempFunObject
}

// Clear all of the random information associated with the shopping cart
function clearCart() {
    shoppingCart = [];
    persons = [];
    renderCart();
    undoStack = [];
    redoStack = [];
    $("#selectedItemsCheckout").empty();
    return;
}

// Clear area, then loop through 'shoppingCart' and display each item 
function renderCart(shoppingCart) {
    $("#selectedItems").empty();
    var priceTotal = 0;

    // First check that shoppingCart exists (important when clearing)
    if (undefined !== shoppingCart){
        for (var i = 0; i < shoppingCart.length; i++) {

            // ID, name, price
            var bev = getBevByID(shoppingCart[i][0]);
            var amnt = shoppingCart[i][1];
            var name = bev[1];
            var tot = parseInt(shoppingCart[i][1])*bev[2];

            var priceTotal = priceTotal + tot;
            
            //Create entries for the selected beverages
            $("#selectedItems").append(
                '<div class="beverageSelected">' +
                '<div class="removeBeverage" onClick=\"doInit(\'removeBeverageFun\', shoppingCart['+i+'][0])">-</div>' +
                '<i>' + amnt + 'x </i>'+
                '<span class="selectedBeverageName"><b>' + name + '</b></span>'+
                '<br><i>' + tot + ' kr</i>'+
                '</div>'
            );
        }
    }

    document.getElementById("priceTotal").innerHTML = priceTotal + ' kr';
    currentTotal = priceTotal;

    renderCheckout(shoppingCart);
    update_view();
    return 0;
}




// Returns name and price of an item
// ID, name, price, alcohol

function getBevByID(ID) {
    var bev = [ID, 'null', 0, 0, 0];

    for (i = 0; i < DB2.spirits.length; i++) {
        if (DB2.spirits[i].artikelid == ID) {
            bev = [ID, DB2.spirits[i].namn, parseInt(DB2.spirits[i].prisinklmoms)];
            return bev;
        }
    }
    

    return bev;
}




///////////////////////////////////////////////////////////////////////////////////////////
//// FUNCTIONS IN THE AREA BELOW HAVE BEEN RE-BUILT, HARDER BETTER FASTER AND STRONGER ////
///////////////////////////////////////////////////////////////////////////////////////////

function addBeverage(entry) {
    ID = entry[0];
    bevName = entry[1];
    price = entry[2]
    for (i = 0; i <= shoppingCart.length; i++) {
        if (i == shoppingCart.length) {
            shoppingCart.push([ID, bevName, 1, price]);
            break;
        } else if (shoppingCart[i][0] == ID) {
            shoppingCart[i][2] += 1;
            break;
        }
    }
    renderCart(shoppingCart);
}

function removeBeverage(entry) {

    for(i=0 ; i < shoppingCart.length ; i++) {
        if (shoppingCart[i] === entry){
            if (entry[2] == 1) {
                shoppingCart.splice(i, 1);
            } else {
                shoppingCart[i][2] += -1;
            }
        }
    }

    renderCart(shoppingCart);
}

///////////////////////////////////////////////////////////////////////////////////////////
//// FUNCTIONS IN THE AREA ABOVE HAVE BEEN RE-BUILT, HARDER BETTER FASTER AND STRONGER ////
///////////////////////////////////////////////////////////////////////////////////////////