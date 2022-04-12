import CodeMirror from "codemirror";
import "codemirror/addon/mode/simple.js";
import "codemirror/lib/codemirror.css";

// Constants
var EDITOR_ID = "editor"

// DOM Elements
var textArea = document.getElementById(EDITOR_ID);

//CodeMirror Setup
CodeMirror.defineSimpleMode("mode", {
    start: [
        { regex: /(?:if|times|forever)\b/, token: "control", indent: true},
        { regex: /(?:elif|else)\b/, token: "control", dedent: true, indent: true},
        { regex: /(?:end)\b/, token: "control", dedent: true},
        { regex: /(?:moveleft|moveright|stay)\b/, token: "statement"},
        { regex: /(?:rustle|boom|wind|true|false)\b/, token: "condition"},
        { regex: /(?:[1-9][0-9]*)\b/, token: "digits"},
    ],
    meta: {
        electricInput: /elif|else|end/
    }
});

// Pull code from local storage
if (localStorage.getItem('code')) {
    textArea.value = localStorage.getItem('code');
}

var editor = CodeMirror.fromTextArea(textArea, {
    lineNumbers: true,
    mode: "mode"
});

editor.setSize("100%", "100%");

// When the text field changes, mirror it to the end object 
editor.on('change', () => {
    let user = editor.getValue();
    localStorage.setItem('code', user);
    console.log('Code saved');
});

$(".dropdown-menu li a").click(function(){
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
});

export default editor;
