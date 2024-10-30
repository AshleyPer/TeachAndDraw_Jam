export default class Arrow {
    constructor(x,y,width,height,damage,speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.damage = damage;
        this.speed = speed;
    }

    //make the collider
    makeCollider(){
        this.collider = $.makeBoxCollider(this.x,this.y,this.width,this.height);
        this.collider.fill = "#0009bd";
        this.collider.speed = this.speed;
        this.collider.direction = 90;
        this.collider.friction = 0;
    }

    //draw the collider (might not be used if the collider is going to be added to a group)
    drawCollider(){
        this.collider.draw();
    }
}