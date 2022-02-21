/* This is the dictionary file, contains all text-content used on the website */

// Default language is english
var language = 'en'

dict = {
    'keys' : ['title', 'langtext', 'loginTitle'], // string keys
    'pics' : ['flag'],           // picture keys

    // English dictionary
    'en': {
        'title': "The Flying Dutchman",
        'flag': "img/en.png",
        'loginTitle': "Log in"
    },

    // Swedish dictionary
    'sv': {
        'title': "Den Flygande Holländaren",
        'flag': "img/sv.png",
        'loginTitle': "Logga in"
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