export default class EnemyManager {
    constructor(friendlyGroups, fort){
        this.friendlyGroups = friendlyGroups;
        this.enemyGroup = $.makeGroup();
        this.enemyFiringGroup = $.makeGroup();
        this.fort = fort;
    }

    //add the enemy to the enemy group
    addEnemy(enemy){
        this.enemyGroup.push(enemy);
    }

    //draw enemies and their healthbars
    drawEnemies(){
        for (let enemy of this.enemyGroup) {
            enemy.collider.draw();
            //no health bars on the enemy yet
            //enemy.drawHealthBar();
        }
    }

    drawProjectiles(){
        this.enemyFiringGroup.draw()

        //loop through the enemy firing group and check if an arrow collides with a friendly
        for (let arrow of this.enemyFiringGroup) {
            for (let friendly of this.friendlyGroups.friendlyGroup) {
                if (arrow.collides(friendly.collider)) {
                    console.log("bullet collided with friendly?")
                    this.playerStuffHit(friendly, arrow);
                }
            }
        }
    }

    enemyFiring(enemy, friendly){
        if(this.enemyFiringGroup.length === 0){
            //need to cull the arrow after a certain amount of time
            let arrow = this.createArrow(enemy,friendly)
            arrow.lifespan = 1000;
            this.enemyFiringGroup.push(arrow);
        }
    }

    playerStuffHit(playerStuff, arrow){
        playerStuff.takeDamage(arrow.damage);
        arrow.remove();
    }

    createArrow(enemy, friendly){
        //temp speed for development
        let direction = this.determineArrowDirection(enemy, friendly)
        let tempspeed = 20;
        const arrow = $.makeBoxCollider(enemy.collider.x,enemy.collider.y,20,10);
        arrow.fill = "#0009bd";
        arrow.speed = tempspeed;
        arrow.direction = direction - 90; // Minus 90 for the angle offset of TAD
        
        arrow.friction = 0;
        arrow.damage = 30;
        return arrow;
    }

    determineArrowDirection(enemy, friendly){
        let radian_angle = Math.atan((enemy.collider.y - friendly.collider.y) / (enemy.collider.x - friendly.collider.x));
        let degree_angle = (radian_angle) * (180 / Math.PI);
        return degree_angle - 180;
    }

    //it means if any enemy kills a target, then all the other enemies will continue moving
    checkTargetsInRange(){
        for (let friendly of this.friendlyGroups.friendlyGroup) {
            if(friendly.collider.exists !== false){
                for (let enemy of this.enemyGroup){
                    enemy.checkTargetInRange(friendly.collider);
                    if(enemy.shooting === true){
                        this.enemyFiring(enemy);
                    }
                }
            }else{
                for (let enemy of this.enemyGroup){
                    enemy.collider.speed = enemy.speed;
                    enemy.shooting = false;
                    
                }
            }
        }
    }
    checkAnyTargetInRange(){
        for (let friendlyGroup of this.friendlyGroups){
            for (let friendly of friendlyGroup.friendlyGroup) {
                if(friendly.collider.exists !== false){
                    for (let enemy of this.enemyGroup){
                        if (enemy.checkTargetInRange(friendly.collider)){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    checkClosestFriendly(enemy){
        let closestFriendly = undefined;

        for (let friendly of this.friendlyGroups.friendlyGroup) {
            if(friendly.collider.exists !== false){
                if (enemy.justCheckTargetInRange(friendly.collider)){
                    if (closestFriendly === undefined){
                        closestFriendly = friendly;
                    }else if (this.checkDistance(friendly,enemy) < this.checkDistance(closestFriendly,enemy)){
                        closestFriendly = friendly;
                    }
                }
            }
        }
        return closestFriendly;
    }

    handleEnemyActions(){
        for (let enemy of this.enemyGroup){
            let nearestFriendly = this.checkClosestFriendly(enemy);
            if (nearestFriendly){
                enemy.collider.speed = 0;
                enemy.shooting = true;
                this.enemyFiring(enemy, nearestFriendly);
            }else{
                enemy.collider.speed = enemy.speed;
                enemy.shooting = false;
            }
        }
    }

    checkDistance(t1,t2){
        return (t1.x - t2.x)^2 + (t1.y - t2.y)^2;
    }

    diveBombFort(){
        for (let enemy of this.enemyGroup){
            if (enemy.collider.collides(this.fort.collider)) {
                this.fort.takeDamage(enemy.damage);
                enemy.collider.remove();
            }
        }
    }
}