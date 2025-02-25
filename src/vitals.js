import { Counter } from "./counter.js";

class Vital extends Counter {
    constructor(name, initial, max, colour, vis=false) {
        super(name, initial, max);
        this.colour = colour;
        this.type = "vital";
        this.visible = vis;
    }
}

var health = new Vital("Health", 4, 5, "w3-red", true)
var stamina = new Vital("Stamina", 5, 5, "w3-yellow", true)

var vitals = [health, stamina]

export {vitals}