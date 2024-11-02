export default class BaseTile{
    constructor(id,x,y,height,width){
        this.id = id;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.blank = true;
        this.text = "Click me!";
        /*{
        x: ($.w/2)+185, 
        y: 120, 
        width: 100, 
        height: 80, 
        minClickX: (($.w/2)+185)-(100/2), 
        maxClickX: (($.w/2)+185)+(100/2), 
        minClickY: 120-(80/2), 
        maxClickY: 120+(80/2)
        */
        this.minClickX = this.x - 100/2;
        this.maxClickX = this.x + 100/2;
        this.minClickY = this.y - 80/2;
        this.maxClickY = this.y + 80/2;
    }

    //draw the tile and the tile text
    drawTile(){
        $.colour.fill = "#ffffff";
        $.shape.rectangle(this.x,this.y,this.height,this.width);

        if(this.text === "Click me!"){
            $.colour.fill = "#000000";
        }else{
            $.colour.fill = "#ffaa00";
        }

        $.text.print(this.x,this.y,this.text,50);
    }

    checkIfClicked(){
        if($.mouse.x >= this.minClickX && $.mouse.y >= this.minClickY && $.mouse.x <= this.maxClickX && $.mouse.y <= this.maxClickY){
            let popup = document.querySelector("#base-popup-box");
            popup.clicked = this.id;
            popup.style.display = "block";
        }
    }
}