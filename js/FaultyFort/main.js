import { $ } from "../../lib/Pen.js";
import Enemy from "./Classes/Enemy.js";
import Fort from "./Classes/Fort.js";
import Friendly from "./Classes/Friendly.js";

$.use(update);

//$.debug = true;

let fort_icon = $.loadImage(0,0,"../images/Fort_Icon.jpg");

//create the fort
const fort = new Fort($.w - 20, $.h/2, 100, 100, 500, 0, fort_icon);

//set canvas dimensions
$.w = 1470;
$.h = 600;

let currentGold = 200;

//gold cost of tiles
const goldTileCost = 150;
const heavyTileCost = 100;
const lightTileCost = 50;
const archerTileCost = 50;

const baseTiles = [];

//add base tiles to the array
baseTiles.push({x: ($.w/2)+185, y: 120, width: 100, height: 80, minClickX: (($.w/2)+185)-(100/2), maxClickX: (($.w/2)+185)+(100/2), minClickY: 120-(80/2), maxClickY: 120+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+330, y: 120, width: 100, height: 80, minClickX: (($.w/2)+330)-(100/2), maxClickX: (($.w/2)+330)+(100/2), minClickY: 120-(80/2), maxClickY: 120+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+475, y: 120, width: 100, height: 80, minClickX: (($.w/2)+475)-(100/2), maxClickX: (($.w/2)+475)+(100/2), minClickY: 120-(80/2), maxClickY: 120+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+185, y: 220, width: 100, height: 80, minClickX: (($.w/2)+185)-(100/2), maxClickX: (($.w/2)+185)+(100/2), minClickY: 220-(80/2), maxClickY: 220+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+330, y: 220, width: 100, height: 80, minClickX: (($.w/2)+330)-(100/2), maxClickX: (($.w/2)+330)+(100/2), minClickY: 220-(80/2), maxClickY: 220+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+475, y: 220, width: 100, height: 80, minClickX: (($.w/2)+475)-(100/2), maxClickX: (($.w/2)+475)+(100/2), minClickY: 220-(80/2), maxClickY: 220+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+185, y: 320, width: 100, height: 80, minClickX: (($.w/2)+185)-(100/2), maxClickX: (($.w/2)+185)+(100/2), minClickY: 320-(80/2), maxClickY: 320+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+330, y: 320, width: 100, height: 80, minClickX: (($.w/2)+330)-(100/2), maxClickX: (($.w/2)+330)+(100/2), minClickY: 320-(80/2), maxClickY: 320+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+475, y: 320, width: 100, height: 80, minClickX: (($.w/2)+475)-(100/2), maxClickX: (($.w/2)+475)+(100/2), minClickY: 320-(80/2), maxClickY: 320+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+185, y: 420, width: 100, height: 80, minClickX: (($.w/2)+185)-(100/2), maxClickX: (($.w/2)+185)+(100/2), minClickY: 420-(80/2), maxClickY: 420+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+330, y: 420, width: 100, height: 80, minClickX: (($.w/2)+330)-(100/2), maxClickX: (($.w/2)+330)+(100/2), minClickY: 420-(80/2), maxClickY: 420+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+475, y: 420, width: 100, height: 80, minClickX: (($.w/2)+475)-(100/2), maxClickX: (($.w/2)+475)+(100/2), minClickY: 420-(80/2), maxClickY: 420+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+185, y: 520, width: 100, height: 80, minClickX: (($.w/2)+185)-(100/2), maxClickX: (($.w/2)+185)+(100/2), minClickY: 520-(80/2), maxClickY: 520+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+330, y: 520, width: 100, height: 80, minClickX: (($.w/2)+330)-(100/2), maxClickX: (($.w/2)+330)+(100/2), minClickY: 520-(80/2), maxClickY: 520+(80/2), blank: true, text: "Click me!"})
baseTiles.push({x: ($.w/2)+475, y: 520, width: 100, height: 80, minClickX: (($.w/2)+475)-(100/2), maxClickX: (($.w/2)+475)+(100/2), minClickY: 520-(80/2), maxClickY: 520+(80/2), blank: true, text: "Click me!"})

const firstEnemy = new Enemy(100, 296, 40, 40, 200, 20, 20, 0, 2);
const firstFriendly = new Friendly($.w/2 - 20, $.h/2, 40, 40, 200, 20, 20, 0, 2);

//setup the game, only called on frame 0
function setup(){
    console.log('we HOT!');
    firstEnemy.makeCollider();
    fort.makeCollider();
    firstFriendly.makeCollider();
}

//main game loop
function update() {
    if($.frameCount===0){
        setup();
    }

    fort.drawCollider();
    firstFriendly.drawCollider();

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

    //draw the base
    drawBaseStuff();

    //check if the user clicked
    if($.mouse.leftReleased){
        userClicked();
    }

    debugStuff();

    $.colour.fill = "#f7ee97";
    $.shape.rectangle(($.w/2)+172,24,130,40)
    $.colour.fill = "#6b4801";
    $.text.print(($.w/2)+160,25,`Money: ${currentGold.toString()}G`,100);

    //draw the first enemy
    firstEnemy.drawCollider();
}

//draw base tiles
function drawTiles(){
    for(let i = 0; i < baseTiles.length; i++){
        $.colour.fill = "#ffffff";
        $.shape.rectangle(baseTiles[i].x,baseTiles[i].y,baseTiles[i].width,baseTiles[i].height);

        if(baseTiles[i].text === "Click me!"){
            $.colour.fill = "#000000";
        }else{
            $.colour.fill = "#ffaa00";
        }
        $.text.print(baseTiles[i].x,baseTiles[i].y,baseTiles[i].text,50);
    }
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

//handle if a user clicked
function userClicked(){
    //check if the user clicked in range of a base tile
    for(let i = 0; i < baseTiles.length; i++){
        if(baseTiles[i].blank === false){
            continue;
        }
        if($.mouse.x >= baseTiles[i].minClickX && $.mouse.y >= baseTiles[i].minClickY && $.mouse.x <= baseTiles[i].maxClickX && $.mouse.y <= baseTiles[i].maxClickY){
            let popup = document.querySelector("#base-popup-box");
            popup.clicked=i;
            popup.style.display = "block";
        }
    }
}

//add event handlers to the buttons for the base tile popup
document.getElementById("goldMine").addEventListener("click", addGoldMine);
document.getElementById("heavy").addEventListener("click", addHeavy);
document.getElementById("light").addEventListener("click", addLight);
document.getElementById("archer").addEventListener("click", addArcher);

//functions for "adding" the tile to the base
function addGoldMine(){
    let goldError = document.querySelector("#goldError");

    if(goldError !== null){
        goldError.remove();
    }

    //user does not have enough gold
    if(currentGold < goldTileCost){
        let popupContent = document.querySelector("#popup-content");

        const newSpan = popupContent.appendChild(document.createElement("span"));
        newSpan.id = "goldError"
        newSpan.innerHTML = "You don't have enough gold!";
        newSpan.style.color = "red";
        newSpan.style.paddingTop = "10px";
        return;
    }

    let popup = document.querySelector("#base-popup-box");
    for(let i = 0; i < baseTiles.length; i++){
        if(i === popup.clicked){
            baseTiles[i].blank = false;
            baseTiles[i].text = "+10 Gold";
        }
    }
    popup.style.display = "none";
    currentGold-= goldTileCost;
}
function addHeavy(){
    let goldError = document.querySelector("#goldError");

    if(goldError !== null){
        goldError.remove();
    }
    //user does not have enough gold
    if(currentGold < heavyTileCost){
        let popupContent = document.querySelector("#popup-content");

        const newSpan = popupContent.appendChild(document.createElement("span"));
        newSpan.id = "goldError"
        newSpan.innerHTML = "You don't have enough gold!";
        newSpan.style.color = "red";
        newSpan.style.paddingTop = "10px";
        return;
    }

    let popup = document.querySelector("#base-popup-box");
    for(let i = 0; i < baseTiles.length; i++){
        if(i === popup.clicked){
            baseTiles[i].blank = false;
            baseTiles[i].text = "+1 Heavy";
        }
    }
    popup.style.display = "none";
    currentGold-= heavyTileCost;
}
function addLight(){
    let goldError = document.querySelector("#goldError");

    if(goldError !== null){
        goldError.remove();
    }

    //user does not have enough gold
    if(currentGold < lightTileCost){
        let popupContent = document.querySelector("#popup-content");

        const newSpan = popupContent.appendChild(document.createElement("span"));
        newSpan.id = "goldError"
        newSpan.innerHTML = "You don't have enough gold!";
        newSpan.style.color = "red";
        newSpan.style.paddingTop = "10px";
        return;
    }

    let popup = document.querySelector("#base-popup-box");
    for(let i = 0; i < baseTiles.length; i++){
        if(i === popup.clicked){
            baseTiles[i].blank = false;
            baseTiles[i].text = "+2 Light";
        }
    }
    popup.style.display = "none";
    currentGold-= lightTileCost;
}
function addArcher(){
    let goldError = document.querySelector("#goldError");

    if(goldError !== null){
        goldError.remove();
    }

    //user does not have enough gold
    if(currentGold < archerTileCost){
        let popupContent = document.querySelector("#popup-content");

        const newSpan = popupContent.appendChild(document.createElement("span"));
        newSpan.id = "goldError"
        newSpan.innerHTML = "You don't have enough gold!";
        newSpan.style.color = "red";
        newSpan.style.paddingTop = "10px";
        return;
    }

    let popup = document.querySelector("#base-popup-box");
    for(let i = 0; i < baseTiles.length; i++){
        if(i === popup.clicked){
            baseTiles[i].blank = false;
            baseTiles[i].text = "+1 Archer";
        }
    }
    popup.style.display = "none";
    currentGold-= archerTileCost;
}

//if user clicks on the window, and the popup box is open, close it
window.onclick = function(event) {
    if (event.target.id == "base-popup-box") {
        event.target.style.display = "none";
        let goldError = document.querySelector("#goldError");

        if(goldError !== null){
            goldError.remove();
        }
    }
}

//for debugging without using debugmode
function debugStuff(){
    //for creating a rectangle with the mouse x and y values
    if($.mouse.leftDown){
        $.colour.fill = "#ffffff";
        $.shape.rectangle($.mouse.x, $.mouse.y-30, 140, 60)
        $.colour.fill = "#000000";
        $.text.print($.mouse.x,$.mouse.y-40, `mouse x= ${$.mouse.x}`, 150);
        $.text.print($.mouse.x,$.mouse.y-20, `mouse y= ${$.mouse.y}`, 150);
    }
}