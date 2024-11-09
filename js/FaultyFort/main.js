import { $ } from "../../lib/Pen.js";
import Enemy from "./Classes/Enemy.js";
import Fort from "./Classes/Fort.js";
import Friendly from "./Classes/Friendly.js";
import EnemyManager from "./Classes/EnemyManager.js";
import FriendlyManager from "./Classes/FriendlyManager.js";
import BaseManager from "./Classes/BaseManager.js";
import BaseTile from "./Classes/BaseTile.js";
import UnitAllocator from "./Classes/UnitAllocator.js";
import Round from "./Classes/Round.js";

$.use(update);

//$.debug = true;

//load the fort icon
let fort_icon = $.loadImage(0,0,"../images/Fort_Icon.jpg");
//create the fort
const fort = new Fort($.w - 20, $.h/2, 100, 100, 500, 0, fort_icon);

//create new friendly manager for top lane
const friendlyManagerTopLane = new FriendlyManager(706,790,174,242);
//create new friendly manager for middle lane
const friendlyManagerMiddleLane = new FriendlyManager(600,724,264,335);
//create new friendly manager for bottom lane
const friendlyManagerBottomLane = new FriendlyManager(706,790,355,415);

const friendlyManagers = [];
friendlyManagers.push(friendlyManagerTopLane,friendlyManagerMiddleLane,friendlyManagerBottomLane);

const enemyMangers = [];

//create new enemy manager for top lane
const enemyManagerTopLane = new EnemyManager(friendlyManagerTopLane,fort);
//create new enemy manager for middle lane
const enemyManagerMiddleLane = new EnemyManager(friendlyManagerMiddleLane,fort);
//create new enemy manager for bottom lane
const enemyManagerBottomLane = new EnemyManager(friendlyManagerBottomLane,fort);
enemyMangers.push(enemyManagerTopLane);
enemyMangers.push(enemyManagerMiddleLane);
enemyMangers.push(enemyManagerBottomLane);


friendlyManagerTopLane.addEnemyGroup(enemyManagerTopLane);
friendlyManagerMiddleLane.addEnemyGroup(enemyManagerMiddleLane);
friendlyManagerBottomLane.addEnemyGroup(enemyManagerBottomLane);

//set canvas dimensions
$.w = 1470;
$.h = 600;

//create new base manager
const baseManager = new BaseManager();

//temporarily setting speed high, for development purposes
let enemySpeed = 10;

let round = new Round();

const startRoundButton = $.makeButton($.w / 2 - 20, 90, 105, 35, "Start Round");
startRoundButton.background = "#80ffb3";
startRoundButton.secondaryColour = "#54ebff";

//setup the game, only called on frame 0
function setup(){
    console.log('we HOT!');

    fort.makeCollider();

    /*friendlyManagerTopLane.addFriendly(new Friendly(friendlyManagerTopLane.calculateRandomX(), friendlyManagerTopLane.calculateRandomY(), 20, 20, 200, 20, 20, 0, 2, "Light"));
    friendlyManagerMiddleLane.addFriendly(new Friendly(friendlyManagerMiddleLane.calculateRandomX(), friendlyManagerMiddleLane.calculateRandomY(), 20, 20, 200, 20, 20, 0, 2, "Archer"));
    friendlyManagerBottomLane.addFriendly(new Friendly(friendlyManagerBottomLane.calculateRandomX(), friendlyManagerBottomLane.calculateRandomY(), 20, 20, 200, 20, 20, 0, 2, "Heavy"));

    enemyManagerTopLane.addEnemy(new Enemy(360, 60, 40, 40, 200, 20, 200, 0, enemySpeed, 112));
    enemyManagerMiddleLane.addEnemy(new Enemy(100, $.h/2, 40, 40, 200, 20, 200, 0, enemySpeed, 90));
    enemyManagerBottomLane.addEnemy(new Enemy(360, $.h - 60, 40, 40, 200, 20, 200, 0, enemySpeed, 68));*/

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

    //top lane allocators
    baseManager.addAllocator(new UnitAllocator(1,($.w/2)+30,($.h/2)-145,20,20,($.w/2)+30,($.h/2)-143,'L',20,"Light","Top",friendlyManagerTopLane));
    baseManager.addAllocator(new UnitAllocator(2,($.w/2)+55,($.h/2)-145,20,20,($.w/2)+55,($.h/2)-143,'A',20,"Archer","Top",friendlyManagerTopLane));
    baseManager.addAllocator(new UnitAllocator(3,($.w/2)+80,($.h/2)-145,20,20,($.w/2)+80,($.h/2)-143,'H',20,"Heavy","Top",friendlyManagerTopLane));
    //middle lane allocators
    baseManager.addAllocator(new UnitAllocator(4,($.w/2)-110,($.h/2)-55,20,20,($.w/2)-110,($.h/2)-53,'L',20,"Light","Middle",friendlyManagerMiddleLane));
    baseManager.addAllocator(new UnitAllocator(5,($.w/2)-85,($.h/2)-55,20,20,($.w/2)-85,($.h/2)-53,'A',20,"Archer","Middle",friendlyManagerMiddleLane));
    baseManager.addAllocator(new UnitAllocator(6,($.w/2)-60,($.h/2)-55,20,20,($.w/2)-60,($.h/2)-53,'H',20,"Heavy","Middle",friendlyManagerMiddleLane));
    //bottom lane allocators
    baseManager.addAllocator(new UnitAllocator(7,($.w/2)+30,($.h)-165,20,20,($.w/2)+30,($.h)-163,'L',20,"Light","Bottom",friendlyManagerBottomLane));
    baseManager.addAllocator(new UnitAllocator(8,($.w/2)+55,($.h)-165,20,20,($.w/2)+55,($.h)-163,'A',20,"Archer","Bottom",friendlyManagerBottomLane));
    baseManager.addAllocator(new UnitAllocator(9,($.w/2)+80,($.h)-165,20,20,($.w/2)+80,($.h)-163,'H',20,"Heavy","Bottom",friendlyManagerBottomLane));


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

    roundStuff();
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
    baseManager.drawAllocators();
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
    baseManager.checkClickedAllocator();
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
        //enemeyManger.checkTargetsInRange();
        enemeyManger.handleEnemyActions()
        enemeyManger.diveBombFort();
    }

    for (let friendlyManager of friendlyManagers){
        friendlyManager.handleActions();
    }

    for (let friendlyManager of friendlyManagers){
        friendlyManager.drawProjectiles();
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

//function for handling the concept of rounds
function roundStuff(){
    if(round.roundTimer.isDone() === false){
        $.colour.fill = "#ffffff";
        $.text.size = 27;
        $.text.print($.w/2 - 20,20, "Round starts in:", 250);
        $.text.print($.w/2 - 20,50, Math.round(round.roundTimer.frames/60).toString(), 250);
        startRoundButton.draw();
    }
    round.roundTimer.update();

    //if user clicks "Start Round"
    if(startRoundButton.up){
        round.roundTimer.setDone();
        round.incrementRound();

        if(round.roundNumber !== 1){
            baseManager.incrementGold();
        }
        //spawn enemies here
        spawnEnemies();
    }

    //check enemy count if not round 0, should determine if all enemies are dead
    if(round.roundNumber !== 0 && round.roundTimer.isDone()){
        let totalEnemies = 0;
        for (let enemeyManger of enemyMangers){
            totalEnemies +=enemeyManger.checkEnemyCount();
        }
        console.log("totalEnemies=", totalEnemies)
        if(totalEnemies === 0){
            //round over, start next round
            console.log("all enemies dead, time to start next round!");
            round.roundTimer.resetTimer(3600);
            baseManager.friendlyStock.resetStock();
        }
    }
}

//spawn enemies
function spawnEnemies(){
    //top lane spawn
    for(let i = 0; i < round.topLaneEnemyNumber; i++){
        enemyManagerTopLane.addEnemy(new Enemy(330 - i * 80, 60 - i * 30, 40, 40, 200, 20, 200, 0, enemySpeed, 112));
    }
    console.log(round.middleLaneEnemyNumber)
    //middle lane spawn
    for(let i = 0; i < round.middleLaneEnemyNumber; i++){
        enemyManagerMiddleLane.addEnemy(new Enemy(80 - i * 80, $.h/2, 40, 40, 200, 20, 200, 0, enemySpeed, 90));
    }
    //bottom lane spawn
    for(let i = 0; i < round.bottomLaneEnemyNumber; i++){
        enemyManagerBottomLane.addEnemy(new Enemy(330 - i * 80, $.h - 60 + i * 30, 40, 40, 200, 20, 200, 0, enemySpeed, 68));
    }
}