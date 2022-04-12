import editor from './page_setup';

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

// Code parsing
class Interpreter {
    constructor(gameObject) {
        this.test = ['moveleft', 'moveright', 'moveleft', 'moveleft', 'moveleft', 'moveleft'];
        this.testIndex = 0;

        this.gameObject = gameObject;

        this.level = 1;
        this.error = false;

        this.lang = [
            {
                symbol: 'stay', action: () => {
                    console.log('Stay');
                }
            },
            {
                symbol: 'moveleft', action: () => {
                    this.gameObject.moveLeft()
                }
            },
            {
                symbol: 'moveright', action: () => {
                    this.gameObject.moveRight()
                }
            }
        ]

        // Split input by whitespace and remove empty words
        this.input = editor.getValue().split(/\s+/);
        this.input = this.input.filter(function (e1) {
            return e1 !== '';
        })
    
        // Empty code
        if (this.input.length === 0) {
            showAlert('Code cannot be empty.');
            this.error = true;
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
        
        if (!this.error) {
            this.tree = [];
            this.run(this.input, this.tree);
            this.treeIndex = 0;
        }
    }

    step() {
        if (this.error) {
            return true;
        }

        if (this.treeIndex == this.tree.length) {
            return true;
        }

        var current = this.tree[this.treeIndex];

        if (typeof(current) == 'string') {
            this.findSymbol(current).action();
        }
        else {
            for (var branch of current) {
                var cond = branch[0];
                if (cond === '' || this.evaluate(cond)) {
                    var body = branch[1];
                    this.tree.splice(this.treeIndex, 1);
                    this.tree.splice(this.treeIndex, 0, ...body);
                    this.findSymbol(this.tree[this.treeIndex]).action()
                    break;
                }
            }
        }

        this.treeIndex++;
        return false;
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
        var keywords = ['forever', 'times', 'end', 'if', 'elif', 'else'];
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
        for (var symbol of this.lang) {
            if (symbol.symbol === sym) {
                return symbol;
            }
        }
        return false;
    }

    run(array, tree) {
        for (var i = 0; i < array.length; i++) {
            var x = this.findSymbol(array[i]);
            if (x) {
                tree.push(array[i]);
            }
            else if (array[i] === 'if') {
                i += this.runIf(array, i, tree);
            }
            else if (array[i] === 'forever') {
                i += this.runInfinite(array, i, tree)
            }
            else if (!isNaN(array[i])) {
                i += this.runTimes(array, i, tree);
            }
        }
    }

    runIf(array, start, tree) {
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
    
        var ifObject = [];
        for (var section of sections) {
            var body = [];
            
            this.run(array.slice(section.start, section.end + 1), body);

            var sec = [section.condition, body];
            ifObject.push(sec);
        }
        tree.push(ifObject);
    
        // Return how many indices to skip over
        return index[index.length - 1] - start;
    }

    runTimes(array, start, tree) {
        // Get end of the times loop
        var endIndex = this.findMatchingEnd(array, start + 2);
    
        // Run it x times
        var times = parseInt(array[start]);

        var code = array.slice(start + 2, endIndex); // Slice creates a new copy so safe
        var body = [];
        this.run(code, body);

        for (var i = 0; i < times; i++) {
            tree.push(...body)
        }
    
        // Return how many indices to skip over
        return endIndex - start;
    }

    runInfinite(array, start, tree) {
        // Get end of the times loop
        var endIndex = this.findMatchingEnd(array, start + 1);
    
        // Run it forever
        var code = array.slice(start + 1, endIndex); // Slice creates a new copy so safe
        var body = [];
        this.run(code, body);

        for (var i = 0; i < 1000; i++) {
            tree.push(...body)
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

export {Interpreter, showAlert};
