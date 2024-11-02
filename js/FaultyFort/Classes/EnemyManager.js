export default class EnemyManager {
    constructor(friendlyGroups){
        this.friendlyGroups = friendlyGroups;
        this.enemyGroup = $.makeGroup();
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

    checkTargetsInRange(){
        for (let friendlyGroup of this.friendlyGroups){
            for (let friendly of friendlyGroup.friendlyGroup) {
                if(friendly.collider.exists !== false){
                    for (let enemy of this.enemyGroup){
                        enemy.checkTargetInRange(friendly.collider);
                        if(enemy.shooting === true){
                            //enemyFiring();
                        }
                    }
                }
            }
        }
    }
}