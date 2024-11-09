export default class BaseTile{
    constructor(id,x,y,height,width){
        this.id = id;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.blank = true;
        this.text = "Click me!";
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