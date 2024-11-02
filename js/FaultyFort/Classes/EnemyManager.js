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
    
    draw(){
        this.enemyFiringGroup.draw()

        //loop through the enemy firing group and check if an arrow collides with a friendly
        for (let arrow of this.enemyFiringGroup) {
            for(let friendlyGroup of this.friendlyGroups){
                for (let friendly of friendlyGroup.friendlyGroup) {
                    if (arrow.collides(friendly.collider)) {
                        console.log("bullet collided with friendly?")
                        this.playerStuffHit(friendly, arrow);
                    }
                }
            }
        }
    }

    enemyFiring(enemy){
        if(this.enemyFiringGroup.length === 0){
            //need to cull the arrow after a certain amount of time
            let arrow = this.createArrow(enemy)
            arrow.lifespan = 1000;
            this.enemyFiringGroup.push(arrow);

        }
    }

    playerStuffHit(playerStuff, arrow){
        playerStuff.takeDamage(arrow.damage);
        arrow.remove();
    }

    createArrow(enemy){
        //temp speed for development
        let tempspeed = 20;
        const arrow = $.makeBoxCollider(enemy.collider.x+20,enemy.collider.y,30,10);
        arrow.fill = "#0009bd";
        arrow.speed = tempspeed;
        arrow.direction = enemy.direction;
        
        arrow.friction = 0;
        arrow.damage = 30;
        return arrow;
    }

    checkTargetsInRange(){
        for (let friendlyGroup of this.friendlyGroups){
            for (let friendly of friendlyGroup.friendlyGroup) {
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