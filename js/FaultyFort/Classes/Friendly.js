export default class Friendly {
    constructor(x,y,width,height,maxHealth,damage,attackRange,resistance,speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxHealth = maxHealth;
        this.damage = damage;
        this.attackRange = attackRange;
        this.resistance = resistance;
        this.speed = speed;
        this.currentHealth = maxHealth;
    }

    //make the collider
    makeCollider(){
        this.collider = $.makeBoxCollider(this.x,this.y,this.width,this.height);
        this.collider.fill = "#00ff37";
        /*this.collider.speed = this.speed;
        this.collider.direction = 90;
        this.collider.friction = 0;*/
    }

    //draw the collider (might not be used if the collider is going to be added to a group)
    drawCollider(){
        this.collider.draw();
    }
}