import { Counter } from "./counter.js";

class Vital extends Counter {
    constructor(name, initial, max, colour, visible=false) {
        super(name, initial, max, visible);
        this.colour = colour;
        this.type = "vital";
    }
}

const health = new Vital("Health", 4, 5, "w3-red", true)
const stamina = new Vital("Stamina", 5, 5, "w3-yellow", true)

const vitals = {health: health, 
                stamina: stamina}

export {vitals}