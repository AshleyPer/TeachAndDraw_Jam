export default class BaseTile{
    constructor(x,y,height,width){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }

    drawTile(){
        $.shape.rectangle(this.x,this.y,this.height,this.width);
    }
}