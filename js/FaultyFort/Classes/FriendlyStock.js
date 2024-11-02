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

    //TODO
    //this is for removing stock when a user adds a unit to the lanes
    removeStock(){

    }
    //this is for adding stock if the user right clicks to remove a unit from the lanes
    addStock(){

    }
}