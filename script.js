var code = "I love apples!";
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
        
    }
}
