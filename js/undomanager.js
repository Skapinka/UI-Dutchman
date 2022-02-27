/** Undo-redo stuff */

var undoStack = new Array(); // Fill this with past actions
var redoStack = new Array(); // Fill this with "future" actions

// This undo manager is functionally identical to Lars' example code.
//

// doFunc is used whenever a 'new' function is executed (as opposed to
// redone from the redo-stack). Resets the redo-stack.
function doFunc(func) {
    func.execute();
    undoStack.push(func);
    redoStack = [];
}

// Undo function
function undoFunc() {
    funcobj = undoStack.pop();
    funcobj.unexecute();
    redoStack.push.apply(funcobj);
}

// Redo function

function redoFunc() {
    funcobj = redoStack.pop();
    funcobj.reexecute();
    undoStack.push(funcobj);
}