import { Timer } from "./Timer.js"

export default class Round {
    constructor(){
        this.roundTimer = new Timer(3600);
        this.roundNumber = 0;
        this.topLaneEnemyNumber = 0;
        this.middleLaneEnemyNumber = 0;
        this.bottomLaneEnemyNumber = 0;
    }

    incrementRound(){
        this.roundNumber++;
        this.topLaneEnemyNumber += 2;
        this.middleLaneEnemyNumber += 2;
        this.bottomLaneEnemyNumber += 2;
    }
}