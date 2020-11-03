var input;

document.getElementById("run").addEventListener("click", (e) => {
    input = document.getElementById("code").value;
    run();
});

var lang = [
    {symbol:"love", action: () => {
        console.log("Love ran")
    }},
    {symbol:"slowerPerson", action: () => {
        console.log("Person slows down")
    }},
    {symbol:"fasterPerson", action: () => {
        console.log("Person speeds up")
    }},
    {symbol:"buckeye", action: () => {
        console.log("Buckeye falls")
    }},
    {symbol:"badThing", action: () => {
        console.log("Bad thing falls")
    }},
    {symbol:"night", action: () => {
        console.log("It becomes nighttime")
    }}, 
    {symbol:"slowerFall", action: () => {
        console.log("Things fall down slower")
    }},
    {symbol:"fasterFall", action: () => {
        console.log("Things fall down faster")
    }},
    {symbol:"sunglassesOn", action: () => {
        console.log("Person puts on sunglasses")
    }},
    {symbol:"sunglassesOff", action: () => {
        console.log("Person takes off sunglasses")
    }},
    {symbol:"biggerBasket", action: () => {
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
