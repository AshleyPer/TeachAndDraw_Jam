import { $ } from "../../lib/Pen.js";
import Enemy from "./Classes/Enemy.js";
import Fort from "./Classes/Fort.js";
import Friendly from "./Classes/Friendly.js";
import Arrow from "./Classes/Arrow.js";
import EnemyManager from "./Classes/EnemyManager.js";
import FriendlyManager from "./Classes/FriendlyManager.js";

$.use(update);

//$.debug = true;

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
const enemyManagerTopLane = new EnemyManager(friendlyManagers);
//create new enemy manager for middle lane
const enemyManagerMiddleLane = new EnemyManager(friendlyManagers);
//create new enemy manager for bottom lane
const enemyManagerBottomLane = new EnemyManager(friendlyManagers);
enemyMangers.push(enemyManagerTopLane);
enemyMangers.push(enemyManagerMiddleLane);
enemyMangers.push(enemyManagerBottomLane);
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

//temporarily setting speed high, for development purposes
let enemySpeed = 10;

const firstEnemy = new Enemy(100, $.h/2, 40, 40, 200, 20, 200, 0, enemySpeed, 90);

//const enemyFiringGroup = $.makeGroup();

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

    enemyManagerTopLane.drawEnemies();
    enemyManagerMiddleLane.drawEnemies();
    enemyManagerBottomLane.drawEnemies();

    drawLanesAndSpawnPoints();

    //draw the base
    drawBaseStuff();

    //check if the user clicked
    if($.mouse.leftReleased){
        userClicked();
    }

    debugStuff();

    $.colour.fill = "#f7ee97";
    $.shape.rectangle(($.w/2)+170,24,130,40)
    $.colour.fill = "#6b4801";
    $.text.print(($.w/2)+160,25,`Money: ${currentGold.toString()}G`,100);

    this.enemeyManger
    for (let enemeyManger of enemyMangers){
        enemeyManger.draw()
    }
    //enemyFiringGroup.draw();

    enemyStuff();
    
    spawnFriendlyButtons();


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

    fort.drawHealthBar();

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

//enemy firing
function enemyFiring(){
    if(enemyFiringGroup.length === 0){
        //need to cull the arrow after a certain amount of time
        enemyFiringGroup.push(createArrow());
    }
}

//create arrow
function createArrow(){
    //temp speed for development
    let tempspeed = 20;
    const arrow = $.makeBoxCollider(firstEnemy.collider.x+20,firstEnemy.collider.y,30,10);
    arrow.fill = "#0009bd";
    arrow.speed = tempspeed;
    arrow.direction = 90;
    
    arrow.friction = 0;
    arrow.damage = 30;
    return arrow;
}

//player stuff hit
function playerStuffHit(playerStuff, arrow){
    playerStuff.takeDamage(arrow.damage);
    arrow.remove();
}

function enemyStuff(){
    /*for (let friendly of friendlyManager.friendlyGroup) {
        if(friendly.collider.exists !== false){
            firstEnemy.checkTargetInRange(friendly.collider);
        }else{
            firstEnemy.collider.speed = firstEnemy.speed;
            firstEnemy.shooting = false;
        }
    }*/

    for (let enemeyManger of enemyMangers){
        //console.log(enemeyManger)
        enemeyManger.checkTargetsInRange()
    }

    
    
    /*
    
    if(firstEnemy.shooting === true){
        enemyFiring();
    }
        */

    //enemy suicide bomb the fort
    for (let enemy of enemyManagerMiddleLane.enemyGroup) {
        if (enemy.collider.collides(fort.collider)) {
            fort.takeDamage(enemy.damage);
            enemy.collider.remove();
        }
    }
}

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