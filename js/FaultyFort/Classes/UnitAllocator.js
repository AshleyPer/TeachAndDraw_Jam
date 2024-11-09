import Friendly from "./Friendly.js";

export default class UnitAllocator{
    constructor(id,shapeX,shapeY,shapeHeight,shapeWidth,textX,textY,text,textWidth,type,location,friendlyManager){
        this.id = id;
        this.shapeX = shapeX;
        this.shapeY = shapeY;
        this.shapeHeight = shapeHeight;
        this.shapeWidth = shapeWidth;
        this.minClickX = this.shapeX - this.shapeWidth/2;
        this.maxClickX = this.shapeX + this.shapeWidth/2;
        this.minClickY = this.shapeY - this.shapeHeight/2;
        this.maxClickY = this.shapeY + this.shapeHeight/2;
        this.textX = textX;
        this.textY = textY;
        this.text = text;
        this.textWidth = textWidth;
        this.type = type;
        this.location = location;
        this.friendlyManager = friendlyManager;
    }

    //draw the allocator icons the user can click to spawn friendly units
    drawAllocator(){
        if(this.type === "Light"){
            $.colour.stroke = "#adadad";
            $.colour.fill = "#adadad";
        }else if(this.type === "Archer"){
            $.colour.stroke = "#876b4c";
            $.colour.fill = "#876b4c";
        }else if(this.type === "Heavy"){
            $.colour.stroke = "#ff8600";
            $.colour.fill = "#ff8600";
        }

        $.shape.rectangle(this.shapeX,this.shapeY,this.shapeHeight,this.shapeWidth)

        $.colour.fill = "#000000";
        $.text.print(this.textX,this.textY,this.text,this.textWidth);
    }

    //check if the user clicked an allocator
    checkIfClicked(){
        if($.mouse.x >= this.minClickX && $.mouse.y >= this.minClickY && $.mouse.x <= this.maxClickX && $.mouse.y <= this.maxClickY){
            console.log("yes, I am clicked", this.text)
            return true;
        }
        return false;
    }
    
    //add a new friendly based on the allocator the user clicked
    addNewFriendly(friendlyType){
        this.friendlyManager.addFriendly(new Friendly(this.friendlyManager.calculateRandomX(), this.friendlyManager.calculateRandomY(), 20, 20, 200, 20, 75, 0, 10, friendlyType, 220));
    }
}