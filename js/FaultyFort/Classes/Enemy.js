export default class Enemy {
    constructor(x,y,width,height,maxHealth,damage,attackRange,resistance,speed,direction){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxHealth = maxHealth;
        this.damage = damage;
        this.attackRange = attackRange;
        this.resistance = resistance;
        this.speed = speed;
        this.direction = direction;
        this.currentHealth = maxHealth;
        this.shooting = false;
        
        this.makeCollider();
    }

    //make the collider
    makeCollider(){
        this.collider = $.makeBoxCollider(this.x,this.y,this.width,this.height);
        this.collider.fill = "#ba1130";
        this.collider.speed = this.speed;
        this.collider.direction = this.direction;
        this.collider.friction = 0;
    }

    //check if a friendly or fort is in attack range
    checkTargetInRange(target){
        if((target.x - this.collider.x) <= this.attackRange && target.exists === true){
            this.collider.speed = 0;
            //time to get the enemy to start firing!
            this.shooting = true;
            return true;
        }else{
            this.collider.speed = this.speed;
            this.shooting = false;
            return false;
        }
    }

    justCheckTargetInRange(target){
        if((target.x - this.collider.x) <= this.attackRange && target.exists === true){
            return true;
        }else{
            return false;
        }
    }
}