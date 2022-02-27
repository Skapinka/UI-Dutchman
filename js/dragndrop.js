// This contains the functions that handle the drag and drop functionality of the header image 

// overrides the standard handling of drag and drop
function allowDrop(ev) {
    ev.preventDefault();
}

// not sure why "text", but it makes the address of the images to be "ship" and "ghost" instead of the filepath
function drag(ev){
    ev.dataTransfer.setData("text", ev.target.parentElement.id);
}


function drop(ev){
    make_drag(ev.target.id);
}

// changes the content of any div
function set_content(target, content){
    target.innerHTML = content;
}

// makes the drag thing happen, updating the model and then the view
function make_drag(to) {
    if (to == "ghost") {
	ghostContent = ghostImage;
	shipContent = "";
    } else if (to == "ship") {
	shipContent = shipImage;
	ghostContent = "";
    }
    update_view();
}


// need to save the image objects since there is two of them and one is always unseen
var shipImage  = "<img id=\"title_img\" src=\"img/ship.png\" draggable=\"true\" ondragstart=\"drag(event)\" alt=\"a flagship with white sails\"/>";
var ghostImage = "<img id=\"title_img\" src=\"img/ghostship.png\" draggable=\"true\" ondragstart=\"drag(event)\" alt=\"a ghost flagship with blue sails\"/> ";


// the content that is shown in the view
let shipContent = shipImage;
let ghostContent = "";

// waiting for the document to load before updating the view
document.addEventListener("DOMContentLoaded", function(event) {
    update_view();
});
