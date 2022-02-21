// update_view runs through the website and updates the view using a simple
// jQuery statement.

function update_view() {
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
}

// Do the first update once the website is ready loading.
$(document).ready(function() {
    update_view();
})