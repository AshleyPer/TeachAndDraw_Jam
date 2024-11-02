export default class FriendlyManager {
    constructor(){
        this.friendlyGroup = $.makeGroup();
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
}