import { $ } from "../../lib/Pen.js";
$.use(update);

//$.debug = true;

let fort_icon = $.loadImage(0,0,"../images/Fort_Icon.jpg");

//fort square
const square = $.makeBoxCollider($.w - 20, $.h/2, 100, 100);
//square.fill = "#fcf403";
square.asset = fort_icon;

//setup the game, only called on frame 0
function setup(){
    console.log('we HOT!');
    $.w = 1320;
    $.h = 600;
}

//main game loop
function update() {
    if($.frameCount===0){
        setup();
    }

    square.draw();

    $.colour.stroke = "#000000";
    $.colour.fill = "#ff0000";

    //enemy spawn1 top
    $.shape.oval(300,40,40,40,);

    //enemy spawn2 middle
    $.shape.oval(40,$.h/2,40,40,);

    //middle 2 lanes
    $.colour.stroke = "#ff0000";
    $.shape.line(70,($.h/2)-40,($.w/2)+70,($.h/2)-40)
    $.shape.line(70,($.h/2)+40,($.w/2)+70,($.h/2)+40)

    $.colour.stroke = "#000000";
    //enemy spawn3 top
    $.shape.oval(300,$.h-40,40,40,);
}
