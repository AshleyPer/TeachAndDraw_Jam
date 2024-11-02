import { $ } from "../../lib/Pen.js";
import Enemy from "./Classes/Enemy.js";
import Fort from "./Classes/Fort.js";
import Friendly from "./Classes/Friendly.js";
import EnemyManager from "./Classes/EnemyManager.js";
import FriendlyManager from "./Classes/FriendlyManager.js";
import BaseManager from "./Classes/BaseManager.js";
import BaseTile from "./Classes/BaseTile.js";

$.use(update);

//$.debug = true;

//load the fort icon
let fort_icon = $.loadImage(0,0,"../images/Fort_Icon.jpg");
//create the fort
const fort = new Fort($.w - 20, $.h/2, 100, 100, 500, 0, fort_icon);

//create new friendly manager for top lane
const friendlyManagerTopLane = new FriendlyManager();
//create new friendly manager for middle lane
const friendlyManagerMiddleLane = new FriendlyManager();
//create new friendly manager for bottom lane
const friendlyManagerBottomLane = new FriendlyManager();

const friendlyManagers = [];
friendlyManagers.push(friendlyManagerTopLane,friendlyManagerMiddleLane,friendlyManagerBottomLane);

const enemyMangers = [];

//create new enemy manager for top lane
const enemyManagerTopLane = new EnemyManager(friendlyManagers,fort);
//create new enemy manager for middle lane
const enemyManagerMiddleLane = new EnemyManager(friendlyManagers,fort);
//create new enemy manager for bottom lane
const enemyManagerBottomLane = new EnemyManager(friendlyManagers,fort);
enemyMangers.push(enemyManagerTopLane);
enemyMangers.push(enemyManagerMiddleLane);
enemyMangers.push(enemyManagerBottomLane);

//set canvas dimensions
$.w = 1470;
$.h = 600;

//create new base manager
const baseManager = new BaseManager();

//temporarily setting speed high, for development purposes
let enemySpeed = 10;

//setup the game, only called on frame 0
function setup(){
    console.log('we HOT!');

    fort.makeCollider();

    friendlyManagerTopLane.addFriendly(new Friendly($.w/2 - 10, $.h/2 - 95, 40, 40, 200, 20, 20, 0, 2));
    friendlyManagerMiddleLane.addFriendly(new Friendly($.w/2 - 50, $.h/2, 40, 40, 200, 20, 20, 0, 2));
    friendlyManagerBottomLane.addFriendly(new Friendly($.w/2 - 10, $.h/2 + 95, 40, 40, 200, 20, 20, 0, 2));

    enemyManagerTopLane.addEnemy(new Enemy(360, 60, 40, 40, 200, 20, 200, 0, enemySpeed, 112));
    enemyManagerMiddleLane.addEnemy(new Enemy(100, $.h/2, 40, 40, 200, 20, 200, 0, enemySpeed, 90));
    enemyManagerBottomLane.addEnemy(new Enemy(360, $.h - 60, 40, 40, 200, 20, 200, 0, enemySpeed, 68));

    //add base tiles to base manager
    baseManager.addBaseTile(new BaseTile(1,($.w/2)+185,120,100,80));
    baseManager.addBaseTile(new BaseTile(2,($.w/2)+330,120,100,80));
    baseManager.addBaseTile(new BaseTile(3,($.w/2)+475,120,100,80));
    baseManager.addBaseTile(new BaseTile(4,($.w/2)+185,220,100,80));
    baseManager.addBaseTile(new BaseTile(5,($.w/2)+330,220,100,80));
    baseManager.addBaseTile(new BaseTile(6,($.w/2)+475,220,100,80));
    baseManager.addBaseTile(new BaseTile(7,($.w/2)+185,320,100,80));
    baseManager.addBaseTile(new BaseTile(8,($.w/2)+330,320,100,80));
    baseManager.addBaseTile(new BaseTile(9,($.w/2)+475,320,100,80));
    baseManager.addBaseTile(new BaseTile(10,($.w/2)+185,420,100,80));
    baseManager.addBaseTile(new BaseTile(11,($.w/2)+330,420,100,80));
    baseManager.addBaseTile(new BaseTile(12,($.w/2)+475,420,100,80));
    baseManager.addBaseTile(new BaseTile(13,($.w/2)+185,520,100,80));
    baseManager.addBaseTile(new BaseTile(14,($.w/2)+330,520,100,80));
    baseManager.addBaseTile(new BaseTile(15,($.w/2)+475,520,100,80));
}

//main game loop
function update() {
    if($.frameCount===0){
        setup();
    }

    fort.drawCollider();

    friendlyManagerTopLane.drawFriendlies();
    friendlyManagerMiddleLane.drawFriendlies();
    friendlyManagerBottomLane.drawFriendlies();

    drawLanesAndSpawnPoints();

    //draw the base
    drawBaseStuff();

    //check if the user clicked
    if($.mouse.leftReleased){
        userClicked();
    }

    debugStuff();

    enemyStuff();
    
    spawnFriendlyButtons();

}


function drawBaseStuff(){
    //base
    $.colour.stroke = "#00ff1a";
    $.colour.fill = "#ffffff";
    $.shape.rectangle(($.w/2)+330,320,450,500)

    fort.drawHealthBar();

    //base tiles
    $.colour.stroke = "#ffaa00";
    $.colour.fill = "#ffffff";

    baseManager.drawBaseTiles();
    baseManager.drawCurrentGoldSection();
    baseManager.drawStockSection();
}

//handle if a user clicked
function userClicked(){
    //check if the user clicked in range of a base tile
    for (let baseTile of baseManager.baseTileGroup){
        if(baseTile.blank === false){
            continue;
        }
        baseTile.checkIfClicked();
    }

    //check if user clicked the unit creator buttons

}

//add event handlers to the buttons for the base tile popup
document.getElementById("goldMine").addEventListener("click", addClickedTile);
document.getElementById("heavy").addEventListener("click", addClickedTile);
document.getElementById("light").addEventListener("click", addClickedTile);
document.getElementById("archer").addEventListener("click", addClickedTile);

//when a user clicks the buttons in the modal to add units or gold
function addClickedTile(event){
    let tileCost = parseInt(event.target.getAttribute('cost'));
    let tileText = event.target.getAttribute('tileText');

    let goldError = document.querySelector("#goldError");

    if(goldError !== null){
        goldError.remove();
    }

    //user does not have enough gold
    if(baseManager.currentGold < tileCost){
        let popupContent = document.querySelector("#popup-content");

        const newSpan = popupContent.appendChild(document.createElement("span"));
        newSpan.id = "goldError"
        newSpan.innerHTML = "You don't have enough gold!";
        newSpan.style.color = "red";
        newSpan.style.paddingTop = "10px";
        return;
    }

    baseManager.changeClickedTileText(tileText)
    baseManager.currentGold-= tileCost;
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

//do all enemy things
function enemyStuff(){
    //draw the enemy groups
    enemyManagerTopLane.drawEnemies();
    enemyManagerMiddleLane.drawEnemies();
    enemyManagerBottomLane.drawEnemies();

    //check if targets in range, and also allow the enemies to dive bomb the fort
    for (let enemeyManger of enemyMangers){
        enemeyManger.checkTargetsInRange();
        enemeyManger.diveBombFort();
    }

    //for drawing the enemy projectiles
    for (let enemeyManger of enemyMangers){
        enemeyManger.drawProjectiles()
    }
}

//draw the lines and spawn points on the screen
function drawLanesAndSpawnPoints(){
    //enemy spawn1 top
    $.colour.stroke = "#000000";
    $.colour.fill = "#ff0000";
    $.shape.oval(300,40,40,40,);

    //top lanes
    $.colour.stroke = "#ff0000";
    $.colour.fill = "#00000000";
    $.shape.arc(740,250, 100,100, 20,90)
    $.shape.line(300,80,740,250)
    $.shape.line(320,0,765,185)
    $.colour.fill = "#ff0000";

    //enemy spawn2 middle
    $.shape.oval(40,$.h/2,40,40,);

    //middle 2 lanes
    $.colour.stroke = "#ff0000";
    $.shape.line(70,($.h/2)-40,($.w/2) - 4,($.h/2)-40)
    $.shape.line(70,($.h/2)+40,($.w/2) - 4,($.h/2)+40)

    $.colour.stroke = "#000000";
    
    //enemy spawn3 bottom
    $.shape.oval(300,$.h-40,40,40,);
    $.colour.stroke = "#DCDCDC";
    $.colour.fill = "#00000000";

    //bottom lanes
    $.colour.stroke = "#ff0000";
    $.shape.line(300,520,740,350)
    $.shape.line(300,600,765,415) //do this
    $.shape.arc(740,350, 100,100, 90,160)
}

//add the "buttons" to spawn the friendlies in each lane
function spawnFriendlyButtons(){
    spawnFriendlyButtonsTop();
    spawnFriendlyButtonsMiddle();
    spawnFriendlyButtonsBottom();
}

//add the "buttons" to spawn the friendlies in top lane
function spawnFriendlyButtonsTop(){
    //TODO tie these into the UnitAllocator
    //Light unit square
    $.colour.stroke = "#adadad";
    $.colour.fill = "#adadad";
    $.shape.rectangle(($.w/2) + 30,($.h/2)-145,20,20)
    $.colour.fill = "#000000";
    $.text.print(($.w/2) + 30,($.h/2)-143,`L`,20);

    //Archer unit square
    $.colour.stroke = "#876b4c";
    $.colour.fill = "#876b4c";
    $.shape.rectangle(($.w/2) + 55,($.h/2)-145,20,20)
    $.colour.fill = "#000000";
    $.text.print(($.w/2) + 55,($.h/2)-143,'A',20);

    //Archer unit square
    $.colour.stroke = "#ff8600";
    $.colour.fill = "#ff8600";
    $.shape.rectangle(($.w/2) + 80,($.h/2)-145,20,20)
    $.colour.fill = "#000000";
    $.text.print(($.w/2) + 80,($.h/2)-143,'H',20);
}

//add the "buttons" to spawn the friendlies in middle lane
function spawnFriendlyButtonsMiddle(){
    //Light unit square
    $.colour.stroke = "#adadad";
    $.colour.fill = "#adadad";
    $.shape.rectangle(($.w/2) - 110,($.h/2)-55,20,20)
    $.colour.fill = "#000000";
    $.text.print(($.w/2) - 110,($.h/2)-53,`L`,20);

    //Archer unit square
    $.colour.stroke = "#876b4c";
    $.colour.fill = "#876b4c";
    $.shape.rectangle(($.w/2) - 85,($.h/2)-55,20,20)
    $.colour.fill = "#000000";
    $.text.print(($.w/2) - 85,($.h/2)-53,'A',20);

    //Archer unit square
    $.colour.stroke = "#ff8600";
    $.colour.fill = "#ff8600";
    $.shape.rectangle(($.w/2) - 60,($.h/2)-55,20,20)
    $.colour.fill = "#000000";
    $.text.print(($.w/2) - 60,($.h/2)-53,'H',20);
}

//add the "buttons" to spawn the friendlies in bottom lane
function spawnFriendlyButtonsBottom(){
    //Light unit square
    $.colour.stroke = "#adadad";
    $.colour.fill = "#adadad";
    $.shape.rectangle(($.w/2) + 30,($.h)-165,20,20)
    $.colour.fill = "#000000";
    $.text.print(($.w/2) + 30,($.h)-163,`L`,20);

    //Archer unit square
    $.colour.stroke = "#876b4c";
    $.colour.fill = "#876b4c";
    $.shape.rectangle(($.w/2) + 55,($.h)-165,20,20)
    $.colour.fill = "#000000";
    $.text.print(($.w/2) + 55,($.h)-163,'A',20);

    //Archer unit square
    $.colour.stroke = "#ff8600";
    $.colour.fill = "#ff8600";
    $.shape.rectangle(($.w/2) + 80,($.h)-165,20,20)
    $.colour.fill = "#000000";
    $.text.print(($.w/2) + 80,($.h)-163,'H',20);
}