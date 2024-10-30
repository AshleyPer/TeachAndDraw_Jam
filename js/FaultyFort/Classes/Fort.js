export default class Fort {
    constructor(x,y,width,height,maxHealth,resistance,icon){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxHealth = maxHealth;
        this.resistance = resistance;
        this.currentHealth = maxHealth;
        this.icon = icon;
    }

    //make the collider
    makeCollider(){
        this.collider = $.makeBoxCollider(this.x,this.y,this.width,this.height);
        this.collider.asset = this.icon;
    }

    //draw the collide
    drawCollider(){
        this.collider.draw();
    }
}