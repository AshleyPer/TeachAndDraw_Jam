export default class FriendlyStock {
    constructor(){
        this.lightStock = 0;
        this.heavyStock = 0;
        this.archerStock = 0;
        this.goldToGenerate = 100;
        this.roundLightStock = 0;
        this.roundHeavyStock = 0;
        this.roundArcherStock = 0;
    }

    drawStockTitle(){
        $.colour.fill = "#ffffff";
        $.text.size = 20;
        $.text.print(($.w)- 100,85,"Friendly Stock",150);
    }

    drawLightStock(){
        $.colour.fill = "#ffffff";
        $.text.size = 16;
        $.text.print(($.w)- 100,155,`${this.roundLightStock} Lights`,150);
    }

    drawHeavyStock(){
        $.colour.fill = "#ffffff";
        $.text.size = 16;
        $.text.print(($.w)- 100,235,`${this.roundHeavyStock} Heavies`,150);
    }

    drawArcherStock(){
        $.colour.fill = "#ffffff";
        $.text.size = 16;
        $.text.print(($.w)- 100,305,`${this.roundArcherStock} Archers`,150);
    }

    //check if the allocator the user clicked is in stock
    checkStock(allocatorType){
        if(allocatorType === "Light"){
            if(this.roundLightStock >= 1){
                this.removeLightStock();
                return true;
            }
        }else if(allocatorType === "Archer"){
            if(this.roundArcherStock >= 1){
                this.removeArcherStock();
                return true;
            }
        }else if(allocatorType === "Heavy"){
            if(this.roundHeavyStock >= 1){
                this.removeHeavyStock();
                return true;
            }
        }
        return false;
    }

    //this is for removing stock from a light unit when a user adds it to a lane
    removeLightStock(){
        this.roundLightStock -= 1;
    }

    //this is for removing stock from an archer unit when a user adds it to a lane
    removeArcherStock(){
        this.roundArcherStock -= 1;
    }

    //this is for removing stock from a heavy unit when a user adds it to a lane
    removeHeavyStock(){
        this.roundHeavyStock -= 1;
    }

    //TODO?
    //this is for adding stock if the user right clicks to remove a unit from the lanes
    addStock(){

    }

    resetStock(){
        this.roundLightStock = this.lightStock;
        this.roundHeavyStock = this.heavyStock;
        this.roundArcherStock = this.archerStock;
    }
}