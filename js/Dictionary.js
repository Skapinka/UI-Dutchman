/* This is the dictionary file, contains all text-content used on the website */

// Default language is english
var language = 'en'

dict = {
    'keys' : ['title', 'langtext', 'menu_all', 'menu_beer', 'menu_wine', 'menu_spirits',
                'menu_ecologic', 'menu_koscher', 'menu_specials', 'shoppingCart_text',
                'loginMessage', 'undoButton', 'redoButton', 'payBar', 'payTable',
                "paymentButton", "tableNumberText"], // string keys
    'pics' : ['flag'],           // picture keys

    // English dictionary
    'en': {
        'title': "The Flying Dutchman",
        'flag': "img/en.png",
        "menu_all": "All",
        "menu_beer": "Beer",
        "menu_wine": "Wine",
        "menu_spirits": "Spirits",
        "menu_ecologic": "Eco",
        "menu_koscher": "Koscher",
        "menu_specials": "Specials",
        "shoppingCart_text": "Shopping Cart",
        "loginMessage": "Welcome, ",
        "undoButton": "Undo",
        "redoButton": "Redo",
        "payBar": "Pay at the bar",
        "payTable": "Pay by my table",
        "paymentButton": "Make order",
        "tableNumberText": "Table #:"
    },

    // Swedish dictionary
    'sv': {
        'title': "The Flying Dutchman",
        'flag': "img/sv.png",
        "menu_all": "Alla",
        "menu_beer": "Öl",
        "menu_wine": "Vin",
        "menu_spirits": "Sprit",
        "menu_ecologic": "Eko",
        "menu_koscher": "Koscher",
        "menu_specials": "Specialare",
        "shoppingCart_text": "Kundvagn",
        "loginMessage": "Välkommen, ",
        "undoButton": "Ångra",
        "redoButton": "O-ångra",
        "payBar": "Betala i baren",
        "payTable": "Betala vid bordet",
        "paymentButton": "Beställ",
        "tableNumberText": "Bordsnr.:"
    },

    //German dictionary
    'du': {
      'title': "The Flying Dutchman",
      'flag': "img/du.png",
      "menu_all": "Alle",
      "menu_beer": "Bier",
      "menu_wine": "Wein",
      "menu_spirits": "Spirituosen",
      "menu_ecologic": "Öko",
      "menu_koscher": "Koscher",
      "menu_specials": "Spezial",
      "shoppingCart_text": "Einkaufswagen",
      "loginMessage": "Willkommen, ",
      "undoButton": "Umkehren",  /*aufmachen?*/
      "redoButton": "Wiederholen",
      "payBar": "Bezahlen an der Bar",
      "payTable": "Zahlen an den Tisch",
      "paymentButton": "Bestellen",
      "tableNumberText": "Tischnr.:"
    },
}

// A function which will return the corresponding text to any key,
// using the selected language.
function get_string(key) {
    return dict[language][key]
}

// A function to toggle between english and swedish
// function change_lang() {
//     if (language=='en') {
//         language = 'sv';
//     } else {language = 'en'};
//     update_view();
// }

function change_lang() {
    if (language=='en') {
        language = 'sv';
    } else if (language=='sv') {
        language = 'du';
    } else {
        language = 'en';
    }
    update_view();
}
