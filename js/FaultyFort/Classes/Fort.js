export default class Fort {
    constructor(x,y,width,height,maxHealth,resistance,icon){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxHealth = maxHealth;
        this.resistance = resistance;
        this.currentHealth = maxHealth;
        this.icon = icon;
        this.gameOver = false;
    }

    //make the collider
    makeCollider(){
        this.collider = $.makeBoxCollider(this.x,this.y,this.width,this.height);
        this.collider.asset = this.icon;
        this.collider.asset.scale = 200;
        this.collider.static = true;
    }

    //draw the collide
    drawCollider(){
        this.collider.draw();
    }

    //draw fort health bars
    drawHealthBar(){
        if(this.currentHealth > 0){
            $.colour.stroke = "#000000";
            //max health
            $.colour.fill = "#ff2f00";
            $.shape.rectangle(($.w/2)+330, 55, 450, 8)

            let scaledWidth = (this.currentHealth/this.maxHealth) * 450;
            //current health
            $.colour.fill = "#2bff00";
            $.shape.rectangle((($.w/2)+330) - (450-scaledWidth)/2, 55, scaledWidth, 8)
        }
    }
    /*
        //base healthbar red
        $.colour.stroke = "#000000";
        $.colour.fill = "#ff1e00";
        $.shape.rectangle (($.w/2)+330,55,450,18)

        //base healthbar green
        $.colour.stroke = "#000000";
        $.colour.fill = "#00ff1a";
        $.shape.rectangle (($.w/2)+305,55,400,18)
    */

    //fort takes damage
    takeDamage(damage){
        this.currentHealth -= damage;
        //check if the fort still lives
        if(this.currentHealth <= 0){
            //fort is dead...
            //should be GAME OVER
            this.gameOver = true;
            this.collider.remove();
        }
    }
}