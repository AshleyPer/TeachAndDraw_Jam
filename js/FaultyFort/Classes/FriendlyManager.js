export default class FriendlyManager {
    constructor(minClickX,maxClickX,minClickY,maxClickY){
        this.minClickX = minClickX;
        this.maxClickX = maxClickX;
        this.minClickY = minClickY;
        this.maxClickY = maxClickY;
        this.friendlyGroup = $.makeGroup();
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
}