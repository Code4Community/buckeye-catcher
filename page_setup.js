// Constants
var NUMBER_OF_COLUMNS = 6;
var CANVAS_WIDTH_PERCENTAGE = 0.66;
var NAV_ID = "navbar"
var CANVAS_ID = "game"
var EDITOR_ID = "editor"

// Global Variables
var canvas = document.getElementById(CANVAS_ID);
var ctx = canvas.getContext("2d")
var editor;
var indent = 0;

// DOM Elements
var navbar = document.getElementById(NAV_ID)
var textArea = document.getElementById(EDITOR_ID);

// CodeMirror Setup
CodeMirror.defineSimpleMode("mode", {
    start: [
        { regex: /(?:if|times|elif|else|end)\b/, token: "control", indent: true},
        { regex: /(?:moveleft|moveright|skip)\b/, token: "statement"},
        { regex: /(?:rustle|boom|wind)\b/, token: "condition"},
        { regex: /(?:[1-9][0-9]*)\b/, token: "digits"},
    ],
    meta: {
        electricInput: /elif|else|end$/,
        indent: function (state, textAfter, line) {
            first_word = textAfter.split()[0].toLowerCase()
            console.log(first_word)
            console.log(state)
            console.log(line)
            if (first_word in ['elif', 'else', 'end']) {
                console.log("1")
                indent -= 2
            } else if (first_word == 'if') {
                console.log("2")
                indent += 2
            }
            return indent;
        }
    }
});

editor = CodeMirror.fromTextArea(textArea, {
    lineNumbers: true,
    mode: "mode"
});


// Page Setup
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;

// Set canvas size
var navbarHeight = navbar.clientHeight
canvas.width = Math.floor(windowWidth * CANVAS_WIDTH_PERCENTAGE)
canvas.height = Math.floor(windowHeight - navbarHeight)

// Set CodeMirror size
editor.setSize(Math.floor(windowWidth - canvas.width), canvas.height);

// Create columns
var columnWidth = canvas.width / NUMBER_OF_COLUMNS
for (var i = 0; i < canvas.width; i += columnWidth) {
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvas.height);
    ctx.stroke()
}
