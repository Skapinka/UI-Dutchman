//Function to add and remove beverages from the shopping cart

// Should contain for each item:
// ID, name, amount, price

var shoppingCart = [];

// Add a bevereage to the shopping cart
// Entry: ID, Name, Amount


//// TODO: Find some way to unexecute. My idea was to always just save the 
// previous cart, but that didn't work as i thought. theres probably some smart way
// to utilize the undostack that i just haven't thought of yet.
function addBeverageFun(entry) {
    // not actually that fun, contrary to the function name

    var tempFunObject = {

        bev: entry,
        cart: shoppingCart,

        execute: function() {
            for (i = 0; i <= this.cart.length; i++) {
                if (i == this.cart.length) {
                    this.cart.push([this.bev[0], this.bev[1], 1, this.bev[2]]);
                    break;
                } else if (this.cart[i][0] == this.bev[0]) {
                    this.cart[i][2] += 1;
                    break;
                }
            }
            renderCart(shoppingCart);
        },

        unexecute: function() {
            renderCart(shoppingCart);
        },

        reexecute: function() {
            renderCart(shoppingCart);
        }
    }
    return tempFunObject
}

function removeBeverageFun(entry, oldCart) {
    var tempFunObject = {
        bev: entry,
        cart: shoppingCart,
        oldCart: oldCart,

        execute: function() {
            for(i=0 ; i < this.cart.length ; i++) {
                if (this.cart[i] === this.bev){
                    if (this.bev[2] == 1) {
                        this.cart.splice(i, 1);
                    } else {
                        this.cart[i][2] += -1;
                    }
                }
            }
            renderCart(shoppingCart);
        },

        unexecute: function() {
            return 0
        },
    }

    return tempFunObject
}


// Clear area, then loop through 'shoppingCart' and display each item 
function renderCart(shoppingCart) {
    $("#selectedItems").empty();

    for (i = 0; i < shoppingCart.length; i++) {
        $("#selectedItems").append(
            '<div class="beverageSelected">' +
            '<div class="removeBeverage" onClick=\"doInit(\'removeBeverageFun\', shoppingCart['+i+'])">-</div>' +
            '<i>' + shoppingCart[i][2] + 'x </i>'+
            '<b>' + shoppingCart[i][1] + '</b>'+
            '<br><i>' + (parseInt(shoppingCart[i][2])*parseInt(shoppingCart[i][3])) + ' kr</i>'+
            '</div>'
        );
    }
    update_view();
    
    return shoppingCart.length;
}


// Returns name and price of an item

// BROKEN. For some reason using this function messes with the renderCart function, making it
// only render a single item. I dunno, but ive
function getBevByID(ID) {
    var bev = ['null', 0];

    for (i = 0; i < DB2.spirits.length; i++) {
        if (DB2.spirits[i].artikelid == ID) {
            bev = [DB2.spirits[i].namn, DB2.spirits[i].prisinklmoms];
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