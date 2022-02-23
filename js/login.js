var id = "null";

if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0);
    localStorage.setItem('credentials', 4);
}

// Login function takes the login form as input
function doLogin(form) {

    // Default credentials is 4 (normal customer)
    localStorage.setItem('credentials', "4");

    // Get username and pass from form
    var username = form.username.value;
    var password = form.password.value;
    
    // Get user database
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

                    // Store user details on local memory
                    localStorage.setItem('userdetails', userDetails(user.username));
                    localStorage.setItem('credentials', user.credentials);
                    return false;
                });

                // Redirect the user depending on their credentials 
                loginContent(localStorage.getItem('credentials'));
            } else {

                // Username correct, password wrong
                alert("Wrong password and/or username!");
                return false;
            }
            return false;
        }

        // Username not in database 
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

 function loginContent(clearance) {
    
    // VIP LOGIN CONTENT
    if (clearance == 0) {
        $("#loginForm").hide();
        
        $("#loginZone").append(
            '<div id="loggedIn">' + '<div id="loginMessage"></div>' +
            '<b>' + localStorage.getItem('userdetails').split(",")[2] + '</b>' +
            '<p>Credits: ' + localStorage.getItem('userdetails').split(",")[5] + '</p>' +
            '</div>'
        );

        $("#menuTabs").append(
            '<li id="menu_specials"  class="mTab"></li>'
        );

        $("#menu_specials").click(function(){
            selectTab("specials");
            currentTab = "specials";
            beverageList = getBeverageType('Sake');
            $("#menuItems").empty();
            $.each(beverageList, function(element){
                printBeverage(this);
            });
        });
            
        update_view();
    }
}

// Function to redirect user depending on clearance level.
// May be replaced with non-redirecting functionality that just keeps track of the clearance instead.
