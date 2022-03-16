
// Notifications appearing across the entire page upon ex. purchase made

$(document).ready(function() {
    $("#buyNotification").click(function(){payNotification(false)});
    $("#payCreditsNotification").click(function(){payCreditsNotification(false)});
    $("#noCreditsNotification").click(function(){noCreditsNotification(false)});
    $("#securityNotification").click(function(){securityNotification(false)});
    $("#addedCreditNotification").click(function(){addedCreditNotification(false)});
    $("#notAddedCreditNotification").click(function(){notAddedCreditNotification(false)});
});


// Notification if paying with credits
// State is true or false depending on opening or closing the notification
function payCreditsNotification(state) {
    if (state) {
        $("#payCreditsNotification").show();
    } else {
        $("#payCreditsNotification").hide();
    }
}

// Notification if not enough credits
function noCreditsNotification(state) {
    if (state) {
        $("#noCreditsNotification").show();
    } else {
        $("#noCreditsNotification").hide();
    }
}

// Notification upon payment
function payNotification(state) {
    if (state) {
        $("#buyNotification").show();
    } else {
        $("#buyNotification").hide();
    }
}

function securityNotification(state) {
    if (state) {
        $("#securityNotification").show();
    } else {
        $("#securityNotification").hide();
    }
}

function addedCreditNotification(state) {
    if (state) {
        $("#addedCreditNotification").show();
    } else {
        $("#addedCreditNotification").hide();
    }
}

function notAddedCreditNotification(state) {
    if (state) {
        $("#notAddedCreditNotification").show();
    } else {
        $("#notAddedCreditNotification").hide();
    }
}
