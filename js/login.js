var id = "null";

if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0);
}

function doLogin(form) {
    localStorage.setItem('credentials', "4");

    var username = form.username.value;
    var password = form.password.value;
    var db = DB.users;
    
    // Run through each entry in the user database
    $.each(db, function(index, item) {
        // First check for the username
        if (this.username == username) {
            // Then check for the password
            if (this.password == password) {
                // If the username and password match, proceed with the login
                user = this;
                $.each(this, function(element) {
                    localStorage.setItem('userdetails', userDetails(user.username));
                    localStorage.setItem('credentials', user.credentials);
                    return false;
                });
                loginRedirect(localStorage.getItem('credentials'));
            } else {
                alert("Wrong password and/or username!");
                return false;
            }
            return false;
        }
        if (index+1 == db.length) {
            alert("Wrong password and/or username!");
        }
    });
}

/**
 * User credentials (clearance level):
 * 0 - manager
 * 1 - bartender
 * 2 - waiter/waitress
 * 3 - vip customer
 * 
 * Normal customers do not log in.
 */

function loginRedirect(clearance) {
    if (clearance == "0") {window.location.href = "manager.html";}
    else if (clearance == "1") {window.location.href = "bartender.html";}
    else if (clearance == "2") {window.location.href = "waiter.html";}
    else if (clearance == "3") {window.location.href = "vip.html";}
    else {window.location.href = "customer.html";}
}