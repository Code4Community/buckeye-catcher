var input;

document.getElementById("run").addEventListener("click", (e) => {
    input = document.getElementById("code").value.split(/\s+/);
    parse(input);
});

const start_block = "(";
const end_block = ")";

var lang = [
    {symbol:"moveLeft", action: () => {
        console.log("Love ran")
    }},
    {symbol:"moveRight", action: () => {
        console.log("Person slows down")
    }},
    {symbol:"moveTo1", action: () => {
        console.log("Person speeds up")
    }},
    {symbol:"moveTo2", action: () => {
        console.log("Buckeye falls")
    }},
    {symbol:"rustle", action: () => {
        console.log("Bad thing falls")
    }},
    {symbol:"boom", action: () => {
        console.log("It becomes nighttime")
    }}, 
    {symbol:"wind", action: () => {
        console.log("Things fall down slower")
    }},
    {symbol:"if", action: () => {
        console.log("Things fall down faster")
    }},
    {symbol:"elif", action: () => {
        console.log("Person puts on sunglasses")
    }},
    {symbol:"else", action: () => {
        console.log("Person takes off sunglasses")
    }},
    {symbol:"times10", action: () => {
        console.log("Basket gets longer")
    }},
    {symbol:"smallerBasket", action: () => {
        console.log("Basket gets shorter")
    }}
]

function run()  {
    var array = input.split(/\s+/);
    console.log(array);
    parse(array, 0, array.length);
}

function parse(array, start, end) {
    for (start; start < end; start++) {
        var start = findSymbol(array[start]).action(array, start, end);
    }
}

function findBlock(array, start) {
    var parenCount = 0;
    for (start;  start < array.length(); start++) {
        if (array[start] === start_block) parenCount++;
        if (array[start] === end_block)  parenCount--;
        if (parenCount == 0) return start;
    } 
}

function parseIf(array, index) {
    
    index++; // Remove If at beginning of array.

    var condition = findSymbol(array[index]).action();
    index++; // Advance index from condition

    if(condition) {
        var block = findBlock(array, index);
        parse()
    }

    let start = start + 2;
    let end = start + 2;
    while (array[end] != "else") {
        end += 1;
    }
    firstBody = array[start:end];

}

function findSymbol(sym) {
    for (var symbol of lang) {
        if (symbol.symbol === sym) {
            return symbol;
        }
    }
}
