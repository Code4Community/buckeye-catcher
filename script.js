var input;

document.getElementById("run").addEventListener("click", (e) => {
    input = document.getElementById("code").innerHTML;
    run();
});

var lang = [
    {symbol:"love", action: () => {
        console.log("Love ran")
    }}
]

function run()  {
    var array = input.split(' ');
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
