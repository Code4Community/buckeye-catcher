// Code Mirror setup
var textArea = document.getElementById('editor');

var editor = CodeMirror.fromTextArea(textArea, {
    lineNumbers: true
});
editor.setSize('100%', '100%');

// Testing alert
function showAlert(message) {
    $('#alert-container').html('<div id="alert" class="alert alert-danger"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + message + '</div>');
    $('#alert').css('visibility', 'visible');
}

function showSuccess(message) {
    $('#alert-container').html('<div id="alert" class="alert alert-success"><a href="#" class="close" id="close" data-dismiss="alert" aria-label="close">&times;</a>' + message + '</div>');
    $('#alert').css('visibility', 'visible');

    $('#alert').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).remove();
    });
}

// Language definition
var conditions = ['rustle', 'boom', 'wind', 'true', 'false']
var lang = [
    {symbol:'skip',  action: () => {
        console.log('Skip')
    }},
    {symbol:'moveleft',  action: () => {
        console.log('Moving left')
    }},
    {symbol:'moveright',  action: () => {
        console.log('Moving right')
    }}
]

// Code parsing
class Interpreter {
    constructor(game) {
        this.game = game

        this.level = 1;
        this.error = false;

        // Split input by whitespace and remove empty words
        this.input = editor.getValue().split(/\s+/);
        this.input = this.input.filter(function (e1) {
            return e1 !== '';
        })
    
        // Empty code
        if (this.input.length === 0) {
            showAlert('Code cannot be empty.');
            return;
        }

        // Create a copy of code to tokenize and parse
        var copy = this.input.slice();
        if(this.tokenize(copy)) {
            this.parse(copy)
        }
        else {
            this.error = true;
        }

        // If successful, restart game and execute the code
        if (!this.error) {
            showSuccess('Success!');
            // TODO: Restart game
            try {
                this.run(this.input);
            }
            catch (error) {
                if (error.name === 'GameEnded') {
                    console.log(error.message);
                }
                else {
                    throw error;
                }
            }
            console.log('Game has ended.')
        }
    }

    // Evaluates a condition
    // TODO: Change to add reference to game (to evaluate condition within game)
    evaluate(condition) {
        if (condition === 'false') {
            return false;
        }
        else {
            return true;
        }
    }

    tokenize(array){
        var keywords = ['times', 'end', 'if', 'elif', 'else'];
        for (var i = 0; i < array.length; i++) {
            if(!isNaN(array[i]) || keywords.includes(array[i]) || this.findSymbol(array[i]) || conditions.includes(array[i])) {
                continue;
            }
            else {
                // Error
                showAlert(array[i] + ' is invalid.');
                return false;
            }
        }
        return true;
    }

    parse(array) {
        this.error = false;
        if (array.length == 1 && array[0] == '') {
            return;
        }
        this.parseSequence(array);
        if (!this.error && array.length != 0) {
            showAlert('Too many ends.');
            this.error = true;
        }
    }

    parseSequence(array) {
        while (array.length > 0) {
            if (this.error) {
                return;
            }
            if (['end', 'elif', 'else'].includes(array[0])) {
                return;
            }
            this.parseCommand(array);
        }
    }

    parseCommand(array) {
        var command = array[0];
        if (command == 'if') {
            this.parseIf(array);
        }
        else if (command == 'forever') {
            this.parseInfinite(array);
        }
        else if (!isNaN(command)) {
            this.parseLoop(array);
        }
        else if (this.findSymbol(command)) {
            this.parseStatement(array);
        }
        else {
            showAlert(command + ' is not a valid command.');
            this.error = true;
            return;
        }
    }

    parseIf(array){
        //get rid of if
        array.shift()
        var cond = array.shift();
        if (!cond) {
            showAlert('Missing condition.');
            this.error = true;
            return;
        }
        if(!conditions.includes(cond)) {
            showAlert(cond + ' is not a valid condition.');
            this.error = true;
            return;
        }
        this.parseSequence(array);
        if(array[0] == 'elif'){
            this.parseElif(array);
        }
        if(array[0] == 'else'){
            array.shift();
            this.parseSequence(array);
        }
        if(array[0] != 'end'){
            showAlert('Missing end.');
            this.error = true;
            return;
        }
        array.shift();
    }

    parseElif(array){
        array.shift();
        var cond = array.shift();
        if (!cond) {
            showAlert('Missing condition.');
            this.error = true;
            return;
        }
        if(!conditions.includes(cond)){
            showAlert(cond + ' is not a valid condition.');
            this.error = true;
            return;
        }
        this.parseSequence(array);
        if(array[0] == 'elif'){
            this.parseElif(array);
        }
    }

    parseLoop(array){
        //gets rid of number
        array.shift();
        if(array[0]!='times'){
            showAlert('Missing times.');
            this.error = true;
            return;
        }
        //gets rid of times
        array.shift();
        this.parseSequence(array);
        if(array[0]!='end'){
            showAlert('Missing end.');
            this.error = true;
            return;
        }
        array.shift();
    }

    parseInfinite(array) {
        // Get rid of forever
        array.shift();
        this.parseSequence(array);
        if(array[0]!='end'){
            showAlert('Missing end.');
            this.error = true;
            return;
        }
        array.shift();
    }

    parseNumber(array) {
        var number = array.shift();
        return parseInt(number);
    }

    parseStatement(array) {
        var statement = array.shift();
        var symbol = this.findSymbol(statement);
    }

    findSymbol(sym) {
        for (var symbol of lang) {
            if (symbol.symbol === sym) {
                return symbol;
            }
        }
        return false;
    }

    run(array) {
        for (var i = 0; i < array.length; i++) {
            var x = this.findSymbol(array[i]);
            if (x) {
                x.action();
            }
            else if (array[i] === 'if') {
                i += this.runIf(array, i);
            }
            else if (array[i] === 'forever') {
                i += this.runInfinite(array, i)
            }
            else if (!isNaN(array[i])) {
                i += this.runTimes(array, i);
            }
        }
    }

    runIf(array, start) {
        // Get parts of the if statement
        // Make this the indices of the special words of if statement like elif" "else" "end"
        var index = this.findIfSections(array, start + 2);
        index.unshift(start);
    
        var sections = [];
        for (var i = 0; i < index.length - 1; i++) {
            var object = {
                condition: '',
                start: 0,
                end: index[i + 1] - 1
            };
    
            if (array[index[i]] == 'else') {
                object.start = index[i] + 1;
            }
            else {
                object.condition = array[index[i] + 1];
                object.start = index[i] + 2;
            }
            sections.push(object);
        }
    
        for (var section of sections) {
            if (this.evaluate(section.condition)) {
                this.run(array.slice(section.start, section.end + 1));
                break;
            }
        }
    
        // Return how many indices to skip over
        return index[index.length - 1] - start;
    }

    runTimes(array, start) {
        // Get end of the times loop
        var endIndex = this.findMatchingEnd(array, start + 2);
    
        // Run it x times
        var times = parseInt(array[start]);
        var body = array.slice(start + 2, endIndex); // Slice creates a new copy so safe
        for (var i = 0; i < times; i++) {
            this.run(body);
        }
    
        // Return how many indices to skip over
        return endIndex - start;
    }

    runInfinite(array, start) {
        // Get end of the times loop
        var endIndex = this.findMatchingEnd(array, start + 1);
    
        // Run it forever
        var body = array.slice(start + 1, endIndex); // Slice creates a new copy so safe
        while (true) {
            this.run(body);
        }
    
        // Return how many indices to skip over
        return endIndex - start;
    }

    // Returns the ending index of the matching "end", starting at index
    // Do not include the starting tag (the "times" or the "if" that we are finding the
    // matching "end" of)
    findMatchingEnd(array, index) {
        var level = 0;
        var done = false;
        while (!done) {
            switch (array[index]) {
                case "if":
                case "times":
                    level++;
                    break;
                case "end":
                    level--;
                    if (level === -1) {
                        done = true;
                    }
                    break;
                default:
                    break;
            }
            index++;
        }
        return index - 1;
    }

    findIfSections(array, index) {
        var level = 0;
        var done = false;
        var output = [];
    
        while (!done) {
            switch (array[index]) {
                case 'if':
                case 'times':
                    level++;
                    break;
                case 'end':
                    level--;
                    if (level === -1) {
                        output.push(index);
                        done = true;
                    }
                    break;
                case 'else':
                    if(level === 0){
                        output.push(index);
                    }
                    break;
                case 'elif':
                    if(level === 0){
                        output.push(index);
                    }
                    break;
                default:
                    break;
            }
            index++;
            if (index > array.length) {
                //Error
                break;
            }
        }
        return output;
    }
}
