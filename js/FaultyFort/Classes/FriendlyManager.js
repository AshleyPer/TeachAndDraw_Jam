export default class FriendlyManager {
    constructor(minClickX,maxClickX,minClickY,maxClickY){
        this.minClickX = minClickX;
        this.maxClickX = maxClickX;
        this.minClickY = minClickY;
        this.maxClickY = maxClickY;
        this.friendlyFiringGroup = $.makeGroup();
        this.friendlyGroup = $.makeGroup();
    }

    addEnemyGroup(enemyGroup){
        this.enemyGroup = enemyGroup;
    }

    calculateRandomX() {
        let randomX = Math.random() * (this.maxClickX - this.minClickX) + this.minClickX;
        console.log("randomX=", randomX);
        return randomX;
    }

    calculateRandomY() {
        let randomY = Math.random() * (this.maxClickY - this.minClickY) + this.minClickY;
        console.log("randomY=", randomY);
        return randomY;
    }

    //add the friendly to the friendly group
    addFriendly(friendly){
        this.friendlyGroup.push(friendly);
    }

    //draw friendlies and their healthbars
    drawFriendlies(){
        for (let friendly of this.friendlyGroup) {
            friendly.collider.draw();
            friendly.drawHealthBar();
        }
    }

    createArrow(enemy, friendly){
        //temp speed for development
        //let direction = this.determineArrowDirection(friendly, enemy)
        
        let tempspeed = 20;
        const arrow = $.makeBoxCollider(friendly.collider.x,friendly.collider.y,5,5);
        arrow.fill = "#0009bd";
        arrow.speed = tempspeed;
        //arrow.direction = direction - 90; // Minus 90 for the angle offset of TAD
        arrow.direction = friendly.collider.direction;
        
        arrow.friction = 0;
        arrow.damage = 30;
        return arrow;
    }

    /*
    friendlyFiring(enemy, friendly){
        if(this.enemyFiringGroup.length === 0){
            //need to cull the arrow after a certain amount of time
            let arrow = this.createArrow(friendly,enemy)
            arrow.lifespan = 1000;
            this.enemyFiringGroup.push(arrow);
        }
    }
        */

    drawProjectiles(){
        this.friendlyFiringGroup.draw()
        return;
        //loop through the enemy firing group and check if an arrow collides with a friendly
        for (let arrow of this.friendlyFiringGroup) {
            for (let enemy of this.enemyGroup.enemyGroup) {
                if (arrow.collides(enemy.collider)) {
                    console.log("bullet collided with friendly?")
                    //this.playerStuffHit(friendly, arrow);
                }
            }
        }
    }

    friendlyFiring(enemy, friendly){
        if(this.secondsSinceEpoch() > friendly.lastShot + 1){
            //need to cull the arrow after a certain amount of time
            let arrow = this.createArrow(enemy,friendly)
            arrow.lifespan = 1000;
            this.friendlyFiringGroup.push(arrow);
            friendly.lastShot = this.secondsSinceEpoch();
        }
    }

    checkClosestEnemy(friendly){
        let closestEnemy = undefined;
        for (let enemy of this.enemyGroup.enemyGroup) {
            if(enemy.collider.exists !== false){
                if (friendly.justCheckTargetInRange(enemy.collider)){
                    if (closestEnemy === undefined){
                        closestEnemy = enemy;
                    }else if (this.checkDistance(friendly,enemy) < this.checkDistance(closestEnemy,friendly)){
                        closestEnemy = enemy;
                    }
                }
            }
        }
        return closestEnemy;
    }

    checkClosestWalkEnemy(friendly){
        let closestEnemy = undefined;
        for (let enemy of this.enemyGroup.enemyGroup) {
            if(enemy.collider.exists !== false){
                if (friendly.justCheckTargetInWalkRange(enemy.collider)){
                    if (closestEnemy === undefined){
                        closestEnemy = enemy;
                    }else if (this.checkDistance(friendly,enemy) < this.checkDistance(closestEnemy,friendly)){
                        closestEnemy = enemy;
                    }
                }
            }
        }
        return closestEnemy;
    }

    closeEnough(origin, target){
        if ((Math.abs(origin.x - target.x) < 1) && (Math.abs(origin.y != target.y) < 1)){
            return true;
        }
        return false;
    }

    handleActions(){
        for (let friendly of this.friendlyGroup){
            if(friendly.collider.exists){
                let nearestWalkableEnemy = this.checkClosestWalkEnemy(friendly);
                let nearestShootableEnemy = this.checkClosestEnemy(friendly);
                console.log('nearestWalkableEnemy', nearestWalkableEnemy);
                if (nearestWalkableEnemy && !nearestShootableEnemy){
                    let direction = friendly.collider.getAngleToPoint(nearestWalkableEnemy.collider.x,nearestWalkableEnemy.collider.y);
                    friendly.collider.direction = direction
                    friendly.collider.speed = friendly.speed;
                }else if (nearestWalkableEnemy && nearestShootableEnemy){
                    friendly.collider.speed = 0;
                    friendly.shooting = true;
                    this.friendlyFiring(nearestShootableEnemy,friendly);
                }else if (this.closeEnough(friendly.collider, friendly)){
                    let direction = friendly.collider.getAngleToPoint(friendly.x,friendly.y);
                    friendly.collider.direction = direction
                    friendly.collider.speed = friendly.speed;
                }else{
                    friendly.collider.speed = 0;
                    friendly.shooting = false;
                }
            }

            continue
            if (nearestEnemy){
                friendly.collider.speed = 0;
                friendly.shooting = true;
                this.enemyFiring(friendly, nearestEnemy);
            }else{
                friendly.collider.speed = friendly.speed;
                friendly.shooting = false;
            }
        }
    }

    checkDistance(t1,t2){
        return (t1.x - t2.x)^2 + (t1.y - t2.y)^2;
    }

    determineArrowDirection(enemy, friendly){
        let radian_angle = Math.atan((enemy.collider.y - friendly.collider.y) / (enemy.collider.x - friendly.collider.x));
        let degree_angle = (radian_angle) * (180 / Math.PI);
        return degree_angle - 180;
    }
    secondsSinceEpoch(){
        return Math.round(Date.now() / 1000);
    }
}