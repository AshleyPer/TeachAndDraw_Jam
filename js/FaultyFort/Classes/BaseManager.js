import FriendlyStock from "./FriendlyStock.js";

export default class BaseManager {
    constructor(){
        this.baseTileGroup = $.makeGroup();
        this.unitAllocatorGroup = $.makeGroup();
        //initialise friendly stock
        this.friendlyStock = new FriendlyStock();
        this.currentGold = 200;
    }

    //add the basetile to the basetile group
    addBaseTile(baseTile){
        this.baseTileGroup.push(baseTile);
    }

    //draw basetiles
    drawBaseTiles(){
        for (let baseTile of this.baseTileGroup) {
            baseTile.drawTile();
        }
    }

    //change clicked tile text
    changeClickedTileText(tileText){
        let popup = document.querySelector("#base-popup-box");
        for (let baseTile of this.baseTileGroup) {
            if(baseTile.id === popup.clicked){
                baseTile.blank = false;
                baseTile.text = tileText;
                this.addToFriendlyStock(tileText);
            }
        }
        popup.style.display = "none";
    }

    drawStockSection(){
        this.friendlyStock.drawStockTitle();
        this.friendlyStock.drawLightStock();
        this.friendlyStock.drawHeavyStock();
        this.friendlyStock.drawArcherStock();
    }

    addToFriendlyStock(tileText){
        if(tileText === "+10 Gold"){
            this.friendlyStock.goldToGenerate += 10;
        }else if(tileText === "+1 Heavy"){
            this.friendlyStock.heavyStock += 1;
            this.friendlyStock.roundHeavyStock += 1;
        }else if(tileText === "+2 Light"){
            this.friendlyStock.lightStock += 2;
            this.friendlyStock.roundLightStock += 2;
        }else if(tileText === "+1 Archer"){
            this.friendlyStock.archerStock += 1;
            this.friendlyStock.roundArcherStock += 1;
        }
    }

    //draw current gold
    drawCurrentGoldSection(){
        $.colour.fill = "#f7ee97";
        $.shape.rectangle(($.w/2)+170,24,130,40)
        $.colour.fill = "#6b4801";
        $.text.print(($.w/2)+160,25,`Money: ${this.currentGold.toString()}G`,100);
    }

    //add the allocator buttons to the group
    addAllocator(allocator){
        this.unitAllocatorGroup.push(allocator);
    }

    //draw all allocators
    drawAllocators(){
        for (let allocator of this.unitAllocatorGroup) {
            allocator.drawAllocator();
        }
    }

    //check if an allocator was clicked
    checkClickedAllocator(){
        for (let allocator of this.unitAllocatorGroup) {
            let checkIfAllocatorIsClicked = allocator.checkIfClicked();
            console.log("checkIfAllocatorIsClicked=",checkIfAllocatorIsClicked)
            if(checkIfAllocatorIsClicked === true){
                let isThereStock = this.friendlyStock.checkStock(allocator.type);
                if(isThereStock === true){
                    allocator.addNewFriendly(allocator.type);
                    break;
                }
            }
        }
    }

    //increment gold for a round
    incrementGold(){
        this.currentGold += this.friendlyStock.goldToGenerate;
    }
}