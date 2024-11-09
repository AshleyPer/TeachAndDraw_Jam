export class Timer {
    constructor(length){
        this.frames=length;
    }

    update(){
        if(this.frames>0){
            this.frames--;
        }
    }

    isDone(){
        return this.frames===0;
    }

    setDone(){
        this.frames = 0;
    }

    resetTimer(newLength){
        this.frames = newLength;
    }
}