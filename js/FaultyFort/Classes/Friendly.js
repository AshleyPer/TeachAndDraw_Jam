export default class Friendly {
    constructor(x,y,width,height,maxHealth,damage,attackRange,resistance,speed,type,moveRange){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        if(type === "Light"){
            this.damage = 20;
            this.maxHealth = 200;
        }else if(type === "Archer"){
            this.damage = 40;
            this.maxHealth = 150;
        }else if(type === "Heavy"){
            this.damage = 20;
            this.maxHealth = 400;
        }
        this.attackRange = attackRange;
        this.moveRange = moveRange;
        this.resistance = resistance;
        this.speed = speed;
        this.type = type;
        this.currentHealth = this.maxHealth;
        this.lastShot = 0;
        this.makeCollider();
    }

    //make the collider
    makeCollider(){
        this.collider = $.makeBoxCollider(this.x,this.y,this.width,this.height);
        if(this.type === "Light"){
            this.collider.fill = "#adadad";
        }else if(this.type === "Archer"){
            this.collider.fill = "#876b4c";
        }else if(this.type === "Heavy"){
            this.collider.fill = "#ff8600";
        }
        this.collider.static = true;
    }

    //draw friendly health bars

    drawHealthBar(){
        if(this.currentHealth > 0){
            $.colour.fill = "#ff2f00";
            $.shape.rectangle(this.collider.x, this.collider.y-15, this.maxHealth/5, 4)

            //current health
            $.colour.fill = "#2bff00";
            $.shape.rectangle(this.collider.x - (this.maxHealth-this.currentHealth)/10, this.collider.y-15, this.currentHealth/5, 4)
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

    justCheckTargetInRange(target){
        if(Math.abs(target.x - this.collider.x) <= this.attackRange && target.exists === true){
            return true;
        }else{
            return false;
        }
    }
    justCheckTargetInWalkRange(target){
        if(Math.abs(target.x - this.collider.x) <= this.moveRange && target.exists === true){
            return true;
        }else{
            return false;
        }
    }
}