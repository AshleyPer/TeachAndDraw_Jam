import { Timer } from "./Timer.js"

export default class Round {
    constructor(){
        this.roundTimer = new Timer(3600);
    }
}