// Constants
var NUMBER_OF_COLUMNS = 6;
var CANVAS_WIDTH_PERCENTAGE = 0.66;
var NAV_ID = "navbar"
var CANVAS_ID = "game"
var EDITOR_ID = "editor"

// DOM Elements
var navbar = document.getElementById(NAV_ID)
var textArea = document.getElementById(EDITOR_ID);

// CodeMirror Setup
var editor = CodeMirror.fromTextArea(textArea, {
    lineNumbers: true
});

// Canvas Setup
var c = document.getElementById(CANVAS_ID);
var ctx = c.getContext("2d")

buildPage(window.innerWidth, window.innerHeight)

function buildPage(windowWidth, windowHeight) {
    // Set canvas size
    var navbarHeight = navbar.clientHeight
    c.width = Math.floor(windowWidth * CANVAS_WIDTH_PERCENTAGE)
    c.height = Math.floor(windowHeight - navbarHeight)

    // Set CodeMirror size
    editor.setSize(Math.floor(windowWidth - c.width), c.height);

    // Create columns
    var columnWidth = c.width / NUMBER_OF_COLUMNS
    for (var i = 0; i < c.width; i += columnWidth) {
        ctx.moveTo(i, 0)
        ctx.lineTo(i, c.height);
        ctx.stroke()
    }
}

var image = new Image(300, 300)
image.src = "images/buckeye-logo.jpg"

image.onload = function () {
    ctx.drawImage(image, 100, 100)
}



