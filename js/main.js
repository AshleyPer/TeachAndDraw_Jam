import {Pen} from "../lib/Pen.js"
const p = new Pen(preload,setup,draw);
const shape=p.shape;
const colour=p.colour;
let x = 0;
let img=p.loadImage(0,0,"../images/sample.png");
let img2=p.loadImage(p.w/2,p.h/2,"../images/sample2.png");
let btn = p.makeButton(200,100,100,50);
let btn2 = p.makeButton(350,100,100,50);
btn.label=`Entity Id:${btn.id}`;
btn2.label=`Entity Id:${btn2.id}`;
window.pen=p;

p.preload();

function preload(){}

function setup() {
    p.w=800;
    p.h=350;
}

function draw() {
    colour.fill="grey";
    shape.rectangle(p.w/2,p.h/2,p.w,p.h);
    colour.fill="red";
    shape.rectangle(x,200,100,50);
    shape.rectangle(p.mouse.x,p.mouse.y,100,50);
    shape.oval(p.mouse.x, p.mouse.y, 50, 30); 
    shape.line(300, 50, 400, 150); 
    shape.multiline(10, 10, 50, 50, 10, 90);
    shape.shape(
        150+x, 100, 
        200+x, 150, 
        150+x, 200, 
        100+x, 150
    );

    x += 1;
    if (x > p.w)  {
        x = 0;
    }

    img.w=p.w;
    img.h=p.h;
    img.draw();
    img2.x=p.mouse.x-img2.w/2;
    img2.y=p.mouse.y-img2.h/2;
    img2.draw();
    btn.draw();
    btn2.draw();
}

//changing it so images have: an x and y
//makeImage(x,y,img)