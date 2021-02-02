var c = document.getElementById("game");
var ctx = c.getContext("2d");

ctx.moveTo(0, 0);
ctx.lineTo(0, 150);
ctx.stroke();

ctx.moveTo(85, 150);
ctx.lineTo(85, 0);
ctx.stroke();

ctx.moveTo(170, 0);
ctx.lineTo(170, 150);
ctx.stroke();

ctx.moveTo(255, 150);
ctx.lineTo(255, 0);
ctx.stroke();
