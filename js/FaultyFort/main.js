import { $ } from "../../lib/Pen.js";
import BaseTile from "../FaultyFort/Classes/BaseTile.js"

$.use(update);

//$.debug = true;

let fort_icon = $.loadImage(0,0,"../images/Fort_Icon.jpg");

//fort square
const square = $.makeBoxCollider($.w - 20, $.h/2, 100, 100);
//square.fill = "#fcf403";
square.asset = fort_icon;

//set canvas dimensions
$.w = 1470;
$.h = 600;

const baseTile1 = new BaseTile(($.w/2)+185,120,100,80);
const baseTile2 = new BaseTile(($.w/2)+330,120,100,80);
const baseTile3 = new BaseTile(($.w/2)+475,120,100,80);
const baseTile4 = new BaseTile(($.w/2)+185,220,100,80);
const baseTile5 = new BaseTile(($.w/2)+330,220,100,80);
const baseTile6 = new BaseTile(($.w/2)+475,220,100,80);
const baseTile7 = new BaseTile(($.w/2)+185,320,100,80);
const baseTile8 = new BaseTile(($.w/2)+330,320,100,80);
const baseTile9 = new BaseTile(($.w/2)+475,320,100,80);
const baseTile10 = new BaseTile(($.w/2)+185,420,100,80);
const baseTile11 = new BaseTile(($.w/2)+330,420,100,80);
const baseTile12 = new BaseTile(($.w/2)+475,420,100,80);
const baseTile13 = new BaseTile(($.w/2)+185,520,100,80);
const baseTile14 = new BaseTile(($.w/2)+330,520,100,80);
const baseTile15 = new BaseTile(($.w/2)+475,520,100,80);

//setup the game, only called on frame 0
function setup(){
    console.log('we HOT!');
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
    
    //enemy spawn3 bottom
    $.shape.oval(300,$.h-40,40,40,);
    $.colour.stroke = "#DCDCDC";
    $.colour.fill = "#00000000";

    $.shape.arc(740,250, 100,100, 20,90)

    $.shape.line(300,80,740,250)
    $.shape.line(320,0,765,185)
    $.shape.arc(740,350, 100,100, 90,160)

    $.shape.line(300,520,740,350)
    $.shape.line(320,0,765,185)

    drawBaseStuff();
}

//draw base tiles
function drawTiles(){
    baseTile1.drawTile();
    baseTile2.drawTile();
    baseTile3.drawTile();
    baseTile4.drawTile();
    baseTile5.drawTile();
    baseTile6.drawTile();
    baseTile7.drawTile();
    baseTile8.drawTile();
    baseTile9.drawTile();
    baseTile10.drawTile();
    baseTile11.drawTile();
    baseTile12.drawTile();
    baseTile13.drawTile();
    baseTile14.drawTile();
    baseTile15.drawTile();
}

function drawBaseStuff(){
    //base
    $.colour.stroke = "#00ff1a";
    $.colour.fill = "#ffffff";
    $.shape.rectangle(($.w/2)+330,320,450,500)

    //base healthbar red
    $.colour.stroke = "#000000";
    $.colour.fill = "#ff1e00";
    $.shape.rectangle (($.w/2)+330,55,450,18)

    //base healthbar green
    $.colour.stroke = "#000000";
    $.colour.fill = "#00ff1a";
    $.shape.rectangle (($.w/2)+305,55,400,18)

    //base tiles
    $.colour.stroke = "#ffaa00";
    $.colour.fill = "#ffffff";

    drawTiles();
}