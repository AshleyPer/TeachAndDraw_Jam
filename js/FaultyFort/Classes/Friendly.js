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

        this.makeCollider();
    }

    //make the collider
    makeCollider(){
        this.collider = $.makeBoxCollider(this.x,this.y,this.width,this.height);
        this.collider.fill = "#00ff37";
        this.collider.static = true;
    }

    //draw the collider (might not be used if the collider is going to be added to a group)
    drawCollider(){
        this.collider.draw();
    }

    //draw friendly health bars
    drawHealthBar(){
        if(this.currentHealth > 0){
            //max health
            $.colour.fill = "#ff2f00";
            $.shape.rectangle(this.x, this.y-30, this.maxHealth/3, 8)

            //current health
            $.colour.fill = "#2bff00";
            $.shape.rectangle(this.x - (this.maxHealth-this.currentHealth)/6, this.y-30, this.currentHealth/3, 8)
        }
    }

    //check if an enemy is in attack range
    checkTargetInRange(){

    }

    //friendly takes damage
    takeDamage(damage){
        this.currentHealth -= damage;
        //check if the friendly still lives
        if(this.currentHealth <= 0){
            //friendly is dead...
            this.collider.remove();
            //also need to remove the instance of the class later
        }
    }
}