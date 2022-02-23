/* This is the dictionary file, contains all text-content used on the website */

// Default language is english
var language = 'en'

dict = {
    'keys' : ['title', 'langtext', 'menu_all', 'menu_beer', 'menu_wine', 'menu_spirits',
                'menu_ecologic', 'menu_koscher', 'menu_specials', 'checkout_text', 'loginMessage'], // string keys
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
        "checkout_text": "Checkout",
        "loginMessage": "Welcome, "

    },

    // Swedish dictionary
    'sv': {
        'title': "Den Flygande Holländaren",
        'flag': "img/sv.png",
        "menu_all": "Alla",
        "menu_beer": "Öl",
        "menu_wine": "Vin",
        "menu_spirits": "Sprit",
        "menu_ecologic": "Eko",
        "menu_koscher": "Koscher",
        "menu_specials": "Specialare",
        "checkout_text": "Kundvagn",
        "loginMessage": "Välkommen, "

    },
}

// A function which will return the corresponding text to any key,
// using the selected language.
function get_string(key) {
    return dict[language][key]
}

// A function to toggle between english and swedish
function change_lang() {
    if (language=='en') {
        language = 'sv';
    } else {language = 'en'};
    update_view();
}