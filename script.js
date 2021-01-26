var textArea = document.getElementById("editor");

var editor = CodeMirror.fromTextArea(textArea, {
    lineNumbers: true
});
editor.setSize("100%", "100%");