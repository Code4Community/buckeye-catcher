var input;

document.getElementById("run").addEventListener("click", (e) => {
    input = document.getElementById("code").value;
    run();
});

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
}
