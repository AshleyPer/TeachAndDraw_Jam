export default class EnemyManager {
    constructor(friendlyGroups){
        this.friendlyGroup = friendlyGroups;
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
        for (let friendlyGroup in this.friendlyGroups)
            for (let friendly of friendlyGroup) {
                if(friendly.collider.exists !== false){
                    for (let enemy in this.enemyGroup){
                        enemy.checkTargetInRange(friendly.collider);
                    }
                }
            }
    }
}