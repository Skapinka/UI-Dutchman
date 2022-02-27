//Function to add new beverages to the shopping cart


// Should contain for each item:
// ID, name, amount, price
var shoppingCart = [];

// Add a bevereage to the shopping cart
// Entry: ID, Name, Amount
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

    // Add beverage by beverage ID
    // If beverage already added - update amount
    // price = price*amount
    // X button

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


// Clear area, then loop through 'shoppingCart' and display each item 
function renderCart(shoppingCart) {
    $("#selectedItems").empty();

    for (i = 0; i < shoppingCart.length; i++) {
        $("#selectedItems").append(
            '<div class="beverageSelected">' +
            '<div class="removeBeverage" onClick="removeBeverage(shoppingCart['+i+'])">-</div>' +
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

