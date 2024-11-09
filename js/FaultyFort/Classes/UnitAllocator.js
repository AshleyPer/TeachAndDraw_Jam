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

    checkIfClicked(){
        if($.mouse.x >= this.minClickX && $.mouse.y >= this.minClickY && $.mouse.x <= this.maxClickX && $.mouse.y <= this.maxClickY){
            console.log("yes, I am clicked", this.text)

            //spawn light
            if(this.type === "Light"){
                //this.friendlyManager.addFriendly(new )
            //spawn archer
            }else if(this.type === "Archer"){
            
            //spawn heavy
            }else if(this.type === "Heavy"){
                
            }
        }
    }

    /*
    //repurpose this to check if a user clicks on the buttons to spawn the friendlies
    checkIfClicked(){
        if($.mouse.x >= this.minClickX && $.mouse.y >= this.minClickY && $.mouse.x <= this.maxClickX && $.mouse.y <= this.maxClickY){
            let popup = document.querySelector("#base-popup-box");
            popup.clicked = this.id;
            popup.style.display = "block";
        }
    }
    //need to check for right click (remove unit) and left click (add unit)
    // need to call FriendlyStock.removeStock() and FriendlyStock.addStock() based on the click
    */
}