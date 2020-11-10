var input;

document.getElementById("run").addEventListener("click", (e) => {
    input = document.getElementById("code").value.split(/\s+/);
    parse(input);
});

var lang = [
    {symbol:"moveLeft", terminal: true, action: () => {
        console.log("Love ran")
    }},
    {symbol:"moveRight", terminal: true, action: () => {
        console.log("Person slows down")
    }},
    {symbol:"moveTo1", terminal: true, action: () => {
        console.log("Person speeds up")
    }},
    {symbol:"moveTo2", terminal: true, action: () => {
        console.log("Buckeye falls")
    }},
    {symbol:"if", terminal: false, action: () => {
        console.log("Things fall down faster")
    }},
    {symbol:"smallerBasket", terminal: true, action: () => {
        console.log("Basket gets shorter")
    }}
]

function parse(array) {
    for (let i = 0; i < array.length; i++) {
        var x = findSymbol(array[i]);
        if (x && x.terminal) {
            x.action();
        }
        else if (array[i] === "if") {
            i += parseIf(array, i);
        }
        else if (!isNaN(array[i])) {
            i += parseTimes(array, i);
        }
        else {
            /* Error */
        }
    }
}

function run()  {
    var array = input.split(/\s+/);
    console.log(array);
    for ( var a of array ) {
        var command = findSymbol(a);
        command.action();
    }
}

function findSymbol(sym) {
    for (var symbol of lang) {
        if (symbol.symbol === sym) {
            return symbol;
        }
    }
    return false;
}

function parseTimes(array, start) {
    // Get end of the times loop
    let endIndex = start + 2;
    let level = 0;
    let done = false;
    while (!done) {
        switch (array[endIndex]) {
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
        endIndex++;

        if (endIndex == array.length) {
            console.log("Error");
            break;
        }
    }

    // Run it x times
    let times = parseInt(array[start]);
    let body = array.slice(start + 2, endIndex - 1);
    for (let i = 0; i < times; i++) {
        //parse(body);
    }
    console.log(body);
    console.log(` runs ${times} times`)
    return endIndex;
}
