function getStock() {
    var cc = [];
    for (i = 0; i < STOCK.spirits.length; i++) {
            cc.push([STOCK.spirits[i].artikelid, STOCK.spirits[i].namn, STOCK.spirits[i].stock);
  }
  return cc;
}


$(document).ready(function() {
    $('body').css("height", $(window).height()-10);

    beverageList = getStock();

    $.each(beverageList, function(element){
        printBeverage(this);

    });
});

function printBeverage(entry) {
        // Append a new div containing beverage info
        $("#Stock").append(
            entry[1] + entry[2]
        )
    }
