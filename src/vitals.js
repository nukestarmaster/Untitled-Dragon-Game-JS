import { Counter } from "./counter.js";

class Vital extends Counter {
    constructor(name, initial, max, colour, vis=false) {
        super(name, initial, max);
        this.colour = colour;
        this.type = "vital";
        this.visible = vis;
    }
}

const health = new Vital("Health", 4, 5, "w3-red", true)
const stamina = new Vital("Stamina", 5, 5, "w3-yellow", true)

const vitals = [health, stamina]

export {vitals}