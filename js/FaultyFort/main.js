import { $ } from "../../lib/Pen.js";
$.use(update);

//$.debug = true;

/*
const redBall = $.makeCircleCollider(10, 200, 50);
redBall.speed = 25;
redBall.direction = 90;
redBall.friction = 0;
redBall.fill = "red";
redBall.mass=5;

const squares = $.makeGroup();
for (let i = 0; i < 100; i++) {
    const y_offset = i * 20;
    const square = $.makeBoxCollider($.w - 20, 20 + y_offset, 20, 20);
    square.velocity.x = -20;
    square.friction = 0;
    squares.push(square);
}
*/

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

    /*if(redBall.collides(squares)){
        console.log("1. ball hit squares",redBall.collides(squares)); 
        console.log("speed is",redBall.speed);
    }
    if(squares.collides(redBall)){
        console.log("2. squares hit balls",redBall.collides(squares));
    }
    redBall.draw();
    squares.draw();*/
}
