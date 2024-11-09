export default class FriendlyStock {
    constructor(){
        this.lightStock = 0;
        this.heavyStock = 0;
        this.archerStock = 0;
        this.goldToGenerate = 100;
    }

    drawStockTitle(){
        $.colour.fill = "#ffffff";
        $.text.size = 20;
        $.text.print(($.w)- 100,85,"Friendly Stock",150);
    }

    drawLightStock(){
        $.colour.fill = "#ffffff";
        $.text.size = 16;
        $.text.print(($.w)- 100,155,`${this.lightStock} Lights`,150);
    }

    drawHeavyStock(){
        $.colour.fill = "#ffffff";
        $.text.size = 16;
        $.text.print(($.w)- 100,235,`${this.heavyStock} Heavies`,150);
    }

    drawArcherStock(){
        $.colour.fill = "#ffffff";
        $.text.size = 16;
        $.text.print(($.w)- 100,305,`${this.archerStock} Archers`,150);
    }

    //check if the allocator the user clicked is in stock
    checkStock(allocatorType){
        if(allocatorType === "Light"){
            if(this.lightStock >= 1){
                this.removeLightStock();
                return true;
            }
        }else if(allocatorType === "Archer"){
            if(this.archerStock >= 1){
                this.removeArcherStock();
                return true;
            }
        }else if(allocatorType === "Heavy"){
            if(this.heavyStock >= 1){
                this.removeHeavyStock();
                return true;
            }
        }
        return false;
    }

    //this is for removing stock from a light unit when a user adds it to a lane
    removeLightStock(){
        this.lightStock -= 1;
    }

    //this is for removing stock from an archer unit when a user adds it to a lane
    removeArcherStock(){
        this.archerStock -= 1;
    }

    //this is for removing stock from a heavy unit when a user adds it to a lane
    removeHeavyStock(){
        this.heavyStock -= 1;
    }

    //TODO?
    //this is for adding stock if the user right clicks to remove a unit from the lanes
    addStock(){

    }
}